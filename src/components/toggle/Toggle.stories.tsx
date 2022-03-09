/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { storiesOf } from "@storybook/react";
import {Toggle} from "@dellstorage/clarity-react/forms/toggle/Toggle";

import "styles/components/Toggle.scss";
 
 storiesOf("Toggle", module)
     .add("Basic toggle switch button", () => (
         <div>
             <Toggle />
         </div>
     ))
     .add("Labels", () => (
         <div>
             <Toggle label="Option 1" />
             <Toggle label="Option 2" />
         </div>
     ))
     .add("Disabled toggle switches", () => (
         <div>
            <Toggle label="option 1" disabled={true} checked={true}/>
            <Toggle label="option 2" disabled={true} checked={false}/>
         </div>
     ));

