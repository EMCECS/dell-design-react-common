/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/DataGrid.scss";
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {DataGrid, GridRowType, DataGridFilter, FilterPosition} from "@dellstorage/clarity-react/datagrid";
import {
    normalColumns,
    normalRows,
    defaultFooter,
    expandableRows,
    hideShowColFooter,
    paginationDetails,
    filterFunction,
    paginationRows,
    sortColumns
} from "./DataGridStoriesData";

const datagridFilterRef = React.createRef<DataGrid>();

storiesOf("DataGrid", module)
    .add("Basic grid with filtering", () => (
        <div style={{width: "80%"}}>
            <DataGrid 
                ref={datagridFilterRef}
                columns={[
                    {columnName: "IP"},
                    {
                        columnName: "Serial",
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFilterRef}
                                position={FilterPosition.CENTER}
                            />
                        ),
                    },
                    {columnName: "Model"},
                    {columnName: "Template"},
                    {columnName: "Networking"},
                    {columnName: "Role"}
                ]}
                footer={defaultFooter} 
                rows={normalRows}
            />
        </div>
    ))
    .add("Grid with expandable row", () => (
            <DataGrid  
                columns = {normalColumns}          
                rows={expandableRows}
                footer={hideShowColFooter}
                rowType={GridRowType.EXPANDABLE}
                itemText={"Items"}
            />
    ))
    .add("Grid with pagination", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={paginationRows.slice(0, 5)}
                pagination={paginationDetails}
                itemText={"Items"}
                footer={{showFooter: true}}
            />
        </div>
    ))
    .add("Grid with sorting", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={sortColumns} rows={normalRows} footer={defaultFooter} />
        </div>
    ));
