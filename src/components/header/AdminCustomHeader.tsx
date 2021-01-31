import React, { useContext, useEffect, useState } from "react";
import ToolBarLeft from "./ToolBarLeft";
import AdminToolBarRight from "./AdminToolBarRight";
import RMToolBarRight from "./RMToolBarRight";
import ManagementToolBarRight from "./ManagementToolBarRight";
import AdminNavigation from "./AdminNavigation";
import Logo from "./Logo";
import { getUserRole } from "../../services/apiServices";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { GetUserLocalData } from "../../Helpers/authHelper";
import Constant from "../../constants/defaultData";

function AdminCustomHeader() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  const [link, setLink] = useState<any>({
    Admin: false,
    RM: false,
    Management: false,
  });

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        const role = await getUserRole(userData.customerId);
        if (role && !!role) {
          if (role.name === Constant.RM) {
            setLink({ ...link, RM: true });
          } else if (role.name === Constant.Management) {
            setLink({ ...link, Management: true });
          } else if (role.name === Constant.CMSADMIN) {
            setLink({ ...link, Admin: true });
          }
        }
      }
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, [currentContext.selectedCIF, currentContext.language]);

  return (
    <div>
      <div className="topHeader">
        <div className="container-fluid">
          <div className="row align-items-center">
            <ToolBarLeft />
             {link.Admin && <AdminToolBarRight />}
             {link.RM && <RMToolBarRight />}
             {link.Management && <ManagementToolBarRight />}
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <Logo />
            <AdminNavigation />
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminCustomHeader;
