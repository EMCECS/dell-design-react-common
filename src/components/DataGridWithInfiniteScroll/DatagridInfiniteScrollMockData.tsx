/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import {faker} from "@faker-js/faker";

export const rowData: Array<object> = [];

function createRowData() {
    return {
        ip: faker.helpers.arrayElement(["192.168.0.1", "192.168.0.2", "192.168.0.3"]),
        serial: faker.helpers.arrayElement(["1234ECG88TGS", "1234ECG88TGR", "1234ECG88TGT"]),
        model: faker.helpers.arrayElement(["PI-12345672", "PI-12345612"]),
        template: faker.lorem.word(),
        networking: faker.helpers.arrayElement(["DHCP", "Others"]),
        role: faker.helpers.arrayElement(["Data", "Monitor"]),
    };
}

Array.from({length: 7}).forEach(() => {
    rowData.push(createRowData());
});

export const columnsData: Array<any> = [
    {accessor: "ip", Header: "IP"},
    {accessor: "serial", Header: "Serial"},
    {accessor: "model", Header: "Model"},
    {accessor: "template", Header: "Template"},
    {accessor: "networking", Header: "Networking"},
    {accessor: "role", Header: "Role"},
];

export const DETAILDATA: any = [];

export function createRandomData() {
    return {
        status: faker.helpers.arrayElement(["good", "bad", "suspect"]),
        name: faker.helpers.arrayElement(["Disk 2", "Disk 1"]),
        slot: faker.helpers.arrayElement(["1", "2"]),
        serial: faker.lorem.word(),
        type: faker.helpers.arrayElement(["Read/Write", "Read"]),
        capacityUsed: faker.helpers.arrayElement(["100 GiB", "200 GiB"]),
        controller: faker.helpers.arrayElement(["1"]),
        blockSize: faker.helpers.arrayElement(["512 bytes"]),
        operationalState: faker.helpers.arrayElement(["N/A"]),
        remainingDriveLife: faker.helpers.arrayElement(["N/A"]),
        progress: faker.helpers.arrayElement(["N/A"]),
        usedRAIDDiskSpace: faker.helpers.arrayElement(["0 GB"]),
        availableRAIDDiskSpace: faker.helpers.arrayElement(["0 GB"]),
        negotiatedSpeed: faker.helpers.arrayElement(["6 Gbps"]),
        capableSpeed: faker.helpers.arrayElement(["6 Gbps"]),
        serialNumber: faker.lorem.word(),
        revision: faker.lorem.word(),
        productId: faker.lorem.word(),
        manufacturer: faker.lorem.word(),
        partNumber: faker.lorem.word(),
        SASAddress: faker.lorem.word(),
        powerStatus: faker.lorem.word(),
        failurePredicted: faker.helpers.arrayElement(["Yes", "No"]),
        deviceDescription: faker.lorem.sentence(),
        capacityAvailable: faker.helpers.arrayElement(["200 GiB", "100 Gib"]),
    };
}

Array.from({ length: 20 }).forEach(() => {
    DETAILDATA.push(createRandomData());
});

export const issueData: any = [];

export function createRandomIssues() {
    return {
        acknowledged: faker.helpers.arrayElement(["true", "false"]),
        clearType: faker.helpers.arrayElement(["Manual", "Auto"]),
        id: faker.helpers.arrayElement([
            "SXNzdWU6ZGVja3MtYXRsYW50aWMtVXBkYXRlLUFwcGxpY2F0aW9uLWF0bGFudGljLWRlY2tz",
        ]),
        message: faker.lorem.sentence(),
        namespace: faker.lorem.word(),
        reason: faker.lorem.word(),
        remedies: [faker.lorem.sentence()],
    };
}

Array.from({ length: 20 }).forEach(() => {
    issueData.push(createRandomIssues());
});

export const detailColumns = [
    { accessor: "status", Header: "Status", show: true },
    { accessor: "name", Header: "Disk", show: true},
    { accessor: "slot", Header: "Slot", show: false },
    { accessor: "serial", Header: "Serial#",  show: true},
    { accessor: "type", Header: "Type", show: false },
    { accessor: "capacityUsed", Header: "Capacity Used", show: true },
];

export const detailColumnName = {
    acknowledged: "Acknowledge",
    clearType: "Clear Type",
    id: "Id",
    message: "Message",
    namespace: "Namespace",
    reason: "Reason",
    remedies: "Remedies",
};

export const detailDataProps = {
    columnNames: detailColumnName,
    detailPaneContentJSON: issueData,
    title: "namespace",
};