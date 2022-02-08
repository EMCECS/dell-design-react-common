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
import {Tabs, TabOrientation} from "@dellstorage/clarity-react/tabs";
import {State} from "@sambego/storybook-state";
import {store} from "components/tabs/TabsUtils";
import "styles/components/Tabs.scss";

storiesOf("Tabs", module)
    .add("Tab Horizontal", () => (
        <State store={store}>
            {(state) => (
                <Tabs
                    id="horizontalTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ))
    .add("Tab Overflow", () => (
        <State store={store}>
            {(state) => (
                <Tabs
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                    overflowTabsFrom={1}
                />
            )}
        </State>
    ))
    .add("Tab Vertical", () => (
        <State store={store}>
            {(state) => (
                <Tabs
                    id="verticalTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.VERTICAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ))
    .add("Tab Static", () => (
        <State store={store}>
            {(state) => (
                <Tabs
                    id="staticTabs"
                    tabs={state.staticTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ));
