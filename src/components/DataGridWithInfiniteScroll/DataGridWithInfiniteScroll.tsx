/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
 import React, { useMemo } from "react";
 import { useTable } from "react-table";
 import {
     Spinner,
     SpinnerSize,
 } from "@dellstorage/clarity-react/spinner/Spinner";
 
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
  */
 type DataGridProps = {
     rows: { [key: string]: any }[];
     columns: { [key: string]: any };
     style?: any;
     isLoading?: boolean;
 };
 
 function DataGridWithInfiniteScroll(props: DataGridProps) {
     const columns: any = useMemo(() => props.columns, []);
     const data = useMemo(() => props.rows, []);
     const style = props?.style;
     const isLoading = props?.isLoading;
 
     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
         useTable({
             columns,
             data,
         });
 
     return isLoading ? (
         <Spinner size={SpinnerSize.SMALL} />
     ) : (
         <table {...getTableProps()} style={style}>
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
     );
 }
 
 export default DataGridWithInfiniteScroll;
 