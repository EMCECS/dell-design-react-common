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
import {Button, ButtonGroup} from "@dellstorage/clarity-react/forms/button";
import {RadioButton} from "@dellstorage/clarity-react/forms/radio";
import {action} from "@storybook/addon-actions";

storiesOf("ButtonGroup", module)
    .add("ButtonGroup Primary", () => (
        <div>
            <div>
                {"Buttons Enabled: "}
                <ButtonGroup className="btn-primary" name="Operation">
                    <Button>Test 1</Button>
                    <Button>Test 2</Button>
                    <Button>Test 3</Button>
                    <Button>Test 4</Button>
                </ButtonGroup>
            </div>
            <div
                style={{
                    marginTop: "0.5rem",
                }}
            >
                {"Buttons Disabled: "}
                <ButtonGroup className="btn-primary" name="Operation 2">
                    <Button disabled>Test 1</Button>
                    <Button disabled>Test 2</Button>
                    <Button disabled>Test 3</Button>
                    <Button disabled>Test 4</Button>
                </ButtonGroup>
            </div>
        </div>
    ))
    .add("ButtonGroup Secondary", () => (
        <div>
            <div>
                {"Buttons Enabled: "}
                <ButtonGroup name="Operation">
                    <Button>Test 1</Button>
                    <Button>Test 2</Button>
                    <Button>Test 3</Button>
                    <Button>Test 4</Button>
                </ButtonGroup>
            </div>
            <div
                style={{
                    marginTop: "0.5rem",
                }}
            >
                {"Buttons Disabled: "}
                <ButtonGroup name="Operation 2">
                    <Button disabled>Test 1</Button>
                    <Button disabled>Test 2</Button>
                    <Button disabled>Test 3</Button>
                    <Button disabled>Test 4</Button>
                </ButtonGroup>
            </div>
        </div>
    ))
    .add("ButtonGroup Tertiary", () => (
        <div>
            <div>
                {"Buttons Enabled: "}
                <ButtonGroup className="btn-link" name="Operation">
                    <Button>Test 1</Button>
                    <Button>Test 2</Button>
                    <Button>Test 3</Button>
                    <Button>Test 4</Button>
                </ButtonGroup>
            </div>
            <div
                style={{
                    marginTop: "0.5rem",
                }}
            >
                {"Buttons Disabled: "}
                <ButtonGroup className="btn-link" name="Operation 2">
                    <Button disabled>Test 1</Button>
                    <Button disabled>Test 2</Button>
                    <Button disabled>Test 3</Button>
                    <Button disabled>Test 4</Button>
                </ButtonGroup>
            </div>
        </div>
    ))
    .add("ButtonGroup with all different buttons", () => (
        <div>
            <ButtonGroup name="Different Buttons">
                <Button primary>Primary</Button>
                <Button>Secondary</Button>
                <Button link>Tertiary</Button>
            </ButtonGroup>
        </div>
    ))
    .add("Radio ButtonGroup", () => (
        <ButtonGroup defaultValue="apples" name="fruit" onChange={action("Changed")}>
            <RadioButton key="1" value="apples" label="apples" />
            <RadioButton key="2" value="oranges" label="oranges" />
            <RadioButton key="3" value="kiwi" label="kiwi" />
            <RadioButton key="4" value="pears" label="pears" />
        </ButtonGroup>
    ));
