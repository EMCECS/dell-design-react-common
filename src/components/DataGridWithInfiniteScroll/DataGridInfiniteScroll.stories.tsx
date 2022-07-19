import {storiesOf} from "@storybook/react";
import React from "react";
import DataGridWithInfiniteScroll, {GridSelectionType} from "./DataGridWithInfiniteScroll";
import {DATA} from "./DatagridInfiniteScrollMockData";

const columns = [{accessor: "ip", Header: "IP"}, {accessor: "serial", Header: "Serial"}, {
    accessor: "model",
    Header: "Model"
}, {accessor: "template", Header: "Template"}, {accessor: "networking", Header: "Networking"}, {
    accessor: "role",
    Header: "Role"
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
