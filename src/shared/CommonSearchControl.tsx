import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
interface ICommonSearchControlProps {
  applySearch: (keywords: string) => void;
}

const CommonSearchControl: React.FC<ICommonSearchControlProps> = (props) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="custom-search-control">
      <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
        Search
      </label>
      <div className="input-group-search">
        <div className="input-group-prepend-search">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <input
          type="text"
          className="form-control mt-sm-2 mt-md-0"
          id="inlineFormInputGroupUsername"
          placeholder="Search"
          onChange={(e) => props.applySearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CommonSearchControl;
