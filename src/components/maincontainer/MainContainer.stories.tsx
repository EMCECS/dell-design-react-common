/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import {Icon} from "@dellstorage/clarity-react/icon/Icon";
import {MainContainer} from "@dellstorage/clarity-react/layout/main-container";
import {Dropdown, DropdownMenu, DropdownItem} from "@dellstorage/clarity-react/forms/dropdown";
import { Button } from "@dellstorage/clarity-react/forms/button";
import { Badge } from "@dellstorage/clarity-react/emphasis/badges";

import "styles/components/MainContainer.scss";
import { Nav, NavLevel, NavType } from "@dellstorage/clarity-react/layout/nav";


storiesOf("MainContainer", module)

    .add("Main Container", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}>Main container</h4>
            <MainContainer title="Basic Main container" />
        </React.Fragment>
    ))
    .add("Main Container with actions", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}> Main container with button icon actions</h4>
            <MainContainer
                title={"Main Container With Actions"}
                actions={
                    <React.Fragment>
                        <Button onClick={action("delete click")} icon={{shape: "home"}}/>
                        <Button onClick={action("delete click")} icon={{shape: "settings"}}/>
                        <Button onClick={action("delete click")} icon={{shape: "alert"}}/>
                    </React.Fragment>
                }
            >
            </MainContainer>
        </React.Fragment>
    ))
    .add("Main container with dropdown actions", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}> Main container with dropdown</h4>
            <MainContainer
                title={"Main Container With Dropdown"}
                actions={
                    <div>
                        <Icon shape="user" />
                        <Dropdown label={"User Actions"} >
                            <DropdownMenu>
                                <DropdownItem label={"Logout"} onClick={() => {}} />
                                <DropdownItem label={"Settings"} onClick={() => {}} />
                            </DropdownMenu>
                        </Dropdown>
                    </div>}
            >
            </MainContainer>
        </React.Fragment>
    ))
    .add("MainContainer with support for badges", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}> Main container with support for badges</h4>
            <MainContainer
                title={"Main Container With Icon Badges"}
                actions={
                    <div>
                        <Button onClick={action("home click")} icon={{shape: "home"}}/>
                        <Button onClick={action("alert click")} icon={{shape: "alert"}}>
                        <Badge> {8}</Badge>
                        </Button>
                        <Button onClick={action("bell click")} icon={{shape: "bell"}}>
                        <Badge> {12}</Badge>
                        </Button>
                        
                    </div>}
            >
            </MainContainer>
        </React.Fragment>
    ))
    .add("Main container with navigation", () => (
        <React.Fragment>
            <h4 style={{"marginBottom":"20px"}}> Main container with top navigation</h4>
            <MainContainer
                title={"Main Container With Top Navigation"}
                actions={
                    <div>
                        <Icon shape="user" />
                        <Dropdown label={"User Actions"} >
                            <DropdownMenu>
                                <DropdownItem label={"Logout"} onClick={() => {}} />
                                <DropdownItem label={"Settings"} onClick={() => {}} />
                            </DropdownMenu>
                        </Dropdown>
                    </div>}
                subNav={
                    <Nav navLevel={NavLevel.SECONDARY} navType={NavType.HEADER}>
                    <span className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"dashboard"} className="nav-icon" />
                        <span className="nav-text">{"Dashboard"}</span>
                    </span>
                    <span className="nav-link nav-icon-text submenu-navlink active">
                        <Icon shape={"storage"} className="nav-icon" />
                        <span className="nav-text">{"Object Stores"}</span> 
                    </span>
                    <span className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={""} className="" />
                        <span className="nav-text">{"ObjectScale Systems"}</span>
                    </span>
                    <span className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"file-settings"} className="nav-icon" />
                        <span className="nav-text">{"Settings"}</span>
                    </span>
                    <span className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"form"} className="nav-icon" />
                        <span className="nav-text">{"Summary"}</span>
                    </span>
                 </Nav>
                }
            >
            </MainContainer>
        </React.Fragment>
    ));

