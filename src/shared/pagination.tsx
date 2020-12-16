import React, { useContext, useEffect, useState } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";

interface IPaginationProps {
    items: [],
    onChangePage: any,
    initialPage?: number,
    pageSize?: number,
}

const Pagination = (props: IPaginationProps) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);
    const [pager, setPaging] = useState({
        totalItems: [],
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: []
    });

    useEffect(() => {
        setPage(props.initialPage);
    }, [props.items]);

    const setPage = (page: any) => {
        var { items, pageSize = 5 } = props;

        // get new pager object for specified page
        const newPage: any = getPager(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(newPage.startIndex, newPage.endIndex + 1);

        // update state
        setPaging(newPage);

        // call change page function in parent component
        props.onChangePage(pageOfItems);
    }

    const getPager = (totalItems: any, currentPage: any, pageSize: number) => {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages: number = Math.ceil(totalItems / pageSize);

        let startPage: number = 1, endPage: number = 1;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages: any = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    // (pager && pager.pages && pager.pages.length > 1) ? null : (
    return (
        <div className="paging-block">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                    <li className={'page-item ' + (pager.currentPage === 1 ? 'disabled' : '')}>
                        <button type="button" className="page-link"
                            onClick={() => setPage(pager.currentPage - 1)}>
                            {local_Strings.pagingPrevious}</button>
                    </li>
                    {pager && pager.pages && pager.pages.map((page, index: number) =>
                        <li key={index} className={'page-item ' + (pager.currentPage === page ? 'active' : '')}>
                            <button type="button" className="page-link"
                                onClick={() => setPage(page)}>{page}</button>
                        </li>
                    )}
                    <li className={'page-item ' + (pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                        <button type="button" className="page-link"
                            onClick={() => setPage(pager.currentPage + 1)}>
                            {local_Strings.pagingNext}</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;