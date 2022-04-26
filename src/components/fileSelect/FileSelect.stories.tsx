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
import {action} from "@storybook/addon-actions";
import {FileSelect} from "./FileSelect";
import "styles/components/FileSelect.scss"

storiesOf("FileSelect", module)
    .add("Default", () => (
        <div>
            {"Default File select. Can select one file of any kind."}
            <FileSelect onFileChange={action("File Changed")} placeholder="Select Any File"/>
        </div>
    ))
    .add("Multiple", () => (
        <div>
            {"Mulitple file select, supports any kind of file."}
            <FileSelect onFileChange={action("File Changed")} multiple/>
        </div>
    ))
    .add("Accept specific file types", () => (
        <div>
            {"Accepts only json files"}
            <FileSelect onFileChange={action("File Changed")} accept={[".json"]} placeholder="Select JSON file"/>
            {"Accepts only YAML files"}
            <FileSelect onFileChange={action("File Changed")} accept={[".yaml"]} placeholder="Select YAML file"/>
            {"Accepts only Audio files"}
            <FileSelect onFileChange={action("File Changed")} accept={["audio/*"]} placeholder="Select Audio file"/>
            {"Accepts only Video files"}
            <FileSelect onFileChange={action("File Changed")} accept={["video/*"]} placeholder="Select Video file"/>
            {"Accepts only Image files"}
            <FileSelect onFileChange={action("File Changed")} accept={["image/*"]} placeholder="Select Image file"/>
            {"Accepts Image and Video files"}
            <FileSelect onFileChange={action("File Changed")} accept={["image/*", "video/*"]} placeholder="Select Image or Video file"/>
            {"Accepts YAML and JSON files"}
            <FileSelect onFileChange={action("File Changed")} accept={[".yaml",".json"]} placeholder="Select JSON or YAML file"/>
        </div>
    ))
    .add("Multiple files on specific file type", () => (
        <div>
            {"Accepts multiple json files"}
            <FileSelect onFileChange={action("File Changed")} accept={[".json"]} multiple/>
            {"Accepts multiple YAML files"}
            <FileSelect onFileChange={action("File Changed")} accept={[".yaml"]} multiple/>
            {"Accepts multiple Audio files"}
            <FileSelect onFileChange={action("File Changed")} accept={["audio/*"]} multiple/>
            {"Accepts multiple Video files"}
            <FileSelect onFileChange={action("File Changed")} accept={["video/*"]} multiple/>
            {"Accepts multiple Image files"}
            <FileSelect onFileChange={action("File Changed")} accept={["image/*"]} multiple/>
        </div>
    ))
    .add("Helper text / Error Message", () => (
        <div>
            <div style={{marginBottom: "2rem"}}>
            {"Helper text"}
            <FileSelect onFileChange={action("File Changed")} placeholder="Select Any File" helperText="Upload any files here"/>
            </div>
            <div style={{marginBottom: "2rem"}}>
            {"Error message"}
            <FileSelect onFileChange={action("File Changed")} placeholder="Select Any File" errorHelperText="Something went wrong while uploading file" isError/>
            </div>
        </div>
    ))
