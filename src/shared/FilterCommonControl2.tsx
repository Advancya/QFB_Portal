import React, { useContext, useEffect, useState } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";
import FilterDateControl from './FilterDateControl';
import FilterCustomDateControl from './FilterCustomDateControl';
import FilterAmountControl from './FilterAmountControl';
import FilterButtonControl from './FilterButtonControl';
import FilterDropDownControl from './FilterDropDownControl';
import { emptyCommonFilter2, ICommonFilter2 } from "../Helpers/publicInterfaces";
import moment from "moment";

interface IFilterCommonControl2Props {
    applyFilter: (filters: ICommonFilter2) => void;
    clearFilter: () => void;
    CheckBoxTitle?: string;
    CheckBoxLabels?: string[];
}

const FilterCommonControl2: React.FC<IFilterCommonControl2Props> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);
    const [filters, setFilter] = useState<ICommonFilter2>(emptyCommonFilter2);

    return (
        <form className="filter-box">
            <div className="row headRow align-items-center">
                <div className="col-sm-3">
                    <FilterDateControl value={filters.DateOption}
                        onChange={(_value: string) => setFilter({ ...filters, DateOption: _value })} />
                </div>
                <div className="col-sm-4">
                    <FilterAmountControl AmountOperator={filters.AmountOperator} Amount={filters.Amount}
                        onChangeOperator={(_value: string) => setFilter({ ...filters, AmountOperator: _value })}
                        onChangeAmount={(_value: string) => setFilter({ ...filters, Amount: _value })} />
                </div>
                <div className="col-sm-3">
                    <label>{props.CheckBoxTitle}</label>
                    <div className="form-row">
                        <div className="custom-control custom-checkbox  custom-control-inline">
                            <input
                                type="checkbox"
                                name="radioType"
                                className="custom-control-input"
                                id="customCheck1"
                                value={
                                    filters.OptionalCheck[0]
                                        ? filters.OptionalCheck[0].value
                                        : false
                                }
                                onChange={(_value) => {
                                    const OptionalCheck = [...filters.OptionalCheck];
                                    OptionalCheck[0].label = props.CheckBoxLabels[0];
                                    OptionalCheck[0].value = _value;

                                    setFilter({
                                        ...filters, OptionalCheck
                                    });
                                }}
                            />
                            <label className="custom-control-label">{props.CheckBoxLabels[0]}</label>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input
                                type="checkbox"
                                name="radioType"
                                className="custom-control-input"
                                id="customCheck2"
                                value={
                                    filters.OptionalCheck[1]
                                        ? filters.OptionalCheck[1].value
                                        : false
                                }
                                onChange={(_value) => {
                                    const OptionalCheck = [...filters.OptionalCheck];
                                    OptionalCheck[1].label = props.CheckBoxLabels[1];
                                    OptionalCheck[1].value = _value;

                                    setFilter({
                                        ...filters, OptionalCheck
                                    });
                                }}
                            />
                            <label className="custom-control-label">{props.CheckBoxLabels[1]}</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2">
                    <FilterButtonControl
                        clearFilter={() => {
                            setFilter(emptyCommonFilter2);
                            props.clearFilter();
                        }}
                        applyFilter={() => {
                            setFilter({ ...filters, filterApplied: true });
                            props.applyFilter({ ...filters, filterApplied: true });
                        }}
                        showClearFilter={filters.filterApplied} />
                </div>
                <FilterCustomDateControl
                    onStartDateChange={(_value: string) => setFilter({ ...filters, StartDate: moment(_value).toDate() })}
                    onEndDateChange={(_value: string) => setFilter({ ...filters, EndDate: moment(_value).toDate() })}
                    StartDate={filters.StartDate}
                    EndDate={filters.EndDate}
                    showCustomDateFilter={filters.DateOption === "4"} />
            </div>
        </form>
    );
}

export default FilterCommonControl2;