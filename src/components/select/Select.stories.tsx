/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/components/Select.scss";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Select, SelectOption, SelectOptionGroup} from "@dellstorage/clarity-react/forms/select";

const divClassname = "clr-row clr-justify-content-start field-comp-margin";
const renderDefaultSelectOptions = () => (
    <>
        <SelectOption value="1">One</SelectOption>
        <SelectOption value="2">Two</SelectOption>
        <SelectOption value="3">Three</SelectOption>
    </>
);

storiesOf("Select", module)
    .add("Basic select", () => (
        <div>
            <Select onChange={action("basic change")}>{renderDefaultSelectOptions()}</Select>
        </div>
    ))
    .add("Basic select with select option", () => (
        <div>
            <Select onChange={action("basic change")}>
                <SelectOption value="select">select</SelectOption>
                {renderDefaultSelectOptions()}
            </Select>
        </div>
    ))
    .add("Select with custom width", () => (
        <div>
            <Select onChange={action("basic change")} width="30%" label="Basic Select">
                {renderDefaultSelectOptions()}
            </Select>

            <br />
        </div>
    ))
    .add("Select with Labels", () => (
        <div>
            <Select onChange={action("label select - change")} label="I've got some options">
                {renderDefaultSelectOptions()}
            </Select>
        </div>
    ))
    .add("Full select display", () => (
        <div>
            <Select
                onChange={action("full select - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
                defaultValue={"2"}
            >
                {renderDefaultSelectOptions()}
            </Select>
        </div>
    ))
    .add("Select with error", () => (
        <div>
            <Select
                error={true}
                errorTitle={"This field is required"}
                width="30%"
                onBlur={action("select with error and custom width - blur")}
                onChange={action("select with error - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
            >
                {renderDefaultSelectOptions()}
            </Select>

            <Select
                error={true}
                onBlur={action("select with error - blur")}
                onChange={action("select with error - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
            >
                {renderDefaultSelectOptions()}
            </Select>
        </div>
    ))
    .add("Disabled select", () => (
        <div>
            <Select onChange={action("Disabled select - change")} disabled={true} label="I've got some options">
                {renderDefaultSelectOptions()}
            </Select>
        </div>
    ))
    .add("Select Option Group", () => (
        <div>
            <Select onChange={action("Option group select - change")}>
                <SelectOptionGroup label="Group 1">{renderDefaultSelectOptions()}</SelectOptionGroup>
                <SelectOptionGroup label="Group 2">
                    <SelectOption value="7">Seven</SelectOption>
                    <SelectOption value="8">Eight</SelectOption>
                    <SelectOption value="9">Nine</SelectOption>
                </SelectOptionGroup>
            </Select>
        </div>
    ))
    .add("Select Option Group Disabled", () => (
        <div>
            <Select onChange={action("Option Group select Disabled - change")}>
                <SelectOptionGroup label="Group 1" disabled>
                    {renderDefaultSelectOptions()}
                </SelectOptionGroup>
                <SelectOptionGroup label="Group 2">
                    <SelectOption value="7">Seven</SelectOption>
                    <SelectOption value="8">Eight</SelectOption>
                    <SelectOption value="9">Nine</SelectOption>
                </SelectOptionGroup>
            </Select>
        </div>
    ))
    .add("Form field - select box with label", () => (
        <div className={divClassname}>
            <span className="clr-col-2 clr-align-self-center" style={{marginTop: "1.5rem"}}>
                {"Label"}
            </span>
            <div className="clr-col clr-align-self-center">
                <Select onChange={action("basic change")}>{renderDefaultSelectOptions()}</Select>
            </div>
        </div>
    ));
