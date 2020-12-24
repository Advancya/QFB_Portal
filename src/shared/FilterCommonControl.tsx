import React, { useContext, useEffect, useState } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";
import FilterDateControl from './FilterDateControl';
import FilterCustomDateControl from './FilterCustomDateControl';
import FilterAmountControl from './FilterAmountControl';
import FilterButtonControl from './FilterButtonControl';
import { emptyCommonFilter, ICommonFilter } from "../Helpers/publicInterfaces";
import moment from "moment";

interface IFilterCommonControlProps {
    applyFilter: (filters: ICommonFilter) => void;
    clearFilter: () => void;
}

const FilterCommonControl: React.FC<IFilterCommonControlProps> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);
    const [filters, setFilter] = useState<ICommonFilter>(emptyCommonFilter);

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

                <div className="col-sm-3 offset-sm-2">
                    <FilterButtonControl
                        clearFilter={() => {
                            setFilter(emptyCommonFilter);
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

export default FilterCommonControl;