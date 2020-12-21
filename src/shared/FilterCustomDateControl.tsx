import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";
import moment from "moment";

interface IFilterCustomDateControlProps {
    onStartDateChange: any;
    onEndDateChange: any;
    StartDate: Date;
    EndDate: Date;
    showCustomDateFilter: boolean;
}

const FilterCustomDateControl: React.FC<IFilterCustomDateControlProps> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);

    return (
        <div
            className={
                props.showCustomDateFilter
                    ? "col-sm-9 py-3 customDate"
                    : "col-sm-9 py-3 customDate d-none"
            }
            id="customDate"
        >
            <div className="row">
                <div className="col-lg-4">
                    <label>{local_Strings.RequestFromLabel}</label>
                    <input type="date" className="form-control"
                        value={props.StartDate ? moment(props.StartDate).format("yyyy-MM-DD") : ""}
                        min={moment().add(-3, "months").format("yyyy-MM-DD")} max={moment().format("yyyy-MM-DD")}
                        onChange={(e) => props.onStartDateChange(e.target.value)}
                    />
                </div>
                <div className="col-lg-4">
                    <label>{local_Strings.RequestToLabel}</label>
                    <input type="date" className="form-control"
                        value={props.EndDate ? moment(props.EndDate).format("yyyy-MM-DD") : ""}
                        min={moment().add(-3, "months").format("yyyy-MM-DD")} max={moment().format("yyyy-MM-DD")}
                        onChange={(e) => props.onEndDateChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterCustomDateControl;