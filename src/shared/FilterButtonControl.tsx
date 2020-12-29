import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";

interface IFilterButtonControlProps {
    clearFilter: any;
    applyFilter: any;
    showClearFilter: boolean;
}

const FilterButtonControl: React.FC<IFilterButtonControlProps> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);

    return (
        <React.Fragment>
            <label>
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
                    {local_Strings.CashDetailsRemoveFilter} <i className="fa fa-close"></i>
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
}

export default FilterButtonControl;