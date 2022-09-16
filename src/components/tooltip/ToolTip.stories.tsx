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

const containerStyles = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "80vh",
    width: "75vw",
};

storiesOf("ToolTip", module)
    .add("Tooltip Sizes", () => (
        <div style={containerStyles}>
            <div>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} isSolidIcon>
                    Content size: 16px
                </ToolTip>
                Extra Small
            </div>
            <div>
                <ToolTip size={ToolTipSize.SMALL} isSolidIcon iconSize={20}>
                    Content size: 20px
                </ToolTip>
                Small
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon iconSize={24}>
                    Content size: 24px
                </ToolTip>
                Medium
            </div>
            <div>
                <ToolTip size={ToolTipSize.LARGE} isSolidIcon iconSize={30}>
                    Content size: 30px
                </ToolTip>
                Large
            </div>
        </div>
    ))
    .add("Tooltip Directions", () => (
        <div style={containerStyles}>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon>
                    Top
                </ToolTip>
                Top
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM}>
                    Bottom
                </ToolTip>
                Bottom
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.TOP_RIGHT}>
                    Top Right
                </ToolTip>
                Top Right
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM_RIGHT}>
                    Bottom Right
                </ToolTip>
                Bottom Right
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.RIGHT}>
                    Right
                </ToolTip>
                Right
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.TOP_LEFT}>
                    Top Left
                </ToolTip>
                Top Left
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.BOTTOM_LEFT}>
                    Bottom Left
                </ToolTip>
                Bottom Left
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon direction={ToolTipDirection.LEFT}>
                    Left
                </ToolTip>
                Left
            </div>
        </div>
    ))
    .add("Tooltip Customization", () => (
        <div style={containerStyles}>
            <div>
                <ToolTip>Content size: 20px</ToolTip>
                Default ToolTip
            </div>
            <div>
                <ToolTip isSolidIcon>Content size: 20px</ToolTip>
                Solid ToolTip
            </div>
            <div>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} isSolidIcon>
                    Content size: 16px
                </ToolTip>
                Extra Small ToolTip
            </div>
            <div>
                <ToolTip size={ToolTipSize.SMALL} isSolidIcon iconSize={20}>
                    Content size: 20px
                </ToolTip>
                Small ToolTip
            </div>
            <div>
                <ToolTip size={ToolTipSize.MEDIUM} isSolidIcon iconSize={24} shape="check-circle">
                    Content size: 24px
                </ToolTip>
                Medium ToolTip
            </div>
            <div>
                <ToolTip size={ToolTipSize.LARGE} iconSize={30} shape="exclamation-triangle" style={{color: "orange"}}>
                    Content size: 30px
                </ToolTip>
                Large ToolTip
            </div>
        </div>
    ));
