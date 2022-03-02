/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React, { useRef, useState } from "react";

import "styles/components/FileSelect.scss"
import { Input } from "@dellstorage/clarity-react/forms/input/Input";
import { Button } from "@dellstorage/clarity-react/forms/button";

export type FileSelectProps = {
    onFileChange: (evt: Event) => void,
    accept?: string,
    multiple?: boolean,
}

const FileSelect = (props: FileSelectProps) => {
    const fileSelectRef = useRef<any>(null);

    const [fileName, setFileName] = useState("")

    const triggerFileSelect = () => {
        fileSelectRef.current.click()
    }

    const onfileSelect = (evt:any) => {
        if(evt.target.value) {
            const files = evt.target.files;
            const fileNames = [];
            for(const value of files) {
                fileNames.push(value.name)
            }
            setFileName(fileNames.join(", "))
            props.onFileChange(files);
        }
    }
    return (
        <React.Fragment>
            <div className="upload-container">
                <input
                    type="file"
                    ref={fileSelectRef}
                    className={"file-select"}
                    onChange={onfileSelect}
                    accept={props.accept}
                    multiple={props.multiple}
                />
                <span className="file-select-input" onClick={triggerFileSelect}>
                    <Input
                        name="somevalue"
                        value={fileName}
                        title={fileName}
                    />
                </span>
                <Button primary onClick={triggerFileSelect} className="select-file-button">Select File</Button>
            </div>
        </React.Fragment>
    )
}

export default FileSelect;