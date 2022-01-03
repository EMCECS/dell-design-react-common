/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/Input.scss";
import "styles/Label.scss";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Input} from "@dellstorage/clarity-react/forms/input/Input";

storiesOf("Input", module)
    .add("Input Box", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                placeholder="Input Textbox"
                onChange={action("changed")}
            />
        </div>
    ))
    .add("input box with label", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                placeholder="Input Textbox"
                onChange={action("changed")}
            />
        </div>
    ))
    .add("input box with label and helper text", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                helperText="Input Textbox"
                onChange={action("changed")}
            />
        </div>
    ))
    .add("input box with validation", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                title="Input Textbox"
                onChange={action("changed")}
                error={true}
                errorHelperText="This field is required"
            />
        </div>
    ))
    .add("input box disabled", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                placeholder="Input Textbox"
                onChange={action("changed")}
                disabled={true}
            />
        </div>
    ))
    .add("input box password", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                type="password"
                placeholder="Password"
                onChange={action("changed")}
            />
        </div>
    ))
    .add("input box number", () => (
        <div>
            <Input
                name="somevalue"
                isBoxed
                label="Label 1"
                type="number"
                placeholder="Number"
                onChange={action("changed")}
            />
        </div>
    ));
