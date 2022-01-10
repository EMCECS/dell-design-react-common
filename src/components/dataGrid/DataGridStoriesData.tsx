/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {DataGridRow, DataGridFilterResult, SortOrder} from "@dellstorage/clarity-react/datagrid";

/**
 * Data for Columns
 */
 export const normalColumns = [
    {columnName: "IP"},
    {columnName: "Serial"},
    {columnName: "Model"},
    {columnName: "Template"},
    {columnName: "Networking"},
    {columnName: "Role"},
];

/**
 * Data for Rows
 */
 export const normalRows = [
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "abc"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "pqr"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "xyz"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "123"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "xyz"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
    },
];

/**
* Data for Expandable Rows
*/
const expandableContent =
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in neque in ante placerat mattis id sed quam. Proin rhoncus lacus et tempor dignissim. Vivamus sem quam, pellentesque aliquet suscipit eget, pellentesque sed arcu. Vivamus in dui lectus. Suspendisse cursus est ac nisl imperdiet viverra. Aenean sagittis nibh lacus, in eleifend urna ultrices et. Mauris porttitor nisi nec velit pharetra porttitor. Vestibulum vulputate sollicitudin dolor ut tincidunt. Phasellus vitae blandit felis. Nullam posuere ipsum tincidunt velit pellentesque rhoncus. Morbi faucibus ut ipsum at malesuada. Nam vestibulum felis sit amet metus finibus hendrerit. Fusce faucibus odio eget ex vulputate rhoncus. Fusce nec aliquam leo, at suscipit diam.";

//Custom function to filter data
export const loadExpandableContent = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        // Purposefully added delay here to see loading spinner
        setTimeout(function() {
            resolve(<div>{expandableContent}</div>);
        }, 2000);
    });
};

export const expandableRows = [
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "abc"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
        expandableRowData: {
            expandableContent: expandableContent,
        },
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "pqr"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
        expandableRowData: {
            expandableContent: expandableContent,
        },
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "123"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
        expandableRowData: {
            onRowExpand: loadExpandableContent,
            onRowContract: () => {
                console.log("I have contracted!");
            },
        },
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "1234ECG88TGS"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
        expandableRowData: {
            expandableContent: null,
            hideRowExpandIcon: true,
        },
    },
    {
        rowData: [
            {columnName: "IP", cellData: '192.168.0.1'},
            {columnName: "Serial", cellData: "1234ECG88TGS"},
            {columnName: "Model", cellData: "PI-12345672"},
            {columnName: "Template", cellData: "ECS EX400"},
            {columnName: "Networking", cellData: "DHCP"},
            {columnName: "Role", cellData: "Data,Monitor"},
        ],
        expandableRowData: {
            onRowContract: () => {
                alert("I have contracted!");
            },
        },
    },
];

export const defaultFooter = {
    showFooter: true,
};


export const hideShowColFooter = {
    hideShowColumns: {
        hideShowColBtn: true,
    },
    showFooter: true,
};

/**
 * Data for Pagination
 */

// Function to get data for page based on pagenumber
export const getPageData = (pageIndex: number, pageSize: number): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        let rows: DataGridRow[] = [];
        if (pageSize === 5) {
            if (pageIndex === 2) {
                rows = paginationRows.slice(5, 10);
            }
            if (pageIndex === 1) {
                rows = paginationRows.slice(0, 5);
            }
        } else if (pageSize === 10) {
            rows = paginationRows;
        }
        // Purposefully added dealy here to see loading spinner
        setTimeout(function() {
            resolve(rows);
        }, 2000);
    });
};

