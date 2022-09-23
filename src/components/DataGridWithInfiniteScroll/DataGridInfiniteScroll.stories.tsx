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
import {columnsData, rowData} from "components/DataGridWithInfiniteScroll/DatagridInfiniteScrollMockData";
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
));