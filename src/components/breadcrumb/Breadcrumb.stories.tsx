/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

 import React from "react"; 
 import {storiesOf} from "@storybook/react";
 import {Breadcrumbs,BreadcrumbItem} from "./Breadcrumb";
 import {action} from "@storybook/addon-actions";
 
 const breadcrumbItems:Array<BreadcrumbItem> = [
    {title: "Dashboard", path: "#"},
    {title: "Profile", path: "/#/path"},
    {title: "Details", path: "#",isActive:true}
 ];

 const singleBreadcrumbItem:Array<BreadcrumbItem> = [
   {title: "Dashboard", path: "#",isActive:true},
 ];

 storiesOf("Breadcrumb", module)
     .add("Basic", () => 
        <React.Fragment>
        <Breadcrumbs breadcrumbItems={singleBreadcrumbItem} />
        <br />
        <Breadcrumbs breadcrumbItems={breadcrumbItems} onClickHandler={action("breadcrumbItem click")}/>
        <br />
        </React.Fragment>
 );
