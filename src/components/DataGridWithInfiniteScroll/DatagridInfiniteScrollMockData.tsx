/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import React from "react";

export const DATA = {
    rows: [
        {
            ip: '192.168.0.1',
            serial: '1234ECG88TGS',
            model: 'PI-12345672',
            template: 'ECS EX400',
            networking: 'DHCP',
            role: 'Data, Monitor',

        }
    ],
    hugeData: [
        {
            ip: '192.168.0.1',
            serial: '1234ECG88TGS',
            model: 'PI-12345672',
            template: 'ECS EX400',
            networking: 'DHCP',
            role: 'Data, Monitor',
        }
    ],
    "filterData": [
        {
            "title": "Status",
            "data": ["good", "bad", "suspect"]
        },
        {
            "title": "Lorem",
            "data": ["lorem", "ipsum", "dolor"]
        }
    ]
}
for(let i=0;i<5;i++){
    DATA.rows.push({
        ip: '192.168.0.'+i,
        serial: '1234ECG88TGS',
        model: 'PI-12345672',
        template: 'ECS EX400',
        networking: 'DHCP',
        role: 'Data, Monitor',
    })
}
for(let i=0;i<150;i++){
    DATA.hugeData.push({
        ip: '192.168.0.'+i,
        serial: '1234ECG88TGS',
        model: 'PI-12345672',
        template: 'ECS EX400',
        networking: 'DHCP',
        role: 'Data, Monitor',
    })
}
