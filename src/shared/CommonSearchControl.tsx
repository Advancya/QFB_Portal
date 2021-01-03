import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import FilterDateControl from "./FilterDateControl";
import FilterCustomDateControl from "./FilterCustomDateControl";
import FilterAmountControl from "./FilterAmountControl";
import FilterButtonControl from "./FilterButtonControl";
import { emptyCommonFilter, ICommonFilter } from "../Helpers/publicInterfaces";
import moment from "moment";

interface ICommonSearchControlProps {
  applyFilter?: (filters: ICommonFilter) => void;
  clearFilter?: () => void;
}

const CommonSearchControl: React.FC<ICommonSearchControlProps> = (props) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [filters, setFilter] = useState<ICommonFilter>(emptyCommonFilter);

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
        />
      </div>
    </div>
  );
};

export default CommonSearchControl;
