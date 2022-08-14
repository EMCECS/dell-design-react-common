import {storiesOf} from "@storybook/react";
import DataGridWithInfiniteScroll, {GridSelectionType} from "./DataGridWithInfiniteScroll";
import {DATA} from "./DatagridInfiniteScrollMockData";
import {DETAILDATA} from "./DatagridInfiniteScrollDetailPanelMockData"

const columns = [{accessor: "ip", Header: "IP", show: true}, {accessor: "serial", Header: "Serial", show: true}, {
    accessor: "model",
    Header: "Model", show: false
}, {accessor: "template", Header: "Template", show: true}, {accessor: "networking", Header: "Networking", show: true}, {
    accessor: "role",
    Header: "Role", show: false
},];

const detailColumns = [{accessor: "status", Header: "Status", show: true}, {accessor: "name", Header: "Disk", show: true}, {
    accessor: "slot",
    Header: "Slot", show: false
}, {accessor: "serial", Header: "Serial#" , show: true }, {accessor: "type", Header: "Type", show: false}, {
    accessor: "capacityUsed",
    Header: "Capacity Used", show: true
},];


storiesOf("Data Grid with Infinite Scroll", module)
    .add("Basic Grid", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns} />
    </div>))
    .add("Grid with Multiselect", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns} selectionType={GridSelectionType.MULTI}/>
    </div>))
    .add("Grid with Sorting", () => (<div>
        <DataGridWithInfiniteScroll row={DATA.rows} column={columns} sorting={true} />
    </div>))
    .add("Grid with Column Hide/Show", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns}  columnSelect={true} defaultColumnHeader={"Status"}/>
    </div>))
    .add("Grid with Detail Panel", () => (<div>
        <DataGridWithInfiniteScroll row={DETAILDATA.data} column={detailColumns} detailPanelShow={true}/>
    </div>))
    .add("Empty Datagrid", () => (<div>
        <DataGridWithInfiniteScroll row={[]} column={columns} style={{height: "70vh"}}/>
    </div>))