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
import {DataList, DataListOption} from "@dellstorage/clarity-react/forms/datalist/DataList"
import "styles/components/DataList.scss";
import {action} from "@storybook/addon-actions";

//Default datalist options
const renderDefaultDatalistOptions = () => (
    <>
        <DataListOption value="Item1" />
        <DataListOption value="Item2" />
        <DataListOption value="Item3" />
    </>
)

storiesOf("DataList", module)
    .add("Basic DataList", () => (
        <div>
            <DataList>
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("With place holder text", () => (
        <div>
            <DataList placeHolder="No label">
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("With Error", () => (
        <div>
            <DataList
                placeHolder="No label"
                required={true}
                isError={true}
                errorText="This field is reuired"
                errorTitle="This field is required"
            >
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("With helper text", () => (
        <div>
            <DataList placeHolder="No label" helperText="Select any option or create one">
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("With custom width and label", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                style={{width: "50%"}}
            >
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("With defaultSelected Value", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                defaultValue="Item1"
            >
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("DataList with Debounce true", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                onChange={action("changed: after 5 secs")}
                debounce={true}
                debounceTime={1000}
            >
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ))
    .add("DataList with Debounce OFF by default", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                onChange={action("changed: Immediately")}
            >
                {renderDefaultDatalistOptions()}
            </DataList>
        </div>
    ));
