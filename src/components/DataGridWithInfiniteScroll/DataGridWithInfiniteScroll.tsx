/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {useTable, Column, useRowSelect, Hooks, Cell, UseRowSelectRowProps} from "react-table";
import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";
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
    const columns = props?.columns;
    const data = props?.rows;
    const {style, isLoading} = props;
    const selectionType= props.selectionType;

    const tableHooks = (hooks:Hooks)=>{
        if(selectionType === GridSelectionType.MULTI) {
            hooks.visibleColumns.push((columns: Column<{[key: string]: any}>[]) => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}: Hooks) => (
                        <CheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({row}: Hooks) => <CheckBox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ])
        }
    }

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows} = useTable({
        columns,
        data,
    },
        useRowSelect,
        tableHooks
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
            <>
            <table {...getTableProps()} style={style} className={"data-grid-inifnite-table"}>
                {renderTableHeader()}
                {renderTableRow()}
            </table>
                <pre>
        <code>
          {JSON.stringify(
              {
                  selectedFlatRows: selectedFlatRows.map(row => [row.original, row.index])
              },
              null,
              2
          )}
        </code>
      </pre>
            </>
        );
    };

    return isLoading ? <Spinner size={SpinnerSize.SMALL} /> : renderTable();
}
export default DataGridWithInfiniteScroll;
