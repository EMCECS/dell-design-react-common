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
 import React from "react";
 import {Breadcrumbs } from "./Breadcrumb.component";
import {breadcrumbItems1, breadcrumbItems} from './Breadcrumb.utils'
 

 storiesOf("Breadcrumb", module)
     .add("Basic", () => 
        <React.Fragment>
        <Breadcrumbs breadcrumbItems={breadcrumbItems1}/>
        <br />
        <Breadcrumbs breadcrumbItems={breadcrumbItems}/>
        <br />
        </React.Fragment>
 );
 