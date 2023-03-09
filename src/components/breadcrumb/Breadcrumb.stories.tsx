/**
 * Copyright (c) 2022 - 2023 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {storiesOf} from "@storybook/react";
import {Breadcrumbs, BreadcrumbItem} from "./Breadcrumb";
import {action} from "@storybook/addon-actions";
import "styles/components/Breadcrumb.scss";

const twoLevelBreadcrumbItems: Array<BreadcrumbItem> = [
    {title: "Data Grid with Infinite Scroll", path: "/?path=/story/data-grid-with-infinite-scroll--basic-grid"},
    {title: "Accordion Multi Panel", path: "/?path=/story/accordion--accordion-multi-panel", isActive: true},
];
const threeLevelBreadcrumbItems: Array<BreadcrumbItem> = [
    {title: "Data Grid with Infinite Scroll", path: "/?path=/story/data-grid-with-infinite-scroll--basic-grid"},
    {title: "Accordion Multi Panel", path: "/?path=/story/accordion--accordion-multi-panel"},
    {title: "Data Grid with Filtering", path: "#", isActive: true},
];
const fourLevelBreadcrumbItems: Array<BreadcrumbItem> = [
    {title: "Data Grid with Infinite Scroll", path: "/?path=/story/data-grid-with-infinite-scroll--basic-grid"},
    {title: "Accordion Multi Panel", path: "/?path=/story/accordion--accordion-multi-panel"},
    {title: "Data Grid with Filtering", path: "/?path=/story/datagrid--basic-grid-with-filtering"},
    {title: "Main Container", path: "#", isActive: true},
];
const fiveLevelBreadcrumbItems: Array<BreadcrumbItem> = [
    {title: "Data Grid with Infinite Scroll", path: "/?path=/story/data-grid-with-infinite-scroll--basic-grid"},
    {title: "Accordion Multi Panel", path: "/?path=/story/accordion--accordion-multi-panel"},
    {title: "Data Grid with Filtering", path: "/?path=/story/datagrid--basic-grid-with-filtering"},
    {title: "Main Container", path: "/?path=/story/maincontainer--main-container"},
    {title: "Vertical Navigation", path: "#", isActive: true},
];

const singleBreadcrumbItem: Array<BreadcrumbItem> = [
    {
        title: "Data Grid with Infinite Scroll",
        path: "/?path=/story/data-grid-with-infinite-scroll--basic-grid",
        isActive: true,
    },
];

storiesOf("Breadcrumb", module).add("Basic", () => (
    <React.Fragment>
        Single Breadcrumb: <Breadcrumbs breadcrumbItems={singleBreadcrumbItem} />
        <br />
        Two level Breadcrumbs:{" "}
        <Breadcrumbs breadcrumbItems={twoLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        <br />
        Three level Breadcrumbs:{" "}
        <Breadcrumbs breadcrumbItems={threeLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        <br />
        Four level Breadcrumbs:{" "}
        <Breadcrumbs breadcrumbItems={fourLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        <br />
        Five level Breadcrumbs:{" "}
        <Breadcrumbs breadcrumbItems={fiveLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        <br />
    </React.Fragment>
));
