import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";

interface IFilterDateControlProps {
    onChange: any;
    value: string;
}

const FilterDateControl: React.FC<IFilterDateControlProps> = (props) => {

    const currentContext = useContext(AuthContext);
    local_Strings.setLanguage(currentContext.language);

    return (
        <React.Fragment>
            <label>{local_Strings.RequestListingFilterDate}</label>
            <select
                className="form-control selectDateDD"
                value={props.value || "0"}
                onChange={(e) => props.onChange(e.target.value)}
            >
                <option value="0">{local_Strings.SelectItem}</option>
                <option value="1">{local_Strings.TransactionScreenFilter_LastWeek}</option>
                <option value="2">{local_Strings.TransactionScreenFilter_LastMonth}</option>
                <option value="3">{local_Strings.TransactionScreenFilter_Last3Months}</option>
                <option value="4">{local_Strings.TransactionScreenFilter_CustomDate}</option>
            </select>
        </React.Fragment>
    );
}

export default FilterDateControl;