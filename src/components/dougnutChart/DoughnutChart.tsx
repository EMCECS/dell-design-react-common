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


export enum CHART_COLORS {
    SUCCESS = "#6EA204",
    WARNING = "#F2AF00",
    DANGER = "#CE1126",
    TRACK = "#DDDDDD",
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

// Function to check whether the size got from user comes in range of the chart size. If not setting the min / max size for the chart.
const calculateSize = (size: number) => {
    if(size >= DEFAULT_CHART_VALUES.MAX_SIZE) {
        return DEFAULT_CHART_VALUES.MAX_SIZE;
    } else if(size < DEFAULT_CHART_VALUES.MIN_SIZE) {
        return DEFAULT_CHART_VALUES.MIN_SIZE;
    } else {
        return size;
    }
}


// This function takes the size and track width of the chart and will calculate center, radius, circumference
const calculateDimensions = (size: number, trackWidth: number) => {
    const progressSize: number = calculateSize(size);
    const center = progressSize / 2;
    const radius = progressSize / 2 - trackWidth / 2;
    const circumference = 2 * Math.PI * radius;
    return {
        progressSize,
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
    const circleRef = useRef<any>(null);
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
    const [progressColor, setProgressColor] = useState<string>(CHART_COLORS.SUCCESS);
    const [offset, setOffset] = useState<number>(dimensions.circumference);
    useEffect(() => {
        //  Constant progressOffset will contain circumference of 100 - percentage
        const progressOffset = ((100 - percentage) / 100) * dimensions.circumference;
        setOffset(progressOffset);
        switch (status) {
            case CHART_STATUS.SUCCESS:
                setProgressColor(CHART_COLORS.SUCCESS)
                break
            case CHART_STATUS.WARNING:
                setProgressColor(CHART_COLORS.WARNING)
                break
            case CHART_STATUS.DANGER:
                setProgressColor(CHART_COLORS.DANGER)
                break
            default:
                setProgressColor(CHART_COLORS.SUCCESS)
        }

        // Rotating the circle by 90 degree to set the starting point to 12'o clock position.
        circleRef.current.style = 'transform: rotate(90deg)';
        // Adding transition for change in value in the chart
        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease';

    }, [percentage, setOffset, dimensions.circumference, offset, label, showPercentage, trackWidth])
    return (
        <div>
            <svg className="doughnut-chart" width={dimensions.progressSize} height={dimensions.progressSize}>
                {/* Track circle */}
                <circle
                    className="circular-bg"
                    stroke={CHART_COLORS.TRACK}
                    cx={dimensions.center}
                    cy={dimensions.center}
                    r={dimensions.radius}
                    strokeWidth={trackWidth}>
                    <title>{percentage}%</title>
                </circle>
                {/* Progress circle */}
                <circle
                    ref={circleRef}
                    className="circle"
                    stroke={progressColor}
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
        </div>
    )
}

export default DoughnutChart