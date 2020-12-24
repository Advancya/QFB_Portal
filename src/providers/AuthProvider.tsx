import { GetSettingsByCIF } from "../services/cmsService";
import { IUserSettings, GetUserLocalData, SaveUserDataLocally } from "../Helpers/authHelper";
import React, { useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import * as helper from '../Helpers/helper';
import { getUserRole } from "../services/apiServices";
import Constant from "../constants/defaultData";

export type User = { username: string; password: string; otp: string };
const initialSettingsData = { customerId: "", language: "en", currency: "QAR", otp: "SMS" };
interface IAppContext {
  userSettings: IUserSettings,
  userRole: string;
  language: string;
  selectedCIF: string;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  changeLanguage: (language: string) => void;
  changeUserSettings: (settings: IUserSettings) => void;
}

export const AuthContext = React.createContext<IAppContext>({
  userSettings: initialSettingsData,
  userRole: "",
  language: "en",
  selectedCIF: initialSettingsData.customerId,
  login: (user) => {
    return new Promise((resolve, reject) => {
      return false;
    });
  },
  logout: () => { },
  changeLanguage: (language) => { },
  changeUserSettings: (settings) => { },
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSettings, setUserSettings] = useState<IUserSettings>(initialSettingsData);
  const [language, setLanguage] = useState(helper.getLanguage() || "en");
  const [userRole, setUserRole] = useState<string>("");
  const [selectedCIF, setselectedCIF] = useState<string>(initialSettingsData.customerId);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        setUserSettings(userData);
        const role = await getUserRole(userData.customerId || initialSettingsData.customerId);
        if (role !== undefined) {
          setUserRole(role.name);
          if (role.name === Constant.Customer) {
            setselectedCIF(userData.customerId);
          } else {
            setselectedCIF(initialSettingsData.customerId);
          }
        }
      } else {
        setselectedCIF(initialSettingsData.customerId);
        setUserRole("");
        setUserSettings(initialSettingsData);
      }
    };
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userSettings,
        userRole,
        language,
        selectedCIF,
        login: async (userData) => {
          const resutl = await authenticate(
            userData.username,
            userData.password
          );

          if (resutl) {
            await GetSettingsByCIF(userData.username)
              .then(async (settings: any) => {
                if (settings && settings.length > 0) {
                  const _userSettings = settings[0];
                  setUserSettings(_userSettings);
                  setselectedCIF(userData.username);
                  await SaveUserDataLocally(_userSettings);                  

                } else {                 
                  const _userData = {...initialSettingsData, customerId: userData.username}; 
                  setUserSettings(_userData);
                  setselectedCIF(userData.username);
                  await SaveUserDataLocally(_userData);                  
                }

                console.log("user settings is saved on local storage");
                const role = await getUserRole(userData.username);
                if (role && role !== undefined) {
                  setUserRole(role.name || "");
                }
              });
            return resutl;
          } else {
            return false;
          }
        },
        logout: async () => {
          setselectedCIF(initialSettingsData.customerId);
          setUserRole("");
          setUserSettings(initialSettingsData);
          await SaveUserDataLocally(initialSettingsData);
          window.location.href = `/${language}`;
        },
        changeLanguage: setLanguage,
        changeUserSettings: setUserSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
