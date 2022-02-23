/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import { NavLink } from "react-router-dom";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import {Icon} from "@dellstorage/clarity-react/icon/Icon";
import {MainContainer} from "@dellstorage/clarity-react/layout/main-container";
import {Dropdown, DropdownMenu, DropdownItem} from "@dellstorage/clarity-react/forms/dropdown";

import "styles/components/MainContainer.scss";
import { Button } from "@dellstorage/clarity-react/forms/button";

storiesOf("MainContainer", module)

    .add("MainContainer", () => (
        <React.Fragment>
            <h4>MainContainer</h4>
            <MainContainer title="Basic MainContainer" />
        </React.Fragment>
    ))
    .add("MainContainer with actions", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}> MainContainer with dropdown</h4>
            <MainContainer
                title={"MainContainer with actions"}
                actions={
                    <React.Fragment>
                        <Button onClick={action("delete click")} icon={{shape: "trash"}}/>
                        <Button onClick={action("delete click")} icon={{shape: "home"}}/>
                    </React.Fragment>
                }
            >
            </MainContainer>
        </React.Fragment>
    ))
    .add("MainContainer with dropdown actions", () => (
        <React.Fragment>
            <h4> MainContainer with dropdown</h4>
            <MainContainer
                title={"MainContainer with actions"}
                actions={
                    <React.Fragment>
                        <Icon shape="user" />
                        <Dropdown label={"User Actions"} >
                            <DropdownMenu>
                                <DropdownItem label={"LogOut"} onClick={() => {}} />
                                <DropdownItem label={"Settings"} onClick={() => {}} />
                            </DropdownMenu>
                        </Dropdown>
                    </React.Fragment>}
            >
            </MainContainer>
        </React.Fragment>
    ));
