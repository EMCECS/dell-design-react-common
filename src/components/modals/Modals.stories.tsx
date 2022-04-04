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
import {State, Store} from "@sambego/storybook-state";
import {Modal, ModalSize, ModalBody, ModalFooter, ModalType} from "@dellstorage/clarity-react/modals/Modal";
import {Button, ButtonState} from "@dellstorage/clarity-react/forms/button";
import {Icon} from "@dellstorage/clarity-react/icon";
import "styles/components/Modals.scss";

const storeSmall = new Store({
    isOpen: false,
    closable: true,
});

const storeMedium = new Store({
    isOpen: false,
    closable: true,
});

const storeLarge = new Store({
    isOpen: false,
    closable: true,
});

const storeExtraLarge = new Store({
    isOpen: false,
    closable: true,
});

const storeCustom = new Store({
    isOpen: false,
    closable: true,
});

const storeTypeDanger = new Store({
    isOpen: false,
    closable: true,
});

const storeTypeWarn = new Store({
    isOpen: false,
    closable: true,
});

const storeTypeInfo = new Store({
    isOpen: false,
    closable: true,
});

const storeTypeShowIcon = new Store({
    isOpen: false,
    closable: true,
});

const storeTypeCustomIcon = new Store({
    isOpen: false,
    closable: true,
});

storiesOf("Modals", module).add("Modal Sizes", () => (
    <div className="clr-row">
        <div className="clr-col-12">
            <State store={storeSmall}>
                <Modal size={ModalSize.SMALL} onClose={() => storeSmall.set({isOpen: false})} title="Small modal">
                    <ModalBody>
                        <p>"I'm a small modal"</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeSmall.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeSmall.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeSmall.set({isOpen: true})}>small</Button>
            </State>
            <State store={storeMedium}>
                <Modal onClose={() => storeMedium.set({isOpen: false})} title="Medium modal">
                    <ModalBody>
                        <p>I'm a medium modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeMedium.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeMedium.set({isOpen: false})} primary={true}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeMedium.set({isOpen: !storeMedium.get("isOpen")})}>medium</Button>
            </State>
            <State store={storeLarge}>
                <Modal size={ModalSize.LARGE} onClose={() => storeLarge.set({isOpen: false})} title="Large modal">
                    <ModalBody>
                        <p>I'm a large modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeLarge.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeLarge.set({isOpen: false})} primary={true}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeLarge.set({isOpen: !storeLarge.get("isOpen")})}>large</Button>
            </State>
            <State store={storeExtraLarge}>
                <Modal
                    size={ModalSize.XLARGE}
                    onClose={() => storeExtraLarge.set({isOpen: false})}
                    title="Extra large modal"
                >
                    <ModalBody>
                        <p>I'm an extra large modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeExtraLarge.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeExtraLarge.set({isOpen: false})} primary={true}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeExtraLarge.set({isOpen: !storeExtraLarge.get("isOpen")})}>x-large</Button>
            </State>
            <State store={storeCustom}>
                <Modal
                    size={ModalSize.CUSTOM}
                    onClose={() => storeCustom.set({isOpen: false})}
                    title="Custom modal"
                    width={500}
                    height={300}
                    className="custom-class"
                >
                    <ModalBody>
                        <p>I'm a Custom sized modal with 500 X 300</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeCustom.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeCustom.set({isOpen: false})} primary={true}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeCustom.set({isOpen: !storeCustom.get("isOpen")})}>Custom</Button>
            </State>
        </div>
    </div>
))
.add("Modal Types", ()=> (
    <div className="clr-row">
        <div className="clr-col-12">
            <State store={storeTypeDanger}>
                <Modal onClose={() => storeTypeDanger.set({isOpen: false})} title="Medium modal" type={ModalType.DANGER} showIcon={true}>
                    <ModalBody>
                        <p>Danger Modal Title</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeTypeDanger.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeTypeDanger.set({isOpen: false})} state={ButtonState.DANGER}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeTypeDanger.set({isOpen: !storeTypeDanger.get("isOpen")})}>DANGER</Button>
            </State>
            <State store={storeTypeWarn}>
                <Modal onClose={() => storeTypeWarn.set({isOpen: false})} title="Medium modal" type={ModalType.INFO} showIcon={true}>
                    <ModalBody>
                        <p>Info Modal Title</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeTypeWarn.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeTypeWarn.set({isOpen: false})} primary={true} state={ButtonState.INFO}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeTypeWarn.set({isOpen: !storeTypeWarn.get("isOpen")})}>INFO</Button>
            </State>
            <State store={storeTypeInfo}>
                <Modal onClose={() => storeTypeInfo.set({isOpen: false})} title="Medium modal" type={ModalType.WARNING} showIcon={true}>
                    <ModalBody>
                        <p>Info Modal Title</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeTypeInfo.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeTypeInfo.set({isOpen: false})} primary={true} state={ButtonState.WARNING}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeTypeInfo.set({isOpen: !storeTypeInfo.get("isOpen")})}>WARNING</Button>
            </State>
            <State store={storeTypeShowIcon}>
                <Modal onClose={() => storeTypeShowIcon.set({isOpen: false})} title="Medium modal" type={ModalType.WARNING} showIcon={false}>
                    <ModalBody>
                        <p>Info Modal Title</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeTypeShowIcon.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeTypeShowIcon.set({isOpen: false})} primary={true} state={ButtonState.WARNING}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeTypeShowIcon.set({isOpen: !storeTypeShowIcon.get("isOpen")})}>NO ICON</Button>
            </State>
            <State store={storeTypeCustomIcon}>
                <Modal onClose={() => storeTypeCustomIcon.set({isOpen: false})} title="Medium modal" type={ModalType.WARNING} showIcon={true} customIcon={<Icon shape="eye"/>}>
                    <ModalBody>
                        <p>Info Modal Title</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeTypeCustomIcon.set({isOpen: false})} link>
                            CANCEL
                        </Button>
                        <Button onClick={() => storeTypeCustomIcon.set({isOpen: false})} primary={true} state={ButtonState.WARNING}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeTypeCustomIcon.set({isOpen: !storeTypeCustomIcon.get("isOpen")})}>CUSTOM ICON</Button>
            </State>
        </div>
    </div>
));
