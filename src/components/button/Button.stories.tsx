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
import {action} from "@storybook/addon-actions";
import { Button, ButtonState } from "@dellstorage/clarity-react/forms/button";
import "styles/components/Button.scss";

storiesOf("Button", module)
    .add("Button Types", () => (
             <div>
                {"Button Types:"}
                <br />
                <Button primary onClick={action("Primary click")}>
                    {"Primary"}
                </Button>
                <Button onClick={action("Secondary click")}>
                    {"Secondary"}
                </Button>
                <Button link onClick={action("Tertiary click")}>
                    {"Tertiary"}
                </Button>
            </div>))
    .add("Button Sizes", () => (
        <div>
          <Button primary className="small-button-size" onClick={action("Small button click")}>
            {"Small"}
        </Button>
        <Button primary className="medium-button-size" onClick={action("Medium button click")}>
            {"Medium"}
        </Button>
        <Button primary className="normal-button-size" onClick={action("Normal button click")}>
            {"Normal"}
        </Button>
        <Button primary className="fluid-button-size" onClick={action("Fluid button click")}>
            {"Fluid"}
        </Button>
        <Button primary className="minimum-button-size" onClick={action("Minimum button click")}>
            {"ok"}
        </Button>
        </div>
    ))
    .add("Button Status", () => (
        <div> 
            <Button className="warning-button" state={ButtonState.WARNING} onClick={action("basic-warning click")}>
                {"Warning"}
            </Button>
            <Button state={ButtonState.SUCCESS} onClick={action("basic-success click")}>
                {"Success"}
            </Button>
            <Button state={ButtonState.DANGER} onClick={action("basic-danger click")}>
                {"Danger"}
            </Button>
    </div>
    )).add("Icon Buttons", () => (
        <div>
            <Button onClick={action("delete click")} icon={{shape: "trash"}}/>
            <Button onClick={action("copy click")} icon={{shape: "copy"}}/>
            <Button link onClick={action("window-close click")} icon={{shape: "window-close"}}/>
            <Button onClick={action("refresh click")} icon={{shape: "refresh"}}/>
            <Button primary onClick={action("settings click")} icon={{shape: "settings"}}/>
            <Button onClick={action("refresh click")} icon={{shape: "refresh"}}>
                Secondary
            </Button>
            <Button primary onClick={action("settings click")} icon={{shape: "settings"}}>
                Primary
            </Button>
        </div>
    ))
    .add("Buttons Disabled", () => (
        <div>
            <Button disabled >
                {"Disabled"}
            </Button>
            <Button primary disabled >
                {"Primary"}
            </Button>
            <Button state={ButtonState.WARNING} disabled >
                {"Warning"}
            </Button>
        </div>
    )); 
