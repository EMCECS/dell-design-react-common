/**
 * Copyright (c) 2021 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {DataGridRow, DataGridFilterResult, SortOrder, DataGridColumn} from "@dellstorage/clarity-react/datagrid";
import {Icon} from "@dellstorage/clarity-react/icon";
import {Button} from "@dellstorage/clarity-react/forms/button";
/**
 * Data for Columns
 */
 export const normalColumns: DataGridColumn[] = [
    {columnName: "IP"},
    {columnName: "Serial"},
    {columnName: "Model"},
    {columnName: "Template"},
    {columnName: "Networking"},
    {columnName: "Role"},
];

export const columnsForCustomRows: DataGridColumn[] = [
    {columnName: "User ID"},
    {columnName: "Name"},
    {columnName: "Creation Date"},
    {columnName: "Favorite color"},
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

// Data for pagination rows
export const paginationRowsWithLinks = (linkFunction: Function) => getRowDataWithLink(linkFunction);

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

// Function to get data for page based on page number
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
        // Purposefully added delay here to see loading spinner
        setTimeout(function() {
            resolve(rows);
        }, 2000);
    });
};

//Function to get data for page based on customPageSize and page number
export const getPageDataForCustomPageSize = (pageIndex: number, pageSize: number): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        let rows: DataGridRow[] = [];
        let offset = pageSize * (pageIndex - 1);
        rows = paginationRows.slice(offset, offset + pageSize);

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
    pageSizes: ["5", "10"],
};

export const paginationDetailswithDefaultPageSizes = {
    totalItems: paginationRows.length,
    getPageData: getPageDataForCustomPageSize,
    pageSize: 10,
};

/**
 * Data for Filtering
 */
 function filterRows(rows: DataGridRow[], filterColumn: string, columnValues: string[]) {
     return rows.filter((row) =>
         row.rowData.some(
             ({columnName, cellData}) =>
                 filterColumn === columnName && columnValues.some((value) => cellData.indexOf(value) !== -1),
         ),
     );
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
            const newRows = filterRows(normalRows, columnName, Array.isArray(columnValue) ? columnValue : [columnValue]);
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
                    return element.columnName === columnName;
                });

                let secondRecord = second.rowData.find(function(element: any) {
                    return element.columnName === columnName;
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
                    } else if (sortOrder === SortOrder.DESC) {
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

/**
 * Data for Custom content rendering
 */
 export const customRows = [
    {
        rowData: [
            {columnName: "User ID", cellData: 41512},
            {columnName: "Name", cellData: "Georgia"},
            {columnName: "Creation Date", cellData: "Sep 11, 2008"},
            {
                columnName: "Favorite color",
                cellData: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 16166},
            {columnName: "Name", cellData: "Brynn"},
            {columnName: "Creation Date", cellData: "Aug 2, 2014"},
            {
                columnName: "Favorite color",
                cellData: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
];

/**
 * Data for Footer
 */
 export const customFooter = {
    footerData: "Total 2 users",
    showFooter: true,
};

// Function to get some selection enabled rows
export const getSelectableRowsData = (): DataGridRow[] => {
    let disableRowSelection: boolean = true;
    let updatedRows: DataGridRow[] = getRowData();
    updatedRows.forEach((row: DataGridRow) => {
        disableRowSelection = !disableRowSelection;
        row.disableRowSelection = disableRowSelection;
    });
    return updatedRows;
};

/**
 * Data for Batch Actions
 */
// Grid Action component
type GridActionsState = {
    selectedRows: any[];
    showEdit: boolean;
};

export class GridActions extends React.PureComponent<any, GridActionsState> {
    state = {
        selectedRows: [],
        showEdit: false,
    };

    updateActions(rows: any) {
        this.setState({
            selectedRows: rows,
            showEdit: rows.length === 1 ? true : false,
        });
    }

    render() {
        const {selectedRows, showEdit} = this.state;
        return (
            <div>
                <Button key="new">NEW</Button>
                <Button key="edit" show={showEdit}>
                    EDIT
                </Button>
                <Button
                    key="delete"
                    onClick={() => {
                        alert("Deleted" + selectedRows.length);
                    }}
                >
                    DELETE
                </Button>
            </div>
        );
    }
}

export function getRowDataWithLink(functionToAttach: Function) {
    let rowValues: DataGridRow[] = [];
    cellData.forEach(function(element: any, index: number) {
        const row: DataGridRow = {
            rowData: [
                {
                    columnName: "User ID",
                    cellData: element[0],
                },
                {
                    columnName: "Name",
                    cellDisplayData: (
                        // eslint-disable-next-line
                        <a
                            href="javascript:void(0);" // eslint-disable-line no-script-url
                            className="nameLink"
                            onClick={event => functionToAttach(index)}
                        >
                            {element[1]}
                        </a>
                    ),
                    cellData: element[1],
                },
                {
                    columnName: "Creation Date",
                    cellData: element[2],
                },
                {
                    columnName: "Favorite color",
                    cellData: element[3],
                },
            ],
            detailPaneData: {
                detailPaneContent: <React.Fragment>Details Panel for : {element[1]}</React.Fragment>,
            },
        };

        rowValues.push(row);
    });
    return rowValues;
}
