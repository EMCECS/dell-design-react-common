import React, {useEffect, useState} from "react";
import {useFilters, useSortBy, useTable} from "react-table";
import './DatagridCustomStyles.scss';

/**
 * Enum for GridSelectionType :
 * @param {MULTI} for enabling multi row select
 * @param {SINGLE} for enabling single row select
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}

/**
 * Enum for sorting order :
 * @param {DESC} to sort data in descending order
 * @param {ASC} to sort data in ascending order
 * @param {NONE} no sorting
 */
export enum SortOrder {
    DESC = "descending",
    ASC = "ascending ",
    NONE = "none",
}

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 * @param {isSorted} checks if column is currently sorted or not
 * @param {hideSort} if true hides sort
 */
export type DataGridSort = {
    defaultSortOrder: SortOrder;
    sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => Promise<DataGridRow[]>;
    isSorted?: boolean;
    hideSort?: boolean;
};

type DataGridProps = {
    className?: string;
    style?: any;
    dataqa?: string;
    id?: string;
    row: { [key: string]: any };
    column: { [key: string]: any };
    selectionType?: GridSelectionType;
    sorting?: boolean;
    expandable?: boolean;
    expandComponent?: any;
    pagination?: boolean;
    columnSelect?: boolean;
    infiniteScroll?: boolean;
    tableType?: "csg" | "isg" | "compact";
    defaultColumnWidth?: number;
    tableHeight?: number;
}
export type DataGridColumn = {
    columnName: string;
    displayName?: any;
    tooltip?: any;
    columnID?: number; // For internal use
    className?: string;
    style?: any;
    filter?: React.ReactNode;
    isVisible?: boolean;
    width?: number;
    sort?: DataGridSort;
};
export type DataGridRow = {
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    disableRowSelection?: boolean;
};
const DataGridWithInfiniteScroll = (props: DataGridProps) => {
    const data: any = props.row;
    const columns: any = props.column;
    const selectionType: any = props.selectionType;

    const defaultColumn = React.useMemo(
        () => ({
            width: props.defaultColumnWidth ? props.defaultColumnWidth : 200,
        }),
        []
    )
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow// The useFilter Hook provides a way to set the filter
    } = useTable({
            columns,
            data,
            initialState: {pageIndex: 0},
            defaultColumn,
        },
        useFilters, // Adding the useFilters Hook to the table
        useSortBy
    );
    const [allValues, setIsChecked] = useState<any>([]);
    useEffect(() => {
        setIsChecked(rows);
    }, [rows]);

    const handleChangeSorting = (e) => {
        const {id, checked} = e.target;
        let tempSortValue;
        if (id === 'allSelect') {
            tempSortValue = allValues.map((val) => {
                return {...val, isChecked: checked}
            });
            setIsChecked(tempSortValue);
        } else {
            tempSortValue = allValues.map(val => val.id === id ? {...val, isChecked: checked} : val)
            setIsChecked(tempSortValue);
        }
    }

    return (
        <div className="table-css">
            <table {...getTableProps()} className="table-css">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                        className={'csg-header'}>
                        {selectionType === GridSelectionType.MULTI &&
                            <th scope="col">
                                <div className="dds__checkbox dds__checkbox--sm">
                                    <label className="dds__checkbox__label" htmlFor="sm-rad">
                                        <input type="checkbox" id="allSelect"
                                               className="dds__checkbox__input"
                                               checked={allValues.filter(value => value?.isChecked !== true).length < 1}
                                               onChange={handleChangeSorting}/>
                                    </label>
                                </div>
                            </th>
                        }
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(props.sorting ? column.getSortByToggleProps() : "")}>
                                <div className="header-cell">
                                    {column.render("Header")}
                                    <span className="">
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <div className="">
                                                            <img
                                                            src="https://dds.dell.com/svgs/2.4.0/dds__icon--arrow-down.svg"
                                                            height="30px" width="30px" alt="dds__icon--arrow-down"/>
                                                        </div>
                                                        : <div className=""><img
                                                            src="https://dds.dell.com/svgs/2.4.0/dds__icon--arrow-up.svg"
                                                            height="32px" width="32px" alt="dds__icon--arrow-up"/>
                                                        </div>
                                                    : ''
                                                }
                                            </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-body">
                {allValues.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className={'csg-row'}>
                            {selectionType === GridSelectionType.MULTI &&
                                <th scope={row}>
                                    <div className="dds__checkbox dds__checkbox--sm">
                                        <label className="dds__checkbox__label" htmlFor="sm-rad">
                                            <input type="checkbox" id={row.id}
                                                   className="dds__checkbox__input"
                                                   onChange={handleChangeSorting}
                                                   checked={row?.isChecked || false}/>
                                        </label>
                                    </div>
                                </th>
                            }
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>

    )
}
export default DataGridWithInfiniteScroll;