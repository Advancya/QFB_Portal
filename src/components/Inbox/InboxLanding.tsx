import React, { useContext, useState } from "react";
import { emptyInboxDetail, IInboxDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { InboxContext } from "../../pages/Homepage";
import { localStrings as local_Strings } from "../../translations/localStrings";
import moment from "moment";

interface iInboxLanding {
  showInboxDetailsModal: (detail: IInboxDetail) => void;
  showInboxListingModal: () => void;
}

const InboxLanding: React.FC<iInboxLanding> = (props) => {


  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);
  const currentContext = useContext(AuthContext);
  const InboxMessages = useContext(InboxContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="box pb-0 min-h-16">
      <div className="box-header">
        <h3>{local_Strings.landingInboxTitle}</h3>
        <a href="#" className="viewLink" onClick={props.showInboxListingModal}>
          {local_Strings.landingMore} <i className="fa fa-arrow-right"></i>
        </a>
      </div>

      <ul className="box-list">
        {InboxMessages.messages &&
          InboxMessages.messages.length > 0 &&
          InboxMessages.messages.slice(0, 3).map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="d-block"
                onClick={() => props.showInboxDetailsModal(item)}
              >
                <h4>
                  <span className={!item.isRead ? "unread" : ""}>
                    {item.adviceType || ""}
                  </span>
                  <small>
                    {item.adviceDate
                      ? moment(item.adviceDate).format("DD/MM/YYYY h:mm a")
                      : ""}
                  </small>
                </h4>
                <p>{item.description || ""}</p>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default InboxLanding;
