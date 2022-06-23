import {storiesOf} from "@storybook/react";
import React from "react";
import DataGridInfiniteScroll from "./dataGridInfiniteScroll";
import {DATA} from "./datagridInfiniteScrollData";

const columns = [{accessor: "ip", Header: "IP"}, {accessor: "serial", Header: "Serial"}, {
    accessor: "model",
    Header: "Model"
}, {accessor: "template", Header: "Template"}, {accessor: "networking", Header: "Networking"}, {
    accessor: "role",
    Header: "Role"
},];

storiesOf("Data Grid with Infinite Scroll", module)
    .add("POC on Infinite Scroll", () => (<div>
        <DataGridInfiniteScroll data={DATA.data} column={columns}/>
    </div>))

