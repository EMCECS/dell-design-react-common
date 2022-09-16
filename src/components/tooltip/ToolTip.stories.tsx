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
import {ToolTip, ToolTipDirection, ToolTipSize} from "@dellstorage/clarity-react/forms/tooltip/ToolTip";
import "styles/components/ToolTip.scss";

storiesOf("ToolTip", module)
    .add("Tooltip sizes", () => (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "80vh",
                width: "75vw",
            }}
        >
            <div>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} isSolidIcon>
                    Content size: 16px
                </ToolTip>
                Extra Small
            </div>
            <div style={{marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.SMALL} isSolidIcon iconSize={20}>
                    Content size: 20px
                </ToolTip>
                Small
            </div>
            <div style={{marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon iconSize={24}>
                    Content size: 24px
                </ToolTip>
                Medium
            </div>
            <div style={{marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.LARGE} isSolidIcon iconSize={30}>
                    Content size: 30px
                </ToolTip>
                Large
            </div>
        </div>
    ))
    .add("Tooltip directions", () => (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "80vh",
                width: "75vw",
            }}
        >
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon>
                    Top
                </ToolTip>
                Top
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM}>
                    Bottom
                </ToolTip>
                Bottom
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.TOP_RIGHT}>
                    Top Right
                </ToolTip>
                Top Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM_RIGHT}>
                    Bottom Right
                </ToolTip>
                Bottom Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.RIGHT}>
                    Right
                </ToolTip>
                Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.TOP_LEFT}>
                    Top Left
                </ToolTip>
                Top Left
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM_LEFT}>
                    Bottom Left
                </ToolTip>
                Bottom Left
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.LEFT}>
                    Left
                </ToolTip>
                Left
            </div>
        </div>
    ))
    .add("Tooltip customization", () => (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "80vh",
                width: "75vw",
            }}
        >
            <div>
                <ToolTip>Content size: 20px</ToolTip>
                Default ToolTip
            </div>
            <div>
                <ToolTip isSolidIcon>Content size: 20px</ToolTip>
                Solid ToolTip
            </div>
            <div style={{float: "left"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} isSolidIcon>
                    Lorem
                </ToolTip>
                Extra Small
            </div>
            <div style={{}}>
                <ToolTip size={ToolTipSize.SMALL} isSolidIcon iconSize={20}>
                    Lorem ipsum sit
                </ToolTip>
                Small
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon iconSize={24} shape="check-circle">
                    Loren ipsum dolor sit amet, ipsum
                </ToolTip>
                Medium
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.LARGE} iconSize={30} shape="exclamation-triangle" style={{color: "orange"}}>
                    Loren ipsum dolor sit amet, consectetur adipisicing elit
                </ToolTip>
                Large
            </div>
        </div>
    ));
