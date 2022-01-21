/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/components/TextArea.scss";
import "styles/components/Label.scss";

import {storiesOf} from "@storybook/react";
import {TextArea} from "@dellstorage/clarity-react/forms/textarea";

storiesOf("TextArea", module)
    .add("TextArea Without Label", () => (
        <div>
            <TextArea 
            name="Textarea"
            placeholder="This is a placeholder"
            />
        </div>
    )).add("TextArea with label", () => (
        <div>
            <TextArea 
            name="Textarea"
            label="This is a label"
            />
        </div>
    )).add("TextArea with Helper Text", () => (
        <div>
            <TextArea 
            name="Textarea"
            label="This is a label"
            helperText="This is a helper text"
            />
        </div>
    )).add("TextArea with Error", () => (
        <div>
            <TextArea 
            name="Textarea"
            label="This is a label"
            errorHelperText="This is a error helper text"
            error={true}
            />
        </div>
    )).add("TextArea with custom rows and columns", () => (
        <div>
            <TextArea 
            name="Textarea"
            label="25 rows and 20 cols"
            rows={25}
            cols={20}
            />
        </div>
    )).add("TextArea Disabled", () => (
        <div>
            <TextArea 
            name="Textarea"
            label="This is a label"
            disabled
            />
        </div>
    ));
