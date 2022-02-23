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
 import {Header, HeaderColor, Nav, NavLevel, NavLink, NavType} from "@dellstorage/clarity-react/layout/nav";
 import "styles/components/Navigation.scss";
 import { Icon } from "@dellstorage/clarity-react/icon";
 
 storiesOf("Header", module)
 
     .add("Header with Subnav", () => (
         <React.Fragment>
             <h4> Header with Subnav</h4>
             <div className="main-container">
                 <Header
                     primaryShown={false}
                     secondaryShown={false}
                     color={HeaderColor.HEADER1}
                     style={{marginTop: "24px"}}
                 >
                     <div className="branding">
                         <NavLink iconShape="vm-bug">
                             <span className="title">Project Clarity</span>
                         </NavLink>
                     </div>
                 </Header>
                 <Nav navLevel={NavLevel.SECONDARY} navType={NavType.HEADER}>
                    <a className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"dashboard"} className="nav-icon" />
                        <span className="nav-text">{"Dashboard"}</span>
                    </a>
                    <a className="nav-link nav-icon-text submenu-navlink active">
                        <Icon shape={"storage"} className="nav-icon" />
                        <span className="nav-text">{"Object Stores"}</span> 
                    </a>
                    <a className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={""} className="" />
                        <span className="nav-text">{"ObjectScale Systems"}</span>
                    </a>
                    <a className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"file-settings"} className="nav-icon" />
                        <span className="nav-text">{"Settings"}</span>
                    </a>
                    <a className="nav-link nav-icon-text submenu-navlink">
                        <Icon shape={"form"} className="nav-icon" />
                        <span className="nav-text">{"Summary"}</span>
                    </a>
                 </Nav>
             </div>
         </React.Fragment>
     ));
 