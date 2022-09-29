/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import "styles/components/SignPost.scss";

import {storiesOf} from "@storybook/react";
import {SignPost, SignPostDirection} from "@dellstorage/clarity-react/forms/signpost/SignPost";
import {Icon} from "@dellstorage/clarity-react/icon/Icon";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";

storiesOf("Signposts", module)
    .add("Top left position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_LEFT} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                    <CheckBox 
                        label="Checked Checkbox" 
                        checked
                    />
                    <CheckBox 
                        label="Unchecked Checkbox" 
                        checked={false}
                    />
                </SignPost>
            </div>
        </div>
    ))
    .add("Top middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_MIDDLE} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Top right position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_RIGHT} signpostHeading={"Signpost Heading"} openAt={<Icon shape="help-info" size={34} />}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Right top position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_TOP} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Right middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_MIDDLE} signpostHeading={"Signpost Heading"} openAt={<Icon shape="inbox" size={40} />}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Right bottom position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_BOTTOM} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom right position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_RIGHT} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_MIDDLE} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom left position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_LEFT} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Left top position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_TOP} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Left middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_MIDDLE} signpostHeading={"Signpost Heading"}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("Left bottom position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_BOTTOM} showCloseButton={false}>
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ))
    .add("SingPost with custom link Button", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_MIDDLE} signpostHeading={"Signpost Heading"} openAt={<span> Open SignPost </span>}>
                    sample data here...
                </SignPost>
            </div>
        </div>
    ))
    .add("SingPost with custom SignPost", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost
                    direction={SignPostDirection.RIGHT_MIDDLE}
                    openAt={<span>Hello</span>}
                    customSignPostTrigger
                    signpostHeading={"Signpost Heading"}
                >
                    sample data here ...
                </SignPost>
            </div>
        </div>
    ));
