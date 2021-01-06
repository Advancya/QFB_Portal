import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import deleteIcon from "../images/delete-icon.svg";
interface IFilterButtonControlProps {
  clearFilter: any;
  applyFilter: any;
  showClearFilter: boolean;
}

const FilterButtonControl: React.FC<IFilterButtonControlProps> = (props) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <React.Fragment>
      <label>
        <button
          id="resetFilter"
          type="reset"
          className={
            props.showClearFilter
              ? "resetBtn resetFilter  w-100 d-flex align-items-center justify-content-center"
              : "resetBtn resetFilter invisible"
          }
          onClick={props.clearFilter}
        >
          {local_Strings.CashDetailsRemoveFilter}{" "}
          <img className="mx-1" src={deleteIcon} />
        </button>
      </label>
      <button
        id="applyFilter"
        type="button"
        className="btn btn-primary btn-sm btn-block applyFilter"
        onClick={props.applyFilter}
      >
        {local_Strings.CashDetailsFilter}
      </button>
    </React.Fragment>
  );
};

export default FilterButtonControl;
