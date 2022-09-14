/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { storiesOf } from "@storybook/react";
import DataGridWithInfiniteScroll from "components/DataGridWithInfiniteScroll/DataGridWithInfiniteScroll";
import {
    columnsData,
    DATA,
} from "components/DataGridWithInfiniteScroll/DatagridInfiniteScrollMockData";
import "styles/components/DataGridWithInfinteScroll.scss";
import "bootstrap/dist/css/bootstrap.css";

storiesOf("Data Grid with Infinite Scroll", module)
    .add("Basic Grid", () => (
        <div>
            <DataGridWithInfiniteScroll rows={DATA.rows} columns={columnsData} />
        </div>
    ))
