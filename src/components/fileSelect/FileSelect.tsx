/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React, {ChangeEvent} from "react";

import "styles/components/FileSelect.scss";
import {Input} from "@dellstorage/clarity-react/forms/input/Input";
import {Button, ButtonState} from "@dellstorage/clarity-react/forms/button";
import {Icon} from "@dellstorage/clarity-react/icon";
import {Modal, ModalSize, ModalBody, ModalFooter} from "@dellstorage/clarity-react/modals/Modal";

/**
 * Props for the File select component
 * @param {onFileChange} is the function triggered when a file is picked or changed.
 * @param {accept} is a prop to get the file types which are to be accepted in the component.
 * @param {multiple} is a prop which allows to select multiple files, if set to true
 * @param {placeholder} is the prop that holds the placeholder value for the input field
 * @param {helperText} is the prop that holds input field's helper text.
 * @param {isError} is a boolean prop to denote error state of the component.
 * @param {errorHelperText} is the prop that holds the error message, that is displayed in error state of the component.
 */
export type FileSelectProps = {
    onFileChange: (files: object) => void;
    accept?: string[];
    multiple?: boolean;
    placeholder?: string;
    helperText?: string;
    isError?: boolean;
    errorHelperText?: string;
};

/**
 * States for the file select component
 * @param fileName is the state that holds the file names of selected files, in string format.
 * @param files is the state that holds the actual files, that are been selected.
 * @param isEditMode is the state that holds the boolean value to show hide edit modal.
 * @param editedFileName is the state that holds renamed file name temporarily.
 * @param enableButton is the state that holds the index. Rename button with this index would be enabled.
 */

export type FileSelectState = {
    fileName: string;
    files: Array<File>;
    isEditMode: boolean;
    editedFileName: string;
    enableButton: number;
};

const ERROR_ICON_SIZE = 25;
const ENABLE_BUTTON_DEFAULT = -1;
const EDIT_MODAL_TITLE = "Edit Files";

export default class FileSelect extends React.PureComponent<FileSelectProps, FileSelectState> {
    fileSelectRef: React.RefObject<HTMLInputElement>;

    constructor(props: FileSelectProps) {
        super(props);
        this.fileSelectRef = React.createRef();
        this.state= {
            fileName: "",
            files: [],
            isEditMode: false,
            editedFileName: "",
            enableButton: ENABLE_BUTTON_DEFAULT,
        };
    }

    // Function to trigger the file select action
    triggerFileSelect = () => {
        this.fileSelectRef.current && this.fileSelectRef.current.click();
    };

