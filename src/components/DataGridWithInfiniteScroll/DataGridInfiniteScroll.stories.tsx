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
import DataGridWithInfiniteScroll,{GridSelectionType} from "components/DataGridWithInfiniteScroll/DataGridWithInfiniteScroll";
import {columnsData, rowData, detailColumns,DETAILDATA,detailDataProps,} from "components/DataGridWithInfiniteScroll/DatagridInfiniteScrollMockData";
import "styles/components/DataGridWithInfinteScroll.scss";
import "bootstrap/dist/css/bootstrap.css";

storiesOf("Data Grid with Infinite Scroll", module).add("Basic Grid", () => (
    <div>
        <DataGridWithInfiniteScroll rows={rowData} columns={columnsData} />
    </div>
)).add("DataGrid with multi select option", () => (
    <div>
        <DataGridWithInfiniteScroll rows={rowData} columns={columnsData} isSorting={true} selectionType={GridSelectionType.MULTI} />
    </div>
)).add("DataGrid with single select option", () => (
    <div>
        <DataGridWithInfiniteScroll rows={rowData} columns={columnsData} selectionType={GridSelectionType.SINGLE} />
    </div>
)).add("DataGrid with sorting", () => (
    <div>
        <DataGridWithInfiniteScroll rows={rowData} columns={columnsData} isSorting={true} />
    </div>
)).add("DataGrid with Panel Filter", () => (
    <div>
        <DataGridWithInfiniteScroll rows={rowData} columns={columnsData} isFilter={true} />
    </div>
))
.add("Grid with Column Hide/Show", () => (
    <div>
        <DataGridWithInfiniteScroll
            rows={rowData} columns={columnsData}
            showColumnSelect={true}
            defaultColumnHeader={"Serial"}
        />
    </div>
))
.add("Grid with Detail Panel", () => (
    <div>
        <DataGridWithInfiniteScroll
            rows={DETAILDATA}
            columns={detailColumns}
            showDetailPanel={true}
            detailDataProps={detailDataProps}
        />
    </div>
))
.add("Empty Datagrid", () => (
    <div>
        <DataGridWithInfiniteScroll
            rows={[]}
            columns={columnsData}
            style={{ height: "70vh" }}
        />
    </div>
));