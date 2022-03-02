/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { storiesOf } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import FileSelect from "./FileSelect";

storiesOf("FileSelect", module)
    .add("Default", () => (
        <div>
            Default File select. Can select one file of any kind.
            <FileSelect onFileChange={action("File Changed")}/>
        </div>
    ))
    .add("Multiple", () => (
        <div>
            Mulitple file select, supports any kind of file.
            <FileSelect onFileChange={action("File Changed")} multiple/>
        </div>
    ))
    .add("Accept specific file types", () => (
        <div>
            Accepts only json files
            <FileSelect onFileChange={action("File Changed")} accept=".json"/>
            Accepts only YAML files
            <FileSelect onFileChange={action("File Changed")} accept=".yaml"/>
            Accepts only Audio files
            <FileSelect onFileChange={action("File Changed")} accept="audio/*"/>
            Accepts only Video files
            <FileSelect onFileChange={action("File Changed")} accept="video/*"/>
            Accepts only Image files
            <FileSelect onFileChange={action("File Changed")} accept="image/*"/>
        </div>
    ))
    .add("Multiple files on specific file type", () => (
        <div>
            Accepts multiple Image files
            <FileSelect onFileChange={action("File Changed")} accept="image/*" multiple/>
        </div>
    ))
    