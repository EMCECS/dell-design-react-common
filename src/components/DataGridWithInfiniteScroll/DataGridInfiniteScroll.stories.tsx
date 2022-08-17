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
import React from "react";
import DataGridWithInfiniteScroll, {GridSelectionType,} from "./DataGridWithInfiniteScroll";
import {DATA} from "./DatagridInfiniteScrollMockData";
import {DETAILDATA} from "./DatagridInfiniteScrollDetailPanelMockData";
import DataTable from 'react-data-table-component';
import FilterData from './FilterMockData.json'

// A super simple expandable component.
const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data.title, null, 2)}</pre>;

const columns = [{accessor: "ip", Header: "IP", show: true}, {accessor: "serial", Header: "Serial", show: true}, {
    accessor: "model",
    Header: "Model", show: false
}, {accessor: "template", Header: "Template", show: true}, {accessor: "networking", Header: "Networking", show: true}, {
    accessor: "role",
    Header: "Role", show: false
},];

const detailColumns = [
    {accessor: "status", Header: "Status", show: true},
    {accessor: "name", Header: "Disk", show: true},
    {accessor: "slot", Header: "Slot", show: false },
    {accessor: "serial", Header: "Serial#" , show: true },
    {accessor: "type", Header: "Type", show: false},
    {accessor: "capacityUsed", Header: "Capacity Used", show: true
},];


const columnsData = [
    {accessor: "ip", Header: "IP"},
    {accessor: "serial", Header: "Serial"},
    {accessor: "model", Header: "Model"},
    {accessor: "template", Header: "Template"},
    {accessor: "networking", Header: "Networking"},
    {accessor: "role", Header: "Role"}
];

/*const detailColumns = [
    {accessor: "status", Header: "Status"},
    {accessor: "name", Header: "Disk"},
    {accessor: "slot", Header: "Slot"},
    {accessor: "serial", Header: "Serial#"},
    {accessor: "type", Header: "Type"},
    {accessor: "capacityUsed", Header: "Capacity Used"},
];*/
const columnsExpansion = [
    {name: 'Title', selector: row => row.title,},
    {name: 'Year', selector: row => row.year},
];

const dataExpansion = [
    {id: 1, title: 'Beetlejuice', year: '1988'},
    {id: 2, title: 'Ghostbusters', year: '1984'},
];

type DataRow = {
    title: string;
    director: string;
    year: string;
};

const applyFilter = (obj: any): void => {
    const filter: string[] = []
    obj.map((item: any, index: number) => {
        switch (index) {
            case 0:
                Object.entries(item).map((subItem: any) => {
                    subItem[1] && filter.push(subItem[0])
                })
        }
    })
}


storiesOf("Data Grid with Infinite Scroll", module)
    .add("Basic Grid", () => (
        <div>
            <DataGridWithInfiniteScroll row={DATA.rows} column={columnsData}/>
        </div>
    ))
    .add("Grid with Multiselect", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={DATA.rows}
                column={columnsData}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with Single Select", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={DATA.rows}
                column={columnsData}
                selectionType={GridSelectionType.SINGLE}
            />
        </div>
    ))
    .add("Grid with Sorting", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={DATA.rows}
                column={columnsData}
                sorting={true}
            />
        </div>
    ))
    .add("Grid with Filter", () => (
        <div>
            <DataGridWithInfiniteScroll row={DATA.rows} column={columnsData} isFilter={true}
                                        filterData={FilterData.filterData}
                                        filterFunction={(obj: any) => applyFilter(obj)}/>
        </div>
    ))
     .add("Grid with Expandable Row", () => (
         <div>
             <DataTable columns={columnsExpansion} data={dataExpansion} expandableRows expandableRowsComponent={ExpandedComponent} />
         </div>
     ))
     .add("Grid with Column Hide/Show", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns}  columnSelect={true} defaultColumnHeader={"Status"}/>
    </div>))
    .add("Grid with Detail Panel", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns} detailPanelShow={true}/>
    </div>))
    .add("Empty Datagrid", () => (<div>
        <DataGridWithInfiniteScroll row={[]} column={columns} style={{height: "70vh"}}/>
    </div>));
