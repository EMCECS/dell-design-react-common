/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import "styles/components/DoughnutChart.scss"

/**
 * Props for the doughnut chart
 * @param {size} is to get the width or height of the chart (Width and height would be equal in case of this chart). Defaults to 200px.
 * @param {percentage} is to get the percentage of the chart
 * @param {status} is to get the status color for the chart (Success, Warning and Danger). Defaults to "Success".
 * @param {label} is to get the Label to be displayed in the chart.
 * @param {showPercentage} is a boolean value for displaying percentage in label. Defaults to true.
 * @param {trackWidth} is to get the width of the chart's track. Defaults to 15px.
 * @param {labelLength} is an optional prop to get the truncation length of the label provided. Defaults to 15.
 */

export type CircularProgressType = {
    size?: number;
    percentage: number;
    status?: CHART_STATUS;
    label: string;
    showPercentage?: boolean;
    trackWidth?: number;
    labelLength?: number;
}

export enum CHART_STATUS {
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}

export enum PROGRESS_CLASS {
    SUCCESS = "progress-sucess",
    WARNING = "progress-warning",
    DANGER = "progress-danger",
}

export enum DEFAULT_CHART_VALUES {
    SIZE = 200,
    TRACK_WIDTH = 15,
    PROGRESS = 25,
    LABEL_LENGTH = 15,
    MIN_SIZE = 100,
    MAX_SIZE = 250,
}

// This offset will move the text with the specified pixels vertically downwards, preventing the overlap of percentage and label text.
const LABEL_OFFSET = 35;

const SHOW_PERCENTAGE = true;

// This function takes the size and track width of the chart and will calculate center, radius, circumference
const calculateDimensions = (size: number, trackWidth: number) => {
    const center = size / 2;
    const radius = size / 2 - trackWidth / 2;
    const circumference = 2 * Math.PI * radius;
    return {
        center,
        radius,
        circumference,
    }
}

// Function to get the label position. If we are showing the percentage, the label text needs to be moved vertically downwards inorder to avoid overlapping.
const getLabelYPosition = (center: number, showPercentage: boolean) => {
    if (showPercentage) {
        return -center + LABEL_OFFSET;
    } else {
        return -center;
    }
}

// Component function
const DoughnutChart = (props: CircularProgressType) => {
    const {
        size = DEFAULT_CHART_VALUES.SIZE,
        percentage,
        status,
        label,
        showPercentage = SHOW_PERCENTAGE,
        trackWidth = DEFAULT_CHART_VALUES.TRACK_WIDTH,
        labelLength = DEFAULT_CHART_VALUES.LABEL_LENGTH,
    } = props;
    const dimensions = calculateDimensions(size, trackWidth);
    const [progressClass, setProgressClass] = useState<string>(PROGRESS_CLASS.SUCCESS);
    const [offset, setOffset] = useState<number>(dimensions.circumference);
    useEffect(() => {
        //  Constant progressOffset will contain circumference of 100 - percentage
        const progressOffset = ((100 - percentage) / 100) * dimensions.circumference;
        setOffset(progressOffset);
        switch (status) {
            case CHART_STATUS.SUCCESS:
                setProgressClass(PROGRESS_CLASS.SUCCESS);
                break;
            case CHART_STATUS.WARNING:
                setProgressClass(PROGRESS_CLASS.WARNING);
                break;
            case CHART_STATUS.DANGER:
                setProgressClass(PROGRESS_CLASS.DANGER);
                break;
            default:
                setProgressClass(PROGRESS_CLASS.SUCCESS);
        }

    }, [percentage, setOffset, dimensions.circumference, offset, label, showPercentage, trackWidth])
    return (
        <React.Fragment key={percentage}>
            <svg className="doughnut-chart" width={size} height={size}>
                {/* Track circle */}
                <circle
                    className="track-circle"
                    cx={dimensions.center}
                    cy={dimensions.center}
                    r={dimensions.radius}
                    strokeWidth={trackWidth}>
                    <title>{percentage}%</title>
                </circle>
                {/* Progress circle */}
                <circle
                    className={"progress-circle " + progressClass}
                    cx={dimensions.center}
                    cy={dimensions.center}
                    r={dimensions.radius}
                    strokeWidth={trackWidth}
                    strokeDasharray={dimensions.circumference}
                    strokeDashoffset={offset}>
                    <title>{percentage}%</title>
                </circle>

                {/* Percentage text */}
                {showPercentage ?
                    <text
                        x={dimensions.center}
                        y={-dimensions.center}
                        className="progress-label percent">
                        {percentage}%
                    </text>
                : null}
                
                {/* Label text */}
                <text
                    x={dimensions.center}
                    y={getLabelYPosition(dimensions.center, showPercentage)}
                    className="progress-label detail">
                    <title>{label}</title>
                    {label.length > labelLength ? label.slice(0, labelLength) + '...' : label}
                </text>
            </svg>
        </React.Fragment>
    )
}

export default DoughnutChart
