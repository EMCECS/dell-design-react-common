import React, { useEffect, useState, useRef } from "react";
import "styles/components/CircularProgress.scss"

export type CircularProgressType = {
    size?: number;
    progress: number;
    status?: ProgressBarStatus;
    label: string;
    showPercentage?: boolean;
    trackWidth?: number;
    labelLength?: number;
}

export enum ProgressBarStatus {
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}


export enum PROGRESS_COLORS {
    SUCCESS = "#6EA204",
    WARNING = "#F2AF00",
    DANGER = "#CE1126",
    TRACK = "#DDDDDD",
}

export enum DEFAULT_PROGRESS_VALUES {
    SIZE = 200,
    TRACK_WIDTH = 15,
    PROGRESS = 25,
    LABEL_LENGTH = 15,
}

const LABEL_OFFSET = 35;

const calculateDimensions = (size: number, trackWidth: number) => {
    const progressSize: number = size;
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

const getLabelYPosition = (center: number, showPercentage: boolean) => {
    if (showPercentage) {
        return -center + LABEL_OFFSET;
    } else {
        return -center;
    }
}
const ProgressBar = (props: CircularProgressType) => {
    const circleRef = useRef<any>(null);
    const {
        size = DEFAULT_PROGRESS_VALUES.SIZE,
        progress,
        status,
        label,
        showPercentage = true,
        trackWidth = DEFAULT_PROGRESS_VALUES.TRACK_WIDTH,
        labelLength = DEFAULT_PROGRESS_VALUES.LABEL_LENGTH,
    } = props;
    const dimensions = calculateDimensions(size, trackWidth);
    const [progressColor, setProgressColor] = useState<string>(PROGRESS_COLORS.SUCCESS);
    const [offset, setOffset] = useState<number>(dimensions.circumference);
    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * dimensions.circumference;
        setOffset(progressOffset);
        switch (status) {
            case ProgressBarStatus.SUCCESS:
                setProgressColor(PROGRESS_COLORS.SUCCESS)
                break
            case ProgressBarStatus.WARNING:
                setProgressColor(PROGRESS_COLORS.WARNING)
                break
            case ProgressBarStatus.DANGER:
                setProgressColor(PROGRESS_COLORS.DANGER)
                break
            default:
                setProgressColor(PROGRESS_COLORS.SUCCESS)
        }

        circleRef.current.style = 'transform: rotate(90deg)';
        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease';

    }, [progress, setOffset, dimensions.circumference, offset, label])
    return (
        <div>
            <svg className="circular-progress" width={dimensions.progressSize} height={dimensions.progressSize}>
                <circle
                    className="circular-bg"
                    stroke={PROGRESS_COLORS.TRACK}
                    cx={dimensions.center}
                    cy={dimensions.center}
                    r={dimensions.radius}
                    strokeWidth={trackWidth}>
                    <title>{progress}%</title>
                </circle>
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
                    <title>{progress}%</title>
                </circle>
                {showPercentage ?
                    <text
                        x={dimensions.center}
                        y={-dimensions.center}
                        className="progress-label percent">
                        {progress}%
                    </text>
                    : null}
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

export default ProgressBar