/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {useTable, Column} from "react-table";
import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
import {Constants} from "components/DataGridWithInfiniteScroll/Constants";

/**
 * General component description :
 * DataGridWithInfiniteScroll :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */

/**
 * @param {rows} rows data
 * @param {columns} column details
 * @param {className} CSS class names
 * @param {style} to add custom CSS styles
 * @param {isLoading} if true then show loading icon before table is rendered
 */
type DataGridProps = {
    rows: {[key: string]: any}[];
    columns: Column<{[key: string]: any}>[];
    style?: any;
    isLoading?: boolean;
};

function DataGridWithInfiniteScroll(props: DataGridProps) {
    const {style, isLoading, columns} = props;
    const data = props.rows;

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
    });

    const renderTableHeader = () => {
        return (
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render(Constants.DEFAULT_COLUMN_HEADER)}
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
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render(Constants.DEFAULT_CELL_VALUE)}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        );
    };

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
