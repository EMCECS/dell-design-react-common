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
 import {Badge, BadgeColor, BadgeStatus} from "@dellstorage/clarity-react/emphasis/badges";
 import "styles/components/Badge.scss";
 
 storiesOf("Badges", module)
    .add("Status Badges", () => (
        <div>
            <Badge status={BadgeStatus.BADGE_INFO}>Info Badge</Badge>
            <Badge status={BadgeStatus.BADGE_SUCCESS}>Success Badge</Badge>
            <Badge status={BadgeStatus.BADGE_WARNING}>Warning Badge</Badge>
            <Badge status={BadgeStatus.BADGE_DANGER}>Danger Badge</Badge>
        </div>
    ))
    .add("Color Badges", () => (
        <div>
            <Badge>Default Badge</Badge>
            <Badge color={BadgeColor.PURPLE}>Purple Badge</Badge>
            <Badge color={BadgeColor.BLUE}>Blue Badge</Badge>
            <Badge color={BadgeColor.ORANGE}>Orange Badge</Badge>
            <Badge color={BadgeColor.LIGHT_BLUE}>Light Blue Badge</Badge>
            <Badge color={BadgeColor.BADGE_1}>Badge-1 Color</Badge>
            <Badge color={BadgeColor.BADGE_2}>Badge-2 Color</Badge>
            <Badge color={BadgeColor.BADGE_3}>Badge-3 Color</Badge>
            <Badge color={BadgeColor.BADGE_4}>Badge-4 Color</Badge>
            <Badge color={BadgeColor.BADGE_5}>Badge-5 Color</Badge>
        </div>
    ))
    .add("Nested Badge", () => (
        <div>
            <Badge>Nested Badge<Badge >3</Badge></Badge>
        </div>
    ))
    .add("Max length Badge", () => (
        <div>
            <Badge>Max length is 36 characters for a badge</Badge>
        </div>
    ));
