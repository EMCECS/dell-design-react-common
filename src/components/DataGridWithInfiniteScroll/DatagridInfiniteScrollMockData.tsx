/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

 import { faker } from '@faker-js/faker';

 import Accordion from "react-bootstrap/Accordion";
 import {DatePicker} from "@dellstorage/clarity-react/forms/datepicker/DatePicker";
 

 export const DETAILDATA : any = [];

 export function createRandomData() {
   return {
     status: faker.helpers.arrayElement(['good', 'bad', 'suspect']),
     name: faker.helpers.arrayElement(['Disk 2', 'Disk 1']),
     slot: faker.helpers.arrayElement(['1', '2']),
     serial: faker.lorem.word(),
     type: faker.helpers.arrayElement(['Read/Write', 'Read']),
     capacityUsed: faker.helpers.arrayElement(['100 GiB', '200 GiB']),
     controller: faker.helpers.arrayElement(['1']),
     blockSize: faker.helpers.arrayElement(["512 bytes"]),
     operationalState: faker.helpers.arrayElement(["N/A"]),
     remainingDriveLife: faker.helpers.arrayElement(["N/A"]),
     progress:  faker.helpers.arrayElement(["N/A"]),
     usedRAIDDiskSpace:  faker.helpers.arrayElement(["0 GB"]),
     availableRAIDDiskSpace:  faker.helpers.arrayElement(["0 GB"]),
     negotiatedSpeed:  faker.helpers.arrayElement(["6 Gbps"]),
     capableSpeed: faker.helpers.arrayElement(["6 Gbps"]),
     serialNumber: faker.lorem.word(),
      revision: faker.lorem.word(),
      productId: faker.lorem.word(),
      manufacturer: faker.lorem.word(),
      partNumber: faker.lorem.word(),
      SASAddress: faker.lorem.word(),
      powerStatus: faker.lorem.word(),
      failurePredicted: faker.helpers.arrayElement(['Yes','No']),
      deviceDescription: faker.lorem.sentence(),
      capacityAvailable: faker.helpers.arrayElement(["200 GiB", "100 Gib"]),
   };
 }
 
 Array.from({ length: 10 }).forEach(() => {
  DETAILDATA.push(createRandomData());
 });

 export const issueData : any = [];

 export function createRandomIssues() {
   return {
    acknowledged: faker.helpers.arrayElement(['true', 'false']),
    clearType: faker.helpers.arrayElement(['Manual', 'Auto']),
    id: faker.helpers.arrayElement(['SXNzdWU6ZGVja3MtYXRsYW50aWMtVXBkYXRlLUFwcGxpY2F0aW9uLWF0bGFudGljLWRlY2tz']),
    message:  faker.lorem.sentence(),
    namespace:  faker.lorem.word(),
    reason:  faker.lorem.word(),
    remedies: [ faker.lorem.sentence()]
   };
 }
 
 Array.from({ length: 10 }).forEach(() => {
  issueData.push(createRandomIssues());
 });

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
//  expandable component.
export const ExpandedComponent = ({data}:any) => <pre>{JSON.stringify(data.title, null, 2)}</pre>;


export const columns = [
  {accessor: "ip", Header: "IP", show: true},
  {accessor: "serial", Header: "Serial", show: true},
  {accessor: "model", Header: "Model", show: false},
  {accessor: "template", Header: "Template", show: true},
  {accessor: "networking", Header: "Networking", show: true},
  {accessor: "role", Header: "Role", show: false},
];

export const detailColumns = [
  {accessor: "status", Header: "Status", show: true},
  {accessor: "name", Header: "Disk", show: true},
  {accessor: "slot", Header: "Slot", show: false},
  {accessor: "serial", Header: "Serial#", show: true},
  {accessor: "type", Header: "Type", show: false},
  {accessor: "capacityUsed", Header: "Capacity Used", show: true},
];

export const columnsData = [
  {accessor: "ip", Header: "IP"},
  {accessor: "serial", Header: "Serial"},
  {accessor: "model", Header: "Model"},
  {accessor: "template", Header: "Template"},
  {accessor: "networking", Header: "Networking"},
  {accessor: "role", Header: "Role"},
];

export const columnsExpansion = [
  {name: "Title", selector: (row: any) => row.title},
  {name: "Year", selector: (row: any) => row.year},
];

export const dataExpansion = [
  {id: 1, title: "Beetlejuice", year: "1988"},
  {id: 2, title: "Ghostbusters", year: "1984"},
];

export const applyFilter = (obj: any): void => {
  const filter: string[] = [];
  obj.map((item: any, index: number) => {
      switch (index) {
          case 0:
              Object.entries(item).map((subItem: any) => {
                  subItem[1] && filter.push(subItem[0]);
              });
      }
  });
};
export const filterComponent = () => {
  return [
      <div>
          <Accordion>
              <Accordion.Item eventKey="1">
                  <Accordion.Header>Date</Accordion.Header>
                  <Accordion.Body>
                      <DatePicker/>
                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                  <Accordion.Header>Status</Accordion.Header>
                  <Accordion.Body>
                      <DatePicker/>
                  </Accordion.Body>
              </Accordion.Item>
          </Accordion>
      </div>,
  ];
};
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
export const getColumnNameAndOrder = (columnData: any) => {
  return [columnData.Header, columnData.isSortedDesc];
};