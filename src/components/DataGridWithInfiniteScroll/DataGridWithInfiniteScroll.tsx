/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {useTable, Column, useRowSelect, Hooks} from "react-table";
import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";
import {Constants} from "components/DataGridWithInfiniteScroll/Constants";

/**
 * General component description :
 * DataGridWithInfiniteScroll :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */

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
 * @param {rows} rows data
 * @param {columns} column details
 * @param {className} CSS class names
 * @param {style} to add custom CSS styles
 * @param {isLoading} if true then show loading icon before table is rendered
 * @param {selectionType} row selection type that is multi or single
 * @param {selectionType} row selection type that is multi or single
 */
type DataGridProps = {
    rows: {[key: string]: any}[];
    columns: Column<{[key: string]: any}>[];
    className?: string;
    style?: any;
    isLoading?: boolean;
    selectionType?: GridSelectionType;
};

function DataGridWithInfiniteScroll(props: DataGridProps) {
    const {style, isLoading, columns, selectionType} = props;
    const data = props?.rows;

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
 * @param {useTable } hook takes options and plugins to build a table instance. The basic options are columns and row data.
 * @param {useRowSelect } to select a dataGrid row
 */
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
        {
            columns,
            data,
        },
        useRowSelect,
        tableHooks,
    );

    const renderTableHeader = () => {
        return (
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className={"csg-header"}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                            <div className={"datagrid-column-separator"} />
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
        );
    };

    const renderTableRow = () => {
        return (
            <tbody {...getTableBodyProps()} className="table-body">
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className={"csg-row"}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        );
    };

    const renderTable = () => {
        return (
            <table {...getTableProps()} style={style} className={"data-grid-inifnite-table"}>
                {renderTableHeader()}
                {renderTableRow()}
            </table>
        );
    };

    return isLoading ? <Spinner size={SpinnerSize.SMALL} /> : renderTable();
}
export default DataGridWithInfiniteScroll;
