/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export const DATA = {
    rows: [
        {
            ip: "192.168.0.1",
            serial: "1234ECG88TGS",
            model: "PI-12345672",
            template: "ECS EX400",
            networking: "DHCP",
            role: "Data, Monitor",
        },
    ],
};
for (let i = 0; i < 5; i++) {
    DATA.rows.push({
        ip: "192.168.0." + i,
        serial: "1234ECG88TGS",
        model: "PI-12345672",
        template: "ECS EX400",
        networking: "DHCP",
        role: "Data, Monitor",
    });
}

export const columnsData = [
    { accessor: "ip", Header: "IP" },
    { accessor: "serial", Header: "Serial" },
    { accessor: "model", Header: "Model", },
    { accessor: "template", Header: "Template" },
    { accessor: "networking", Header: "Networking" },
    { accessor: "role", Header: "Role"},
];
