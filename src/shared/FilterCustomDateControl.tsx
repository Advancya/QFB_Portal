import React, { useContext } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import moment from "moment";
import DatePicker from "react-datepicker";

interface IFilterCustomDateControlProps {
  onStartDateChange: any;
  onEndDateChange: any;
  StartDate: Date;
  EndDate: Date;
  showCustomDateFilter: boolean;
  customClass?: string;
}

const FilterCustomDateControl: React.FC<IFilterCustomDateControlProps> = (
  props
) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div
      className={
        props.showCustomDateFilter
          ? "col-md-9 py-3 customDate " + props.customClass
          : "col-md-9 py-3 customDate d-none " + props.customClass
      }
      id="customDate"
    >
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <label>{local_Strings.RequestFromLabel}</label>
          <DatePicker
            className="form-control"
            dateFormat="yyyy-MM-dd"
            minDate={moment().add(-6, "months").toDate()}
            maxDate={moment().toDate()}
            locale={currentContext.language}
            selected={
              props.StartDate
                ? moment(props.StartDate).toDate()
                : null
            }
            onChange={(date: Date) =>
              props.onStartDateChange(moment(date).utc(true))}
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <label>{local_Strings.RequestToLabel}</label>          
          <DatePicker
            className="form-control"
            dateFormat="yyyy-MM-dd"
            minDate={moment().add(-6, "months").toDate()}
            maxDate={moment().toDate()}
            locale={currentContext.language}
            selected={
              props.EndDate
                ? moment(props.EndDate).toDate()
                : null
            }
            onChange={(date: Date) =>
              props.onEndDateChange(moment(date).utc(true))}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCustomDateControl;
