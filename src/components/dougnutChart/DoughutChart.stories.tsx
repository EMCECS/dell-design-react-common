import React from 'react';
import { storiesOf } from "@storybook/react";
import DoughnutChart from './DoughnutChart';
import { CHART_STATUS } from './DoughnutChart';

const divStyle: any = {display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent:"space-around"}

storiesOf("Doughnut Chart", module)
    .add("Default", () => (
        <div style={divStyle}>
            <DoughnutChart
                percentage={25}
                label="Sample Label"/>
        </div>
    ))
    .add("Status", () => (
        <div style={divStyle}>
            <DoughnutChart
                percentage={14}
                label="Success"
                status={CHART_STATUS.SUCCESS}/>
            <DoughnutChart 
                percentage={87}
                label="Danger"
                status={CHART_STATUS.DANGER}/>
            <DoughnutChart
                percentage={55}
                label="Warning"
                status={CHART_STATUS.WARNING}/>
        </div>
    ))
    .add("Only label", () => (
        <div style={divStyle}>
            <DoughnutChart
                percentage={14}
                label="Success"
                status={CHART_STATUS.SUCCESS}
                showPercentage={false}/>
            <DoughnutChart
                percentage={87}
                label="Danger"
                status={CHART_STATUS.DANGER}
                showPercentage={false}/>
            <DoughnutChart
                percentage={55}
                label="Warning"
                status={CHART_STATUS.WARNING}
                showPercentage={false}/>
        </div>
    ))
    .add("Size", () => (
        <div style={divStyle}>
            <DoughnutChart
                size={20}
                percentage={14}
                label="Success"
                status={CHART_STATUS.SUCCESS}
                showPercentage={false}/>
            <DoughnutChart
                size={150}
                percentage={14}
                label="150px"
                status={CHART_STATUS.SUCCESS}/>
            <DoughnutChart
                size={175}
                percentage={87}
                label="175px"
                status={CHART_STATUS.DANGER}/>
            <DoughnutChart
                size={225}
                percentage={55}
                label="225px"
                status={CHART_STATUS.WARNING}/>
            <DoughnutChart
                size={250}
                percentage={55}
                label="250px"
                status={CHART_STATUS.WARNING}/>
        </div>
    ))
    .add("Track Width", () => (
        <div style={divStyle}>
            <DoughnutChart
                trackWidth={5}
                size={100}
                percentage={14}
                label="5px"
                status={CHART_STATUS.SUCCESS}
                showPercentage={false}/>
            <DoughnutChart
                trackWidth={10}
                size={100}
                percentage={87}
                label="10px"
                status={CHART_STATUS.DANGER}
                showPercentage={false}/>
            <DoughnutChart
                trackWidth={15}
                size={100}
                percentage={55}
                label="15px"
                status={CHART_STATUS.WARNING}
                showPercentage={false}/>
        </div>
    ))
    .add("Label Length", () => (
        <div style={divStyle}>
            <DoughnutChart
                size={100}
                percentage={14}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={5}
                showPercentage={false}/>
            <DoughnutChart
                size={150}
                percentage={87}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={10}
                showPercentage={false}/>
            <DoughnutChart
                size={200}
                percentage={55}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                showPercentage={false}/>
            <DoughnutChart
                size={250}
                percentage={55}
                label="Eiusmod elit adipisicing magna nostrud commodo sunt sit."
                labelLength={20}
                showPercentage={false}/>
        </div>
    ))