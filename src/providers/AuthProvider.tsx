import { AddToLogs, GetSettingsByCIF } from "../services/cmsService";
import {
  initialSettingsData,
  IUserSettings,
  GetUserLocalData,
  SaveUserDataLocally,
} from "../Helpers/authHelper";
import React, { createContext, useEffect, useState } from "react";
import { authenticate } from "../services/authenticationService";
import * as helper from "../Helpers/helper";
import { getUserRole } from "../services/apiServices";
import moment from "moment";
import "moment/min/locales";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import arSA from 'date-fns/locale/ar-SA';
import { useIdleTimer } from 'react-idle-timer'
import oidc from "../services/oidc-config.json";
import Swal from 'sweetalert2';
import Constant from "../constants/defaultData";
import { localStrings as local_Strings } from '../translations/localStrings';
import { GetCountries } from "../services/commonDataServices";
import { ICountry } from "../Helpers/publicInterfaces";
import { useHistory } from "react-router-dom";
import { Offline } from "react-detect-offline";

registerLocale('ar', arSA);

export type User = { username: string; password: string; otp: string };
interface IAppContext {
  userSettings: IUserSettings;
  userRole: string;
  language: string;
  selectedCIF: string;
  countries: ICountry[],
  login: (user: User) => Promise<boolean>;
  logout: () => void;
  changeLanguage: (language: string) => void;
  changeUserSettings: (settings: IUserSettings) => void;
  selectCIF: (cif: string) => void;
}

export const AuthContext = createContext<IAppContext>({
  userSettings: initialSettingsData,
  userRole: "",
  language: "en",
  selectedCIF: initialSettingsData.customerId,
  countries: [],
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
  const [countries, setCountries] = useState<ICountry[]>([]);
  const history = useHistory();

  local_Strings.setLanguage(language);
  moment.locale(language);
  setDefaultLocale(language);

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: async event => {

      const lastActiveTime = moment(getLastActiveTime()).toLocaleString();

      if (!!selectedCIF) {

        console.log('user is idle since ', lastActiveTime);
        await AddToLogs(
          'user is idle since ' + lastActiveTime,
          '',
          selectedCIF
        );
        signout();
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: local_Strings.SessionTimeOutMessage,
          confirmButtonColor: '#6b4f44',
          showConfirmButton: true,
          showCloseButton: false,
        });
      }
    },
    debounce: 500
  });

  useEffect(() => {
    let isMounted = true;

    const getUserData = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (isMounted) {
          setUserSettings(userData);
        }
        const role = await getUserRole(userData.customerId || initialSettingsData.customerId);
        if (role && !!role && isMounted) {
          setCIF(userData.customerId);
          setUserRole(role.name);
        } else {
          if (isMounted) {
            setCIF(initialSettingsData.customerId);
          }
        }
      } else {
        if (isMounted) {
          setCIF(initialSettingsData.customerId);
          setUserRole("");
          setUserSettings(initialSettingsData);
        }
      }

      await GetCountries()
        .then((responseData: ICountry[]) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setCountries(responseData);
          }
        })
        .catch((e: any) => console.log(e));
    };
    getUserData();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, []);

  const signout = async () => {
    await AddToLogs(
      'user is signout successfully',
      '',
      selectedCIF
    );

    setCIF(null);
    setUserRole("");
    setUserSettings(null);
    await SaveUserDataLocally(null);
    localStorage.removeItem(oidc.storage_key);
    history.push(`/${language}`);
  }

  return (
    <AuthContext.Provider
      value={{
        userSettings,
        userRole,
        language,
        selectedCIF,
        countries,
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
        logout: signout,
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
      <Offline
        onChange={(online) => {
          if (!online && !!selectedCIF) {
            signout();
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: local_Strings.NoConnectionAlertBody,
              confirmButtonColor: '#6b4f44',
              showConfirmButton: false,
              showCloseButton: false,
            });
          }
        }}
      />
    </AuthContext.Provider>
  );
};
