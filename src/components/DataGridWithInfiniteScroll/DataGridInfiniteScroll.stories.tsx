/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

 import {storiesOf} from "@storybook/react";
 import DataGridWithInfiniteScroll, {GridSelectionType,} from "./DataGridWithInfiniteScroll";
 import {
     columns,
     columnsData,
     columnsExpansion,
     DATA,
     dataExpansion,
     detailColumns,
     DETAILDATA,
     detailDataProps,
     ExpandedComponent,
     filterComponent,
     getColumnNameAndOrder,
 } from "components/DataGridWithInfiniteScroll/DatagridInfiniteScrollMockData";
 import DataTable from "react-data-table-component";
 import "styles/components/DataGridWithInfinteScroll.scss";
 import "bootstrap/dist/css/bootstrap.css";
 
 storiesOf("Data Grid with Infinite Scroll", module)
     .add("Basic Grid", () => (<div>
             <DataGridWithInfiniteScroll rows={DATA.rows} columns={columnsData}/>
         </div>))
     .add("Grid with Multiselect", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DATA.rows}
                 columns={columnsData}
                 selectionType={GridSelectionType.MULTI}
             />
         </div>))
     .add("Grid with Single Select", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DATA.rows}
                 columns={columnsData}
                 selectionType={GridSelectionType.SINGLE}
             />
         </div>))
     .add("Grid with Sorting", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DATA.rows}
                 columns={columnsData}
                 isSorting={true}
                 callbackForColumnName={getColumnNameAndOrder}
 
             />
         </div>))
     .add("Grid with Filter", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DATA.rows}
                 columns={columnsData}
                 isFilter={true}
                 filterData={filterComponent()}
             />
         </div>))
     .add("Grid with Expandable Row", () => (<div>
             <DataTable
                 columns={columnsExpansion}
                 data={dataExpansion}
                 expandableRows
                 expandableRowsComponent={ExpandedComponent}
             />
         </div>))
     .add("Grid with Column Hide/Show", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DETAILDATA}
                 columns={detailColumns}
                 showColumnSelect={true}
                 defaultColumnHeader={"Status"}
             />
         </div>))
     .add("Grid with Detail Panel", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={DETAILDATA}
                 columns={detailColumns}
                 showDetailPanel={true}
                 detailDataProps={detailDataProps}
             />
         </div>))
     .add("Empty Datagrid", () => (<div>
             <DataGridWithInfiniteScroll
                 rows={[]}
                 columns={columns}
                 style={{height: "70vh"}}
             />
         </div>));
      