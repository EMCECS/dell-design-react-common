/**
 * Copyright (c) 2022 - 2023 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {storiesOf} from "@storybook/react";
import {Accordion} from "@dellstorage/clarity-react/accordian";
import {action} from "@storybook/addon-actions";
import "styles/components/Breadcrumb.scss";
import {Breadcrumbs, BreadcrumbItem} from "./Breadcrumb";

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
const defaultBreadcrumbs = [
    {title: "Single Level Breadcrumb", itemComponent: <Breadcrumbs breadcrumbItems={singleBreadcrumbItem} />},
    {
        title: "Two level Breadcrumb",
        itemComponent: (
            <Breadcrumbs breadcrumbItems={twoLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        ),
    },
    {
        title: "Three level Breadcrumb",
        itemComponent: (
            <Breadcrumbs breadcrumbItems={threeLevelBreadcrumbItems} onClick={action("breadcrumbItem click")} />
        ),
    },
];

const collapsibleBreadcrumbs = (maxItems: number = 3, isCollapsible?: boolean) => [
    {
        title: `${isCollapsible && maxItems < 4 ? "Collapsible " : ""}Four level Breadcrumb`,
        itemComponent: (
            <Breadcrumbs
                breadcrumbItems={fourLevelBreadcrumbItems}
                onClick={action("breadcrumbItem click")}
                maxItems={maxItems}
                isCollapsible={isCollapsible}
            />
        ),
    },
    {
        title: `${isCollapsible && maxItems < 5 ? "Collapsible " : ""}Five level Breadcrumb`,
        itemComponent: (
            <Breadcrumbs
                breadcrumbItems={fiveLevelBreadcrumbItems}
                onClick={action("breadcrumbItem click")}
                maxItems={maxItems}
                isCollapsible={isCollapsible}
            />
        ),
    },
];

storiesOf("Breadcrumb", module)
    .add("Default Breadcrumbs", () => <Accordion content={[...defaultBreadcrumbs, ...collapsibleBreadcrumbs()]} />)
    .add("Collapsible Breadcrumbs with Default (3)", () => (
        <Accordion content={[...defaultBreadcrumbs, ...collapsibleBreadcrumbs(undefined, true)]} />
    ))
    .add("Collapsible Breadcrumbs with maxItems as 4", () => <Accordion content={collapsibleBreadcrumbs(4, true)} />);
