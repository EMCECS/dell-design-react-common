/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/components/DataGrid.scss";
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {
    DataGrid,
    GridRowType,
    DataGridFilter,
    FilterPosition,
    GridSelectionType,
    FilterType,
    SortOrder
} from "@dellstorage/clarity-react/datagrid";
import {
    normalColumns,
    normalRows,
    defaultFooter,
    expandableRows,
    hideShowColFooter,
    paginationDetails,
    filterFunction,
    paginationRows,
    sortColumns,
    customRows,
    customFooter,
    getSelectableRowsData,
    GridActions,
    sortFunction,
    columnsForCustomRows
} from "./DataGridStoriesData";

const datagridRef = React.createRef<DataGrid>();
const datagridActionsRef = React.createRef<GridActions>();
const datagridFilterRef = React.createRef<DataGrid>();
const datagridFilterSortRef = React.createRef<DataGrid>();
const datagridCustomFilterRef = React.createRef<DataGrid>();
const datagridCustomFilterMultiRef = React.createRef<DataGrid>();

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
                    {columnName: "Role"},
                ]}
                footer={defaultFooter}
                rows={normalRows}
            />
        </div>
    ))
    .add("Grid with expandable row", () => (
        <DataGrid
            columns={normalColumns}
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
    ))
    .add("Grid with custom cells and footer", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={columnsForCustomRows} rows={customRows} footer={customFooter} />
        </div>
    ))
    .add("Grid with multi select option and no footer", () => (
        <div style={{width: "80%", paddingLeft: "1rem"}}>
            <br />
            <span> {"Grid with all rows are selectable :"} </span>
            <DataGrid columns={normalColumns} rows={normalRows} selectionType={GridSelectionType.MULTI} />
            <br /> <br />
            <span> {"Grid with some rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={getSelectableRowsData()}
                selectionType={GridSelectionType.MULTI}
                footer={defaultFooter}
                id="multi-select-datagrid"
            />
        </div>
    ))
    .add("Grid with single select option", () => (
        <div style={{width: "80%", paddingLeft: "1rem"}}>
            <br />
            <span> {"Grid with all rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                selectionType={GridSelectionType.SINGLE}
                footer={defaultFooter}
            />
            <br /> <br />
            <span> {"Grid with some rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={getSelectableRowsData()}
                selectionType={GridSelectionType.SINGLE}
                footer={defaultFooter}
                id="single-select-datagrid"
            />
        </div>
    ))
    .add("Grid with sorting", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={sortColumns} rows={normalRows} footer={defaultFooter} />
        </div>
    ))
    .add("Grid with filter", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridFilterRef}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
                        filter: (
                            <DataGridFilter
                                placeholder={"Enter user ID"}
                                onFilter={filterFunction}
                                columnName={"User ID"}
                                datagridRef={datagridFilterRef}
                                position={FilterPosition.RIGHT}
                                defaultValue={41512}
                            />
                        ),
                    },
                    {
                        columnName: "Name",
                        style: {width: "96px"},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFilterRef}
                                position={FilterPosition.CENTER}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={normalRows}
                footer={defaultFooter}
            />
        </div>
    ))
    .add("Grid with sorting and filter", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridFilterSortRef}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
                        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"User ID"}
                                datagridRef={datagridFilterSortRef}
                            />
                        ),
                    },
                    {
                        columnName: "Name",
                        style: {width: "96px"},
                        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFilterSortRef}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={normalRows}
                footer={defaultFooter}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with filter having show/hide functionality", () => (
        <React.Fragment>
            <div style={{width: "80%"}}>
                <label> {"Datagrid with filter visible"} </label>
                <DataGrid
                    ref={datagridFilterRef}
                    columns={[
                        {columnName: "User ID"},
                        {
                            columnName: "Name",
                            filter: (
                                <DataGridFilter
                                    onFilter={filterFunction}
                                    columnName={"Name"}
                                    datagridRef={datagridFilterRef}
                                />
                            ),
                        },
                        {columnName: "Creation Date"},
                        {columnName: "Favorite color"},
                    ]}
                    rows={normalRows}
                    footer={defaultFooter}
                />
            </div>
            <br /> <br />
            <div style={{width: "80%"}}>
                <label> {"Datagrid with filter hidden"} </label>
                <DataGrid
                    ref={datagridCustomFilterMultiRef}
                    columns={[
                        {columnName: "User ID"},
                        {
                            columnName: "Name",
                            filter: (
                                <DataGridFilter
                                    onFilter={filterFunction}
                                    columnName={"Name"}
                                    datagridRef={datagridFilterRef}
                                    showFilter={false}
                                />
                            ),
                        },
                        {columnName: "Creation Date"},
                        {columnName: "Favorite color"},
                    ]}
                    rows={normalRows}
                    footer={defaultFooter}
                />
            </div>
        </React.Fragment>
    ))
    .add("Empty data grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} footer={defaultFooter} style={{height: "70vh"}} />
        </div>
    ));
