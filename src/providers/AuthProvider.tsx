import { GetSettingsByCIF } from "../services/cmsService";
import { GetUserLocalData, SaveUserDataLocally } from "../Helpers/authHelper";
import React, { useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import * as helper from '../Helpers/helper';

export type User = { username: string; password: string; otp: string};
export interface IUserSettings { customerId: string; language: string; currency: string; otp: string };
const initialSettingsData = { customerId: "", language: "en", currency: "QAR", otp: "SMS" };

export const AuthContext = React.createContext<{
  userSettings: IUserSettings,
  cif: string;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  language: string;
  changeLanguage: (language: string) => void;
  changeUserSettings: (settings: IUserSettings) => void;
}>({
  userSettings: initialSettingsData,
  cif: "",
  login: (user) => {
    return new Promise((resolve, reject) => {
      return false;
    });
  },
  logout: () => { },
  language: "en",
  changeLanguage: (language) => { },
  changeUserSettings: (settings) => { },
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cif, setCif] = useState<string>(initialSettingsData.customerId);
  const [userSettings, setUserSettings] = useState<IUserSettings>(initialSettingsData);
  const [language, setLanguage] = useState(helper.getLanguage());

  useEffect(() => {
    const getUserData = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        setCif(userData.customerId);
        setUserSettings(userData);
      } else {
        setCif(initialSettingsData.customerId);
        setUserSettings(initialSettingsData);
      }
    };
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userSettings,
        cif,
        login: async (userData) => {
          const resutl = await authenticate(
            userData.username,
            userData.password
          );

          if (resutl) {
            setCif(userData.username);
            await GetSettingsByCIF(userData.username)
              .then(async (settings: any) => {
                if (settings && settings.length > 0) {
                  const _userSettings = settings[0];
                  setUserSettings(_userSettings);                  
                  await SaveUserDataLocally(_userSettings);    
                  console.log("user settings is saved on local storage");
                }
              });
              return resutl;
          } else {
            return false;
          }
        },
        logout: async () => {
          setCif("");
          await SaveUserDataLocally("");     
        },
        language,
        changeLanguage: setLanguage,
        changeUserSettings: setUserSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
