import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
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
}

const FilterDropDownControl: React.FC<IFilterDropDownControlProps> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);

    return (
        <React.Fragment>
            <label>{props.label}</label>
            <select
                className="form-control w-50"
                value={props.value || "0"}
                onChange={props.onChange}
            >
                <option value="0">{local_Strings.SelectItem}</option>
                {props.options && props.options.length > 0 &&
                    props.options.map((o) => <option value={o.value}>{o.label}</option>)
                }
            </select>
        </React.Fragment>
    );
}

export default FilterDropDownControl;