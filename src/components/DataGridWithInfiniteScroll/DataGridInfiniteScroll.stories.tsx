import {storiesOf} from "@storybook/react";
import React from "react";
import DataGridWithInfiniteScroll, {GridSelectionType} from "./DataGridWithInfiniteScroll";
import {DATA} from "./DatagridInfiniteScrollMockData";
import {DETAILDATA} from "./DatagridInfiniteScrollDetailPanelMockData"

const columns = [{accessor: "ip", Header: "IP"}, {accessor: "serial", Header: "Serial"}, {
    accessor: "model",
    Header: "Model"
}, {accessor: "template", Header: "Template"}, {accessor: "networking", Header: "Networking"}, {
    accessor: "role",
    Header: "Role"
},];

const detailColumns = [{accessor: "status", Header: "Status"}, {accessor: "name", Header: "Disk"}, {
    accessor: "slot",
    Header: "Slot"
}, {accessor: "serial", Header: "Serial#"}, {accessor: "type", Header: "Type"}, {
    accessor: "capacityUsed",
    Header: "Capacity Used"
},];

storiesOf("Data Grid with Infinite Scroll", module)
    .add("Basic Grid", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns}/>
    </div>))
    .add("Grid with Multiselect", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns} selectionType={GridSelectionType.MULTI}/>
    </div>))
    .add("Grid with Sorting", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns} sorting={true}/>
    </div>))
    .add("Grid with Column Hide/Show", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns} columnSelect={true}/>
    </div>))
    .add("Grid with Detail Panel", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns} detailPanelShow={true}/>
    </div>))
    .add("Empty Datagrid", () => (<div>
        <DataGridWithInfiniteScroll row={[]} column={columns} style={{height: "70vh"}}/>
    </div>))