const cellData = [
    ['192.168.0.1', "xyz", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "abc", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "def", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "xyz", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "123", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "123", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"],
    ['192.168.0.1', "klm", "PI-12345672", "ECS EX400", "DHCP", "Data,Monitor"]
];
// Function to get row data
export function getRowData() {
    let rowValues: DataGridRow[] = [];
    cellData.forEach(function(element: any) {
        const row: DataGridRow = {
            rowData: [
                {
                    columnName: "IP",
                    cellData: element[0],
                },
                {
                    columnName: "Serial",
                    cellData: element[1],
                },
                {
                    columnName: "Model",
                    cellData: element[2],
                },
                {
                    columnName: "Template",
                    cellData: element[3],
                },
                {
                    columnName: "Networking",
                    cellData: element[4],
                },
                {
                    columnName: "Role",
                    cellData: element[5],
                },
            ],
        };

        rowValues.push(row);
    });
    return rowValues;
}

// Data for pagination rows
export const paginationRows = getRowData();

export const paginationDetails = {
    totalItems: paginationRows.length,
    getPageData: getPageData,
    pageSize: 5,
    pageSizes: [5, 10],
};
/**
 * Data for Filtering
 */

 function filterRows(rows: DataGridRow[], columnValues: string[]) {
    const newRows = rows.filter(row => {
        let matchFound = false;
        for (const index in row.rowData) {
            const content = String(row.rowData[index].cellData);
            columnValues.forEach(columnValue => {
                if (content.indexOf(columnValue) !== -1) {
                    matchFound = true;
                }
            });
        }
        if (matchFound) {
            return row;
        }
    });
    return newRows;
}


//Custom function to filter data
export const filterFunction = (
    rows: DataGridRow[],
    columnValue: string,
    columnName: string,
): Promise<DataGridFilterResult> => {
    return new Promise((resolve, reject) => {
        let result: DataGridFilterResult = {
            rows: [],
            totalItems: 0,
        };

        if (
            columnValue === "" ||
            columnValue === undefined ||
            (Array.isArray(columnValue) && columnValue.length === 0)
        ) {
            result = {
                rows: normalRows,
                totalItems: normalRows.length,
            };
        } else {
            const newRows = filterRows(normalRows, Array.isArray(columnValue) ? columnValue : [columnValue]);
            result = {
                rows: newRows,
                totalItems: newRows.length,
            };
        }
        resolve(result);
    });
};

// Custom sorting function for number and string type
export const sortFunction = (rows: DataGridRow[], sortOrder: SortOrder, columnName: string): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        rows.sort(
            (first: DataGridRow, second: DataGridRow): number => {
                let result = 0;
                let firstRecord = first.rowData.find(function(element: any) {
                    if (element.columnName === columnName) return element;
                });

                let secondRecord = second.rowData.find(function(element: any) {
                    if (element.columnName === columnName) return element;
                });

                if (firstRecord && secondRecord) {
                    const contentType = typeof firstRecord.cellData;

                    if (sortOrder === SortOrder.ASC) {
                        if (contentType === "number") {
                            result = firstRecord.cellData - secondRecord.cellData;
                        } else if (contentType === "string") {
                            if (firstRecord.cellData > secondRecord.cellData) result = -1;
                            else if (firstRecord.cellData < secondRecord.cellData) result = 1;
                        }
                    } else if (sortOrder == SortOrder.DESC) {
                        if (contentType === "number") {
                            result = secondRecord.cellData - firstRecord.cellData;
                        } else if (contentType === "string") {
                            if (secondRecord.cellData > firstRecord.cellData) result = -1;
                            else if (secondRecord.cellData < firstRecord.cellData) result = 1;
                        }
                    }
                }
                return result;
            },
        );

        // Purposefully added delay here to see loading spinner
        setTimeout(function() {
            resolve(rows);
        }, 2000);
    });
};

// Column Data with sort option
export const sortColumns = [
    {
        columnName: "IP",
        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
    },
    {
        columnName: "Serial",
        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction, isSorted: true},
    },
    {columnName: "Model"},
    {columnName: "Template"},
    {columnName: "Networking"},
    {
        columnName: "Role",
        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
    },
];