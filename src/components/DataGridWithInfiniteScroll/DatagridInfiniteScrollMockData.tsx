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
