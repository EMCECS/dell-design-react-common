/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {TabV2Details, TabV2Type, TabPane} from "@dellstorage/clarity-react/tabs";
import {Store} from "@sambego/storybook-state";

const tabsData: TabV2Details[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
    },
    {
        name: "Management",
        id: "mgmt",
    },
    {
        name: "Cloud",
        id: "cloud",
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
    },
    {
        name: "Metrics",
        id: "metrics",
    },
    {
        name: "Policies",
        id: "policies",
    },
];

const staticTabsData: TabV2Details[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
    },
    {
        name: "Management",
        id: "mgmt",
        isDisabled: false,
        tabType: TabV2Type.STATIC,
    },
    {
        name: "Cloud",
        id: "cloud",
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
    },
    {
        name: "Metrics",
        id: "metrics",
        isDisabled: true,
    },
    {
        name: "Policies",
        id: "policies",
        isDisabled: true,
    },
];

const staticTabsWithTabSelected = [...staticTabsData];
staticTabsWithTabSelected[3].isSelected = true;
staticTabsWithTabSelected[0].isSelected = false;

export const store = new Store({
    simpleTabs: tabsData,
    staticTabs: staticTabsData,
    staticTabsWithTabSelected: staticTabsWithTabSelected,
    onTabClick: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details, updatedTabs: TabV2Details[]): void => {
        store.set({
            simpleTabs: [...updatedTabs],
        });
    },
});

export const tabPanes: JSX.Element[] = [
    <TabPane id={"dashboard"}>{"DASHBOARD"}</TabPane>,
    <TabPane id={"mgmt"}>{"MANAGEMENT"}</TabPane>,
    <TabPane id={"cloud"}>{"CLOUD"}</TabPane>,
    <TabPane id={"infra"}>{"INFRASTRUCTURE"}</TabPane>,
    <TabPane id={"metrics"}>{"METRICS"}</TabPane>,
    <TabPane id={"policies"}>{"POLICIES"}</TabPane>,
];
