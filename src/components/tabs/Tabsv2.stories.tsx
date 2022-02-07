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
import {State} from "@sambego/storybook-state";
import {TabsV2, TabV2Orientation} from "@dellstorage/clarity-react/tabs";
import "styles/components/Tabs.scss";
import {store, tabPanes} from "components/tabs/TabsV2Utils";

storiesOf("TabsV2", module)
    .add("TabV2 Horizontal", () => (
        <State store={store}>
            {(state) => (
                <TabsV2 id="horizontalTabs" tabs={state.simpleTabs} tabOrientation={TabV2Orientation.HORIZONTAL}>
                    {tabPanes.map((tabPane) => tabPane)}
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Static", () => (
        <State store={store}>
            {(state) => (
                <TabsV2 id="staticTabs" tabs={state.staticTabs} tabOrientation={TabV2Orientation.HORIZONTAL}>
                    {tabPanes.map((tabPane) => tabPane)}
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Overflow", () => (
        <State store={store}>
            {(state) => (
                <TabsV2
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabV2Orientation.HORIZONTAL}
                    overflowTabsFrom={2}
                >
                    {tabPanes.map((tabPane) => tabPane)}
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Overflow - only tabs", () => (
        <State store={store}>
            {(state) => (
                <TabsV2
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabV2Orientation.HORIZONTAL}
                    overflowTabsFrom={2}
                />
            )}
        </State>
    ))
    .add("TabV2 Static with Tab Selected", () => (
        <State store={store}>
            {(state) => (
                <TabsV2
                    id="staticTabsWithTabSelected"
                    tabs={state.staticTabsWithTabSelected}
                    tabOrientation={TabV2Orientation.HORIZONTAL}
                >
                    {tabPanes.map((tabPane) => tabPane)}
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Vertical", () => (
        <State store={store}>
            {(state) => (
                <TabsV2 id="verticalTabs" tabs={state.simpleTabs} tabOrientation={TabV2Orientation.VERTICAL}>
                    {tabPanes.map((tabPane) => tabPane)}
                </TabsV2>
            )}
        </State>
    ));
