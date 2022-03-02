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
import { State, Store } from "@sambego/storybook-state";
import { Modal, ModalSize, ModalBody, ModalFooter } from "@dellstorage/clarity-react/modals/Modal";
import { Button } from "@dellstorage/clarity-react/forms/button";
import FileSelect from "./FileSelect";

const storeSmall = new Store({
    isOpen: false,
    closable: true,
});

storiesOf("FileSelect", module)
    .add("Modal", () => (
        <div>
            <Button onClick={() => storeSmall.set({ isOpen: true })}>Upload YAML</Button>
            <State store={storeSmall}>
                <Modal {...storeSmall} size={ModalSize.LARGE} onClose={() => storeSmall.set({ isOpen: false })} title="Upload template">
                    <ModalBody>
                        <FileSelect accept=".yaml" onFileChange={action("File Changed")}/>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeSmall.set({ isOpen: false })} link>
                            Cancel
                        </Button>
                        <Button onClick={() => storeSmall.set({ isOpen: false })} primary={true}>
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
            </State>
        </div>
    ))
    .add("Default", () => (
        <FileSelect onFileChange={action("File Changed")}/>
    ))
    .add("Multiple", () => (
        <FileSelect onFileChange={action("File Changed")} multiple/>
    ))