    // Function executed when a file is selected / changed
    onfileSelect = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target) {
            const files = evt.target.files;
            const fileNames = [];
            const fileObjects = [];
            if (files && files.length > 0) {
                for (const key in files) {
                    // Condition check to ignore the Prototypes in the files object
                    if (files.hasOwnProperty(key)) {
                        fileNames.push(files[key].name);
                        fileObjects.push(files[key]);
                    }
                }
                this.setState(
                    {
                        fileName: fileNames.join(","),
                        files: fileObjects,
                    },
                    () => {
                        this.props.onFileChange(this.state.files);
                    },
                );
            }
        }
    };
    // Function which triggers edit modal when the edit icon is clicked
    editFiles = () => {
        this.setState({
            isEditMode: true,
        });
    };

    // Function triggered when file name is changed in any of the file's text box
    onFileNameChange = (evt: ChangeEvent<HTMLInputElement>, index: number) => {
        if (evt.target) {
            const editedValue = evt.target.value;
            const {files} = this.state;
            // When new file name is same as existing file name, disabling the rename button.
            if (editedValue === files[index].name) {
                this.setState({
                    editedFileName: "",
                    enableButton: ENABLE_BUTTON_DEFAULT,
                });
            }
            // Enabling the rename button, when file name is changed and not empty
            if (editedValue !== files[index].name && editedValue !== "") {
                this.setState({
                    editedFileName: editedValue,
                    enableButton: index,
                });
            }
        }
    };

    // Function triggered when rename button is clicked
    onFileRename = (index: number) => {
        const {files, fileName, editedFileName} = this.state;
        const currentFile = files[index];
        // creating a file with newly provided name, since the file object is immutable
        const blob = currentFile.slice(0, currentFile.size, currentFile.type);
        const file = new File([blob], editedFileName, {type: currentFile.type});
        // Replacing the new file with the old file
        files[index] = file;
        // Renaming in the fileName string
        const fileNameArray = fileName.split(",");
        fileNameArray[index] = file.name;
        this.setState(
            {
                files,
                fileName: fileNameArray.join(","),
                editedFileName: "",
                enableButton: ENABLE_BUTTON_DEFAULT,
            },
            () => this.props.onFileChange(this.state.files),
        );
    };

    // Function triggered when remove button is clicked
    onFileRemove = (index: any) => {
        const files = this.state.files.slice();
        const fileName = this.state.fileName.slice().split(",");
        files.splice(index, 1);
        fileName.splice(index, 1);
        this.setState(
            {
                fileName: fileName.join(","),
                files,
            },
            () => {
                // When no file is present after removing, closing the edit modal
                if (this.state.files.length === 0) {
                    this.setState({
                        isEditMode: false,
                    });
                }
                this.props.onFileChange(this.state.files);
            },
        );
    };
    renderEditModal = () => {
        const {isEditMode, files, enableButton} = this.state;
        const {} = this.props;
        return(
        <Modal
            isOpen={isEditMode}
            size={ModalSize.LARGE}
            onClose={() => this.setState({isEditMode: false})}
            title={EDIT_MODAL_TITLE}
        >
            <ModalBody>
                <ul>
                    {this.state.files.map((file: File, index: any) => (
                        <div className="upload-container edit-input" key={file.name}>
                            <span className="file-select-input">
                                <Input
                                    name={file.name}
                                    defaultValue={file.name}
                                    debounce
                                    onChange={(evt) => this.onFileNameChange(evt, index)}
                                />
                            </span>
                            <Button
                                disabled={enableButton !== index}
                                state={ButtonState.WARNING}
                                className="select-file-button"
                                onClick={() => this.onFileRename(index)}
                            >
                                {"Rename"}
                            </Button>
                            <Button
                                state={ButtonState.DANGER}
                                className="select-file-button"
                                onClick={() => this.onFileRemove(index)}
                            >
                                <Icon shape="trash"></Icon>
                            </Button>
                        </div>
                    ))}
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => this.setState({isEditMode: false, enableButton: ENABLE_BUTTON_DEFAULT})}
                    primary={true}
                >
                    {"Done"}
                </Button>
            </ModalFooter>
        </Modal>
    )};

    render(): React.ReactNode {
        const {fileName} = this.state;
        const {accept, multiple, placeholder, helperText, errorHelperText, isError} = this.props;
        return (
            <React.Fragment>
                <div className="upload-container">
                    {/* This component is hidden from the user. We would be triggering the functionalities from button and the input */}
                    <input
                        type="file"
                        ref={this.fileSelectRef}
                        className={"file-select"}
                        onChange={this.onfileSelect}
                        accept={accept?.join()}
                        multiple={multiple}
                    />
                    <span className="file-select-input">
                        <Input
                            name="fileInput"
                            value={fileName}
                            title={fileName}
                            placeholder={placeholder}
                            helperText={helperText}
                            errorHelperText={errorHelperText}
                            error={isError}
                        />
                        {/* File edit icon */}
                        {this.state.files.length > 0 ? (
                            <span className="edit-icon" onClick={this.editFiles}>
                                <Icon shape="note" size={ERROR_ICON_SIZE} />
                            </span>
                        ) : null}
                    </span>
                    <Button primary onClick={this.triggerFileSelect} className="select-file-button">
                        {"Select File"}
                    </Button>
                    {/* File error Icon */}
                    {this.props.isError ? (
                        <Icon shape="exclamation-circle" size={ERROR_ICON_SIZE} className="error-icon"></Icon>
                    ) : null}
                    {/* Edit Modal */}
                    {this.renderEditModal()}
                </div>
            </React.Fragment>
        );
    }
}
