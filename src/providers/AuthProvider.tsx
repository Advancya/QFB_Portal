import { GetSettingsByCIF } from "../services/cmsService";
import { GetUserLocalData, SaveUserDataLocally } from "../Helpers/authHelper";
import React, { useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import defaultData from "../constants/defaultData";
import * as helper from '../Helpers/helper';

export type User = { username: string; password: string; language: string; currency: string; otp: string };
const initialUserData = { username: "", password: "", language: "", currency: "", otp: "" };

export const AuthContext = React.createContext<{
  user: User;
  isSignIn: boolean;
  cif: string;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  language: string;
  changeLanguage: (language: string) => void;
}>({
  user: initialUserData,
  isSignIn: false,
  cif: "",
  login: (user) => {
    return new Promise((resolve, reject) => {
      return false;
    });
  },
  logout: () => { },
  language: "en",
  changeLanguage: (language) => { }
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cif, setCif] = useState<string>("");
  const [user, setUser] = useState<User>(initialUserData);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [language, setLanguage] = useState(helper.getLanguage());

  useEffect(() => {
    const getUserData = async () => {
      const data = await GetUserLocalData();
      if (data != null) {
        const userData = JSON.parse(data);
        setUser(userData);
        setCif(userData.username);
        setIsSignIn(true);
      } else {
        setCif("");
        setUser(initialUserData);
        setIsSignIn(false);
      }
    };
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
                  const _userData = { ...userData, ..._userSettings };
                  setUser(_userData);
                  
                  await SaveUserDataLocally(_userData);    
                  console.log("saved user data");              
                }
              });
              return resutl;
          } else {
            return false;
          }
        },
        logout: async () => {
          setCif("");
          setUser(initialUserData);          
        },
        language,
        changeLanguage: (lang) => {
console.log("current language is " + language);
          setLanguage(lang);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
