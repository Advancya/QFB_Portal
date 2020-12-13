import { GetSettingsByCIF } from "../services/cmsService";
import { GetUserLocalData, SaveUserDataLocally } from "../Helpers/authHelper";
import React, { useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import defaultData from "../constants/defaultData";
import * as helper from '../Helpers/helper';

export type User = { username: string; password: string; };
export interface IUserSettings { cif: string; language: string; currency: string; otp: string };
const initialUserData = { username: "", password: "" };
const initialSettingsData = { cif: "1934", language: "en", currency: "QAR", otp: "SMS" };

export const AuthContext = React.createContext<{
  //user: User;
  userSettings: IUserSettings,
  isSignIn: boolean;
  cif: string;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  language: string;
  changeLanguage: (language: string) => void;
  changeUserSettings: (settings: IUserSettings) => void;
}>({
  //user: initialUserData,
  userSettings: initialSettingsData,
  isSignIn: false,
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
  const [cif, setCif] = useState<string>(initialSettingsData.cif);
  //const [user, setUser] = useState<User>(initialUserData);
  const [userSettings, setUserSettings] = useState<IUserSettings>(initialSettingsData);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [language, setLanguage] = useState(helper.getLanguage());

  useEffect(() => {
    const getUserData = async () => {
      const data = await GetUserLocalData();
      if (data != null) {
        const userData = JSON.parse(data);
        //setUser(userData);
        setCif(data.cif);
        setUserSettings(data);
        setIsSignIn(true);
      } else {
        setCif(initialSettingsData.cif);
        //setUser(initialUserData);
        setUserSettings(initialSettingsData);
        setIsSignIn(false);
      }
    };
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        //user,
        userSettings,
        isSignIn,
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
          //setUser(initialUserData);
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
