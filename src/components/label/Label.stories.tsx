/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/components/Label.scss";

import {storiesOf} from "@storybook/react";
import {Label} from "@dellstorage/clarity-react/forms/label/Label";

storiesOf("Label", module)
    .add("label", () => (
        <div>
           <Label>Label-1</Label>
        </div>
    ));
