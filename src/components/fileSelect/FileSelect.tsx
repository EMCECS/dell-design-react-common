/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React, { ChangeEvent, useRef, useState } from "react";

import "styles/components/FileSelect.scss"
import { Input } from "@dellstorage/clarity-react/forms/input/Input";
import { Button } from "@dellstorage/clarity-react/forms/button";


/**
 * Props for the File select component
 * @param {onFileChange} is the function triggered when a file is picked or changed.
 * @param {accept} is a prop to get the file types which are to be accepted in the component.
 * @param {multiple} is a prop which allows to select multiple files, if set to true
 */
export type FileSelectProps = {
    onFileChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    accept?: string,
    multiple?: boolean,
}

const FileSelect = (props: FileSelectProps) => {
    const fileSelectRef = useRef<any>(null);

    const [fileName, setFileName] = useState("")

    // Function to trigger the file select action
    const triggerFileSelect = () => {
        fileSelectRef.current.click()
    }

    // Function executed when a file is selected / changed
    const onfileSelect = (evt: ChangeEvent<HTMLInputElement>) => {
        if(evt.target) {
            const files = evt.target.files;
            const fileNames = [];
            if(files && files.length>0) {
                for(const key in files) {
                    // Condition check to ignore the Prototypes in the files object
                    if (files.hasOwnProperty(key)) {
                        fileNames.push(files[key].name)
                    }
                }
                setFileName(fileNames.join(", "))
                props.onFileChange(evt);
            }
        }
    }
    return (
        <React.Fragment>
            <div className="upload-container">
                {/* This component is hiddent to the user. We would be triggering the functionalities from button and the input */}
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
