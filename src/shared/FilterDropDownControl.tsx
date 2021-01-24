import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";

export interface IKeyValuePair {
  label: string;
  value: string;
}

interface IFilterDropDownControlProps {
  label: string;
  onChange: any;
  options: IKeyValuePair[];
  value: string;
  initialSelectRequired: boolean;
}

const FilterDropDownControl = (
  props: IFilterDropDownControlProps
) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <React.Fragment>
      <label>{props.label}</label>
      <select
        className="form-control"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.initialSelectRequired && <option value="0">{local_Strings.SelectItem}</option>}
        {props.options &&
          props.options.length > 0 &&
          props.options.map((o, i) => (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          ))}
      </select>
    </React.Fragment>
  );
};

export default FilterDropDownControl;
