import {storiesOf} from "@storybook/react";
import React from "react";
import DataGridWithInfiniteScroll, {GridSelectionType,} from "./DataGridWithInfiniteScroll";
import {DATA} from "./DatagridInfiniteScrollMockData";
import {DETAILDATA} from "./DatagridInfiniteScrollDetailPanelMockData";
import DataTable,{ ExpanderComponentProps } from 'react-data-table-component';

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data.title, null, 2)}</pre>;

const columnsData = [
    {accessor: "ip", Header: "IP"},
    {accessor: "serial", Header: "Serial"},
    { accessor: "model", Header: "Model"},
    {accessor: "template", Header: "Template"},
    {accessor: "networking", Header: "Networking"},
    {accessor: "role", Header: "Role"}
];

const detailColumns = [
    {accessor: "status", Header: "Status"},
    {accessor: "name", Header: "Disk"},
    { accessor: "slot", Header: "Slot" },
    {accessor: "serial", Header: "Serial#"},
    {accessor: "type", Header: "Type"},
    { accessor: "capacityUsed",  Header: "Capacity Used" },
];
const columnsExpansion = [
    {name: 'Title',selector: row => row.title, },
    {name: 'Year',selector: row => row.year},
];

const dataExpansion = [
    {id: 1, title: 'Beetlejuice', year: '1988' },
    {id: 2,title: 'Ghostbusters',year: '1984'},
];

type DataRow = {
    title: string;
    director: string;
    year: string;
};

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
            <DataGridWithInfiniteScroll row={DATA.rows} column={columnsData} isFilter={true}/>
        </div>
    ))
     .add("Grid with Expandable Row", () => (
         <div>
             <DataTable columns={columnsExpansion} data={dataExpansion} expandableRows expandableRowsComponent={ExpandedComponent} />
         </div>
     ))
    .add("Grid with Column Hide/Show", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={DETAILDATA.data}
                column={detailColumns}
                columnSelect={true}
            />
        </div>
    ))
    .add("Grid with Detail Panel", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={DETAILDATA.data}
                column={detailColumns}
                detailPanelShow={true}
            />
        </div>
    ))
    .add("Empty Datagrid", () => (
        <div>
            <DataGridWithInfiniteScroll
                row={[]}
                column={columnsData}
                style={{height: "70vh"}}
            />
        </div>
    ));
