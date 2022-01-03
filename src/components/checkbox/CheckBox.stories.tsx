/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/CheckBox.scss";
import {storiesOf} from "@storybook/react";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";

storiesOf("Checkbox", module)
    .add("Checkbox", () => (
        <div>
            <CheckBox 
                label="Checkbox" 
            />
            <CheckBox 
                label="Checked Checkbox" 
                checked
            />
            <CheckBox 
                label="Unchecked Checkbox" 
                checked={false}
            />
        </div>
    ))
    .add("Disabled Checkbox", () => (
        <div>
            <CheckBox 
                label="Checked Disabled Checkbox" 
                disabled 
                checked 
            />
            <CheckBox 
                label="Unchecked Disabled Checkbox" 
                disabled 
            />
        </div>
    ));
