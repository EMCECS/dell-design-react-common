/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import {useRef} from "react";
import {useTable, Column,useRowSelect, Hooks,useSortBy} from "react-table";
import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
import {Constants} from "components/DataGridWithInfiniteScroll/Constants";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";
import {Icon} from "@dellstorage/clarity-react/icon";

/**
 * General component description :
 * DataGridWithInfiniteScroll :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}
/**
 * @param {rows} rows data
 * @param {columns} column details
 * @param {className} CSS class names
 * @param {style} to add custom CSS styles
 * @param {isLoading} if true then show loading icon before table is rendered
 * @param {className} is to get a custom class to be applied or else default class is applied.
 */
type DataGridProps = {
    rows: {[key: string]: any}[];
    columns: Column<{[key: string]: any}>[];
    style?: any;
    isLoading?: boolean;
    className?:string;
    selectionType?: GridSelectionType;
    isSorting?:boolean
};

function DataGridWithInfiniteScroll(props: DataGridProps) {
    const {style, isLoading, columns, className,selectionType,isSorting} = props;
    const refSetting: any = useRef();
    const data = props.rows;
    const tableHooks = (hooks: Hooks) => {
        if (selectionType === GridSelectionType.MULTI) {
            hooks.visibleColumns.push((columns: Column<{[key: string]: any}>[]) => [
                {
                    id: Constants.ID_FOR_MULTI_SELECT,
                    Header: ({getToggleAllRowsSelectedProps}: Hooks) => (
                        <CheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({row}: Hooks) => <CheckBox {...row.getToggleRowSelectedProps()} />,
                },
                ...columns,
            ]);
        }
    };
    /**
     * @param {getTableProps} is a function to resolve any props needed by the react table wrapper.
     * @param {getTableBodyProps } to render table body of react table
     * @param {headerGroups } return headers which is going to be the headers of the table
     * @param {rows} display rows of the datagrid
     * @param {prepareRow} is a function that must be called on any row to be displayed. It is responsible for preparing a row for rendering.
     * @param {useTable } hook takes options and plugins to build a table instance. The basic options are columns and row data
     */
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns,
        data,
    },
        tableHooks,
        useSortBy,
        useRowSelect,
        );

    /**
     * Function to render react table Header
     * @param {getHeaderGroupProps} to map the headerGroups to show the individual <tr> by getting the getHeaderGroupProps()
     * @param {render}  spread the column prop along with its equivalent getHeaderProps() function. render() function takes in a string “Header” that will act as a reference when we will structure our data.
     */
    const renderSorting = (column: any) => {
        return (<div ref={refSetting} className="header-cell">
                {column.render("Header")}
                <span className="">
                 {column.isSorted && (column.isSortedDesc ? (
                         <Icon shape={"arrow down"}/>
                     ) : (<Icon shape={"arrow up"}/>))}
        </span>
            </div>);
    };
    /*Function to render Single Select Row*/
    const renderSingleSelectDataGridRow = (row: any) => {
        return (
            <th>
                    <input
                        type="radio"
                        name={Constants.DEFAULT_RADIO_GROUP_NAME}
                        value={row}
                    />
            </th>
        );
    };
    const renderTableHeader = () => {
        return (
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {selectionType === GridSelectionType.SINGLE && <th />}
                    {headerGroup.headers.map((column:any) => (
                        <th {...column.getHeaderProps(isSorting?column.getSortByToggleProps():'')}
                            onClick={() => isSorting ? column.toggleSortBy(!column.isSortedDesc):''}
                        >
                            {isSorting?renderSorting(column):''}
                            {!isSorting?column.render(Constants.DEFAULT_COLUMN_HEADER):''}
                            <div className={"datagrid-column-separator"} />
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
        );
    };

    /**
     * Function to render react table Row
     * @param {cell.getCellProps} Return an array of prop objects and react-table will merge them appropriately
     * @param {cell.render } function takes in a string “Cell” that will act as a reference when we will structure our data.
     */
    const renderTableRow = () => {
        return (
            <tbody {...getTableBodyProps()} className={className}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {selectionType === GridSelectionType.SINGLE &&
                            renderSingleSelectDataGridRow(row)}
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render(Constants.DEFAULT_CELL_VALUE)}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        );
    };

    //Function to render react table with Table Header and Table Rows
    const renderTable = () => {
        return (
            <table {...getTableProps()} style={style} className={"data-grid-infinite-table"}>
                {renderTableHeader()}
                {renderTableRow()}
            </table>
        );
    };

    return isLoading ? <Spinner size={SpinnerSize.SMALL} /> : renderTable();
}
export default DataGridWithInfiniteScroll;