/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
 import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
 import { Button } from "@dellstorage/clarity-react/forms/button";
 import { useTable } from "react-table";
 import {
     Spinner,
     SpinnerSize,
 } from "@dellstorage/clarity-react/spinner/Spinner";
import { Constants } from "./Constants";
 
 /**
  * General component description :
  * DataGridWithInfiniteScroll :
  * Datagrids are for organizing large volumes of data that users can perform actions on.
  */
 
 /**
  * @param {rows} rows data
  * @param {columns} column details
  * @param {style} to add custom CSS styles
  * @param {isLoading} if true then show loading icon before table is rendered
  * @param {defaultColumnHeader} defaultColumnHeader is to set one default column on Column Show Hide functionality to show that column on DataGrid
  * @param {showColumnSelect} showColumnSelect is boolean value if true,column can be show or hide
 */
 type DataGridProps = {
     rows: { [key: string]: any }[];
     columns: { [key: string]: any };
     style?: any;
     isLoading?: boolean;
     defaultColumnHeader?: string;
     showColumnSelect?: boolean;
 };
 
 function DataGridWithInfiniteScroll(props: DataGridProps) {
     const columns: any = useMemo(() => props.columns, []);
     const data = useMemo(() => props.rows, []);
     const defaultColumnHeader = props?.defaultColumnHeader;
     const style = props?.style;
     const isLoading = props?.isLoading;
     const showColumnSelect = props?.showColumnSelect;
     const [isOpen, setOpen] = useState<boolean>(false);

 
  
  /**
  * @param {getTableProps} is a function to resolve any props needed by the react table wrapper.
  * @param {getTableBodyProps } to render table body of react table
  * @param {headerGroups } return headers which is going to be the headers of the table
  * @param {rows} display rows of the datagrid
  * @param {allColumns} display all columns of the datagrid
  * @param {getToggleHideAllColumnsProps} If datagrid have hide show column functionality
  * @param {prepareRow} is a function that must be called on any row to be displayed. It is responsible for preparing a row for rendering.
  * @param {useTable } hook takes options and plugins to build a table instance. The basic options are columns and row data.
  */
     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns, getToggleHideAllColumnsProps} =
         useTable({
             columns,
             data,
         });

  
  // This funtion is to get the Reset Setting for column selection, which shows all the columns
    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }: any, ref) => {
        //Can not change any type, as this are in built func
        const defaultRef = useRef();
        const resolvedRef: any = ref || defaultRef; // TODO : Change "any" to specific type while writing wrappers

        useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);
        return (
            <div className="checkbox">
            <label>
            <input
                type="checkbox"
                className="input-assumpte"
                ref={resolvedRef}
                {...rest}
            />
            <span className="reset-button">{Constants.RESET_SETTINGS}</span> 
            </label> 
            </div>
        );
        }
    );
   
   
    //RenderColumnSelection function returns the column selection 
    const renderColumnSelection = () => {
        return (
            <div className="column-switch clr-popover-content column-select-popup">
              <div className="ColumnSelect">
                <span className="ColumnSelect-header">{Constants.COLUMN_PICKER}</span>
    
                    {allColumns.map(
                        (
                            column: any // TODO : Change "any" to specific type while writing wrappers
                        ) => (
                            <div key={column.id}>
                            {column.Header !== defaultColumnHeader && 
                            (
                            <label>
                                    <input type="checkbox" id={Constants.ID_FOR_ALL_COLUMN_SELECT} {...column.getToggleHiddenProps()} />
                                    <span className="ColumnSelect-header-names">{column.Header}</span>                               
                            </label>
                            )}
                            </div>
                        )
                    )}
               </div>
               <hr></hr>
                <div className="ColumnSelect-reset-button">     
                    <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                    (<label> <span className="reset-button">{Constants.RESET_SETTINGS}</span> </label>)
                </div>
            </div>
        );
    };
 
     return isLoading ? (
         <Spinner size={SpinnerSize.SMALL} />
     ) : (
         <div>
            {isOpen && renderColumnSelection()}
            {showColumnSelect && (                         
                          <Button
                              link
                              onClick={() => setOpen(!isOpen)}
                              icon={{
                               shape:"view-columns"                               
                              }}
                              className={"column-select-icon"}
                          />
            )}
         <table {...getTableProps()} style={style} >
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
         </table>
         </div>
     );
 }
 
 export default DataGridWithInfiniteScroll;
 