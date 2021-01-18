import { GetSettingsByCIF } from "../services/cmsService";
import {
  initialSettingsData,
  IUserSettings,
  GetUserLocalData,
  SaveUserDataLocally,
} from "../Helpers/authHelper";
import React, { useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import * as helper from "../Helpers/helper";
import { getUserRole } from "../services/apiServices";
import Constant from "../constants/defaultData";
import moment from "moment";
import "moment/min/locales";

export type User = { username: string; password: string; otp: string };
interface IAppContext {
  userSettings: IUserSettings;
  userRole: string;
  language: string;
  selectedCIF: string;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  changeLanguage: (language: string) => void;
  changeUserSettings: (settings: IUserSettings) => void;
  selectCIF: (cif: string) => void;
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
  selectCIF: (cif) => { },
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSettings, setUserSettings] = useState<IUserSettings>(
    initialSettingsData
  );
  const [language, setLanguage] = useState(helper.getLanguage() || "en");
  const [userRole, setUserRole] = useState<string>("");
  const [selectedCIF, setCIF] = useState<string>(initialSettingsData.customerId);
  moment.locale(language);
  
  useEffect(() => {
    const getUserData = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        setUserSettings(userData);
        const role = await getUserRole(userData.customerId || initialSettingsData.customerId);
        if (role && !!role) {
          setCIF(userData.customerId);
          setUserRole(role.name);
        } else {
          setCIF(initialSettingsData.customerId);
        }
      } else {
        setCIF(initialSettingsData.customerId);
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
            await GetSettingsByCIF(userData.username).then(
              async (settings: any) => {
                if (settings && settings.length > 0) {
                  const _userSettings = settings[0];
                  setUserSettings(_userSettings);
                  setCIF(userData.username);
                  await SaveUserDataLocally(_userSettings);

                } else {
                  const _userData = { ...initialSettingsData, customerId: userData.username };
                  setUserSettings(_userData);
                  setCIF(userData.username);
                  await SaveUserDataLocally(_userData);
                }

                const role = await getUserRole(userData.username);
                if (role && !!role) {
                  setUserRole(role.name);
                }
              }
            );
            return resutl;
          } else {
            return false;
          }
        },
        logout: async () => {
          setCIF(null);
          setUserRole("");
          setUserSettings(null);
          await SaveUserDataLocally(null);
          localStorage.removeItem(Constant.CustomerTermsAcceptanceStorageKey);
          window.location.href = `/${language}`;
        },
        changeLanguage: setLanguage,
        changeUserSettings: setUserSettings,
        selectCIF: (selectedCustomer) => {
          GetSettingsByCIF(selectedCustomer).then(
            (settings: any) => {
              if (settings && settings.length > 0) {
                setUserSettings(settings[0]);
              } else {
                const _userData = { ...initialSettingsData, customerId: selectedCustomer };
                setUserSettings(_userData);
              }
              setCIF(selectedCustomer);
            }
          );
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
