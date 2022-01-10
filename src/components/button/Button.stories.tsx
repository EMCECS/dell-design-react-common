/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import { Button, ButtonState } from "@dellstorage/clarity-react/forms/button";
import "styles/components/Button.scss";

storiesOf("Button", module)
    .add("Button Types", () => (
             <div>
                {"Button Types:"}
                <br />
                <Button key="primary" primary onClick={action("Primary click")}>
                    {"Primary"}
                </Button>
                <Button key="basic" onClick={action("Secondary click")}>
                    {"Secondary"}
                </Button>
                <Button key="tertiary" link onClick={action("Tertiary click")}>
                    {"Tertiary"}
                </Button>
            </div>))
    .add("Button Sizes", () => (
        <div>
          <Button key="primary" primary className="small-button-size" onClick={action("Small button click")}>
            {"Small"}
        </Button>
        <Button key="primary" primary className="medium-button-size" onClick={action("Medium button click")}>
            {"Medium"}
        </Button>
        <Button key="primary" primary className="normal-button-size" onClick={action("Normal button click")}>
            {"Normal"}
        </Button>
        <Button key="primary" primary className="fluid-button-size" onClick={action("Fluid button click")}>
            {"Fluid"}
        </Button>
        <Button key="primary" primary className="minimum-button-size" onClick={action("Minimum button click")}>
            {"ok"}
        </Button>
        </div>
    ))
    .add("Button Status", () => (
        <div> 
            <Button key="basic-warning" className="warning-button" state={ButtonState.WARNING} onClick={action("basic-warning click")}>
                {"Warning"}
            </Button>
            <Button key="basic-success" state={ButtonState.SUCCESS} onClick={action("basic-success click")}>
                {"Success"}
            </Button>
            <Button key="basic-danger" state={ButtonState.DANGER} onClick={action("basic-danger click")}>
                {"Danger"}
            </Button>
    </div>
    )).add("Icon Buttons", () => (
        <div>
            <Button key="link" link onClick={action("delete click")} icon={{shape: "trash"}}/>
            <Button key="link" link onClick={action("copy click")} icon={{shape: "copy"}}/>
            <Button key="link" link onClick={action("window-close click")} icon={{shape: "window-close"}}/>
            <Button key="link" link onClick={action("refresh click")} className="icon-button-border" icon={{shape: "refresh"}}/>
            <Button key="link" link onClick={action("settings click")} className="icon-button-background" icon={{shape: "settings"}}/>
        </div>
    ))
    .add("Buttons Disabled", () => (
        <div>
            <Button key="disabled" disabled >
                {"Disabled"}
            </Button>
            <Button key="disabled" primary disabled >
                {"Primary"}
            </Button>
            <Button key="disabled" className="warning-button" disabled >
                {"Warning"}
            </Button>
        </div>
    )); 
