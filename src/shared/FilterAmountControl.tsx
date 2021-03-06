import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";

interface IFilterAmountControlProps {
    label: string;
    onChangeOperator: any;
    onChangeAmount: any;
    AmountOperator: string;
    Amount: string;
}

const FilterAmountControl: React.FC<IFilterAmountControlProps> = (props) => {

    const currentContext = useContext(AuthContext);
    local_Strings.setLanguage(currentContext.language);

    return (
        <React.Fragment>
            <label>{props.label || local_Strings.TransactionAmountLabel2}</label>
            <select
                className="form-control w-50"
                value={props.AmountOperator || "0"}
                onChange={(e) => props.onChangeOperator(e.target.value)}
            >
                <option value="0">{local_Strings.SelectItem}</option>
                <option value="=">{local_Strings.TransactionScreenFilter_EQ}</option>
                <option value=">=">{local_Strings.TransactionScreenFilter_GTE}</option>
                <option value=">">{local_Strings.TransactionScreenFilter_GT}</option>
                <option value="<=">{local_Strings.TransactionScreenFilter_LTE}</option>
                <option value="<">{local_Strings.TransactionScreenFilter_LT}</option>
            </select>
            &nbsp;&nbsp;
            <input
                type="number"
                //pattern="[0-9]*"
                className="form-control w-50"
                placeholder={local_Strings.Amount}
                value={props.Amount || ""}
                onChange={(e) => props.onChangeAmount(e.target.value)}
            />
        </React.Fragment>
    );
}

export default FilterAmountControl;