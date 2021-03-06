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
import "styles/components/ProgressBar.scss";

import {
    ProgressBar,
    ProgressBarStatus,
    ProgressBarType,
    ProgressBarAnimation
} from "@dellstorage/clarity-react/progress_bars/ProgressBars";

storiesOf("ProgressBar", module)
    .add("ProgressBar Simple", () => (
        <div>
            <h4> Progress Bar </h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} style={{width: "50%"}}/>
            </div>
        </div>
    ))
    .add("ProgressBar Labled", () => (
        <div>
            <h4> Labled Progress Bar </h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} labeled={true} style={{width: "50%"}}/>
            </div>
        </div>
    ))
    .add("Indeterminate (Looping) Progress Bar", () => (
        <div>
            <h4>Indeterminate/Looping</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.LOOP} style={{width: "50%"}}/>
            </div>
        </div>
    ))
    .add("Progress Bar with color", () => (
        <div>
            <h4>Normal</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} type={ProgressBarType.NORMAL} style={{width: "50%"}}/>
            </div>

            <h4>Success</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} status={ProgressBarStatus.SUCCESS} style={{width: "50%"}}/>
            </div>
            

            <h4>Danger</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} status={ProgressBarStatus.DANGER} style={{width: "50%"}}/>
            </div>

            <h4>Warning</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} status={ProgressBarStatus.WARNING} style={{width: "50%"}}/>
            </div>
        </div>
    ))
    .add("Progress Bar with animation", () => (
        <div>
            <h4>Fed out</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.FADE_OUT} style={{width: "50%"}}/>
            </div>
            <br />

            <h4>Flash Then Fade</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={100}
                    max={100}
                    className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                    style={{width: "50%"}}
                />
            </div>
            <br />

            <h4>Flash Red, No Fade</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.FLASH_DANGER} style={{width: "50%"}}/>
            </div>

            <h4>Flash And Fade with label</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={100}
                    max={100}
                    className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                    labeled={true}
                    style={{width: "50%"}}
                />
            </div>
        </div>
    ))
    .add("Static Progress Bar", () => (
        <div>
            <h4>Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} type={ProgressBarType.STATIC} style={{width: "50%"}}/>
            </div>
            <br />

            <h4>Labeled, Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={50} max={100} type={ProgressBarType.STATIC} labeled={true} style={{width: "50%"}}/>
            </div>
            <br />

            <h4>Red Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={80}
                    max={100}
                    type={ProgressBarType.STATIC}
                    status={ProgressBarStatus.DANGER}
                    style={{width: "50%"}}
                />
            </div>
        </div>
    ));
