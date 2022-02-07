/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {TabDetails, TabType} from "@dellstorage/clarity-react/tabs";
import {Store} from "@sambego/storybook-state";

const tabsData: TabDetails[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
        component: <p>Content for Dashboard tab.</p>,
    },
    {
        name: "Management",
        id: "mgmt",
        component: <p>Content for Management tab.</p>,
    },
    {
        name: "Cloud",
        id: "cloud",
        component: <p>Content for Cloud tab.</p>,
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
        component: <p>Content for Infrastructure tab.</p>,
    },
];

const staticTabsData: TabDetails[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
        component: <p>Content for Dashboard tab.</p>,
    },
    {
        name: "Management",
        id: "mgmt",
        isDisabled: false,
        component: <p>Content for Management tab.</p>,
        tabType: TabType.STATIC,
    },
    {
        name: "Cloud",
        id: "cloud",
        component: <p>Content for Cloud tab.</p>,
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
        component: <p>Content for Infrastructure tab.</p>,
    },
];

export const store = new Store({
    simpleTabs: tabsData,
    staticTabs: staticTabsData,
    onTabClick: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabDetails, updatedTabs: TabDetails[]): void => {
        store.set({
            simpleTabs: [...updatedTabs],
        });
    },
});
