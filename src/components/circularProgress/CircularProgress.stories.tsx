import React from 'react';
import { storiesOf } from "@storybook/react";
import CircularProgress from './CircularProgress';
import { ProgressBarStatus } from './CircularProgress';

const divStyle: any = {display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent:"space-around"}

storiesOf("CircularProgressBar", module)
    .add("Default", () => (
        <div style={divStyle}>
            <CircularProgress
                progress={25}
                label="Sample Label"/>
        </div>
    ))
    .add("Status", () => (
        <div style={divStyle}>
            <CircularProgress
                progress={14}
                label="Success"
                status={ProgressBarStatus.SUCCESS}/>
            <CircularProgress 
                progress={87}
                label="Danger"
                status={ProgressBarStatus.DANGER}/>
            <CircularProgress
                progress={55}
                label="Warning"
                status={ProgressBarStatus.WARNING}/>
        </div>
    ))
    .add("Only label", () => (
        <div style={divStyle}>
            <CircularProgress
                progress={14}
                label="Success"
                status={ProgressBarStatus.SUCCESS}
                showPercentage={false}/>
            <CircularProgress
                progress={87}
                label="Danger"
                status={ProgressBarStatus.DANGER}
                showPercentage={false}/>
            <CircularProgress
                progress={55}
                label="Warning"
                status={ProgressBarStatus.WARNING}
                showPercentage={false}/>
        </div>
    ))
    .add("Size", () => (
        <div style={divStyle}>
            <CircularProgress
                size={100}
                progress={14}
                label="Success"
                status={ProgressBarStatus.SUCCESS}
                showPercentage={false}/>
            <CircularProgress
                size={150}
                progress={14}
                label="150px"
                status={ProgressBarStatus.SUCCESS}/>
            <CircularProgress
                size={175}
                progress={87}
                label="175px"
                status={ProgressBarStatus.DANGER}/>
            <CircularProgress
                size={225}
                progress={55}
                label="225px"
                status={ProgressBarStatus.WARNING}/>
            <CircularProgress
                size={250}
                progress={55}
                label="225px"
                status={ProgressBarStatus.WARNING}/>
        </div>
    ))
    .add("Track Width", () => (
        <div style={divStyle}>
            <CircularProgress
                trackWidth={5}
                size={100}
                progress={14}
                label="5px"
                status={ProgressBarStatus.SUCCESS}
                showPercentage={false}/>
            <CircularProgress
                trackWidth={10}
                size={100}
                progress={87}
                label="10px"
                status={ProgressBarStatus.DANGER}
                showPercentage={false}/>
            <CircularProgress
                trackWidth={15}
                size={100}
                progress={55}
                label="15px"
                status={ProgressBarStatus.WARNING}
                showPercentage={false}/>
        </div>
    ))
    .add("Label Length", () => (
        <div style={divStyle}>
            <CircularProgress
                size={100}
                progress={14}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={5}
                showPercentage={false}/>
            <CircularProgress
                size={150}
                progress={87}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={10}
                showPercentage={false}/>
            <CircularProgress
                size={200}
                progress={55}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                showPercentage={false}/>
            <CircularProgress
                size={250}
                progress={55}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={20}
                showPercentage={false}/>
        </div>
    ))