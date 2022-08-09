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
export const expandableData = [
    {
        "firstName": "motion-cq4n1",
        "lastName": "gold-c44qg",
        "age": 5,
        "visits": 89,
        "progress": 70,
        "status": "relationship",
        "subRows": [
            {
                "firstName": "digestion-67zau",
                "lastName": "presence-f0w8w",
                "age": 17,
                "visits": 89,
                "progress": 67,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "destruction-xbuvr",
                        "lastName": "growth-mrmei",
                        "age": 2,
                        "visits": 28,
                        "progress": 48,
                        "status": "complicated"
                    }
                ]
            },
            {
                "firstName": "rifle-1kwh3",
                "lastName": "awareness-qmhrt",
                "age": 0,
                "visits": 32,
                "progress": 65,
                "status": "complicated",
                "subRows": [
                    {
                        "firstName": "aftermath-g4ydv",
                        "lastName": "mixture-hykkg",
                        "age": 11,
                        "visits": 94,
                        "progress": 70,
                        "status": "complicated"
                    }
                ]
            }
        ]
    },
    {
        "firstName": "philosophy-068q6",
        "lastName": "sticks-07qdm",
        "age": 9,
        "visits": 47,
        "progress": 6,
        "status": "relationship",
        "subRows": [
            {
                "firstName": "hole-eeai8",
                "lastName": "historian-yhikw",
                "age": 26,
                "visits": 32,
                "progress": 97,
                "status": "relationship",
                "subRows": [
                    {
                        "firstName": "stitch-lsuft",
                        "lastName": "suggestion-j7r61",
                        "age": 17,
                        "visits": 23,
                        "progress": 99,
                        "status": "single"
                    },
                    {
                        "firstName": "world-2wi9s",
                        "lastName": "courage-q0fvw",
                        "age": 20,
                        "visits": 27,
                        "progress": 1,
                        "status": "relationship"
                    }
                ]
            },
            {
                "firstName": "pen-y8060",
                "lastName": "magazine-uxycr",
                "age": 6,
                "visits": 57,
                "progress": 83,
                "status": "single",
                "subRows": [
                    {
                        "firstName": "problem-393nd",
                        "lastName": "product-efasy",
                        "age": 12,
                        "visits": 13,
                        "progress": 1,
                        "status": "single"
                    }
                ]
            }
        ]
    }
]