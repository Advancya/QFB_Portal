import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";

interface IFilterButtonControlInlineProps {
  clearFilter: any;
  applyFilter: any;
  showClearFilter: boolean;
}

const FilterButtonControlInline: React.FC<IFilterButtonControlInlineProps> = (
  props
) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <React.Fragment>
      <label className="d-inline-block mx-2 mb-0">
        <button
          id="resetFilter"
          type="reset"
          className={
            props.showClearFilter
              ? "resetBtn resetFilter"
              : "resetBtn resetFilter invisible"
          }
          onClick={props.clearFilter}
        >
          {local_Strings.CashDetailsRemoveFilter}{" "}
          <i className="fa fa-close"></i>
        </button>
      </label>
      <button
        id="applyFilter"
        type="button"
        className="btn btn-primary btn-sm btn-inline-block applyFilter"
        onClick={props.applyFilter}
      >
        {local_Strings.CashDetailsFilter}
      </button>
    </React.Fragment>
  );
};

export default FilterButtonControlInline;
