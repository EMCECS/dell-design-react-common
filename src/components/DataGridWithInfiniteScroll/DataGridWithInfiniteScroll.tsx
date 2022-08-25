/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import {Button} from "@dellstorage/clarity-react/forms/button";
import {Icon} from "@dellstorage/clarity-react/icon/Icon";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useFilters, useSortBy, useTable, useBlockLayout, useResizeColumns,useExpanded} from "react-table";
import { Card, CardBlock, CardTitle } from '@dellstorage/clarity-react/cards'
import { Table } from '@dellstorage/clarity-react/tables';
import FilterPanel from "./FilterPanel";
/*import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import makeData from "./DatagridInfiniteScrollMockDataCode";*/

/**
 * Enum for RowTpye :
 * @param {EXPANDABLE} for enabling expandable rows
 * @param {COMPACT} for enabling compact rows
 * @param {ROWS_WITH_DETAIL_PANE} for enabling detail pane for rows
 * @param {EXPANDABLE_ROWS_WITH_DETAIL_PANE} for enabling detail pane for expandable rows
 * @param {COMPACT_ROWS_WITH_DETAIL_PANE} for enabling detail pane for compact rows
 */
export enum GridRowType {
    EXPANDABLE = "expandable",
    COMPACT = "compact",
    ROWS_WITH_DETAIL_PANE = "rows_with_detail_pane",
    EXPANDABLE_ROWS_WITH_DETAIL_PANE = "expandable_rows_with_detail_pane",
    COMPACT_ROWS_WITH_DETAIL_PANE = "compact_rows_with_detail_panes",
}

/**
 * Enum for GridSelectionType :
 * @param {MULTI} for enabling multi row select
 * @param {SINGLE} for enabling single row select
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}

export type ExpandableRowDetails = {
    isLoading?: boolean;
    onRowExpand?: (row: DataGridRow) => Promise<any>;
    onRowContract?: (row: DataGridRow) => void;
    expandableContent?: any;
    isExpanded?: boolean;
    hideRowExpandIcon?: boolean;
};
export type DataGridRow = {
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    disableRowSelection?: boolean;
    expandableRowData?: ExpandableRowDetails;
};
/**
 * Enum for sorting order :
 * @param {DESC} to sort data in descending order
 * @param {ASC} to sort data in ascending order
 * @param {NONE} no sorting
 */
export enum SortOrder {
    DESC = "descending",
    ASC = "ascending ",
    NONE = "none",
}

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 * @param {isSorted} checks if column is currently sorted or not
 * @param {hideSort} if true hides sort
 */
export type DataGridSort = {
    defaultSortOrder: SortOrder;
    sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => Promise<DataGridRow[]>;
    isSorted?: boolean;
    hideSort?: boolean;
};

type DataGridProps = {
    className?: string;
    style?: any;
    dataqa?: string;
    id?: string;
    rows?: { [key: string]: any };
    columns: { [key: string]: any };
    selectionType?: GridSelectionType;
    rowType?: GridRowType;
    sorting?: boolean;
    isFilter?: boolean;
    expandable?: boolean;
    expandComponent?: any;
    pagination?: boolean;
    columnSelect?: boolean;
    infiniteScroll?: boolean;
    defaultColumnWidth?: number;
    tableHeight?: number;
    detailPaneContent? : any;
    detailPanelShow? : boolean;
    defaultColumnHeader? : any;
    fetchMoreData? : Function;
    filterFunction? : Function;
    filterData? : any;
}

export type DataGridColumn = {
    columnName: string;
    displayName?: any;
    tooltip?: any;
    columnID?: number; // For internal use
    className?: string;
    style?: any;
    filter?: React.ReactNode;
    isVisible?: boolean;
    width?: number;
    sort?: DataGridSort;
};


const DataGridWithInfiniteScroll = (props: DataGridProps) => {
    const data: any = props?.rows ? props?.rows : [];
    const columns: any = props?.columns;
    const fetchMoreData: any = props?.fetchMoreData;
    const selectionType: any = props?.selectionType;
    const filterData : any = props?.filterData;
    const filterFunction : any = props?.filterFunction;
    const columnSelect: boolean = props?.columnSelect ? props?.columnSelect : false;
    const defaultColumnHeader : any = props?.defaultColumnHeader;
    const detailPanelShow: boolean = props?.detailPanelShow ? props?.detailPanelShow : false;
    const refParent: any = useRef();
    const refChild: any = useRef();
    const refSetting : any = useRef();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [transformVal, settransformVal] = useState<any>("translateX(0px) translateY(0px)");
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false)
    const [detailRowIndex, setDetailRowIndex] = useState<number>()
    const [showDetailData, setShowDetailData] = useState<any>()
    const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>()
    let expandData: { key: string; value: any; }[];
    const rowType: any = props.rowType;
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    useEffect(() => {
        if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
            refParent.current = refParent.current.getClientRects()[0];
            refChild.current = refChild.current.getClientRects()[0];
        }
    }, []);

    useEffect(() => {
        if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }

    }, [refParent?.current?.getClientRects()[0]?.width,refParent?.current?.clientWidth]);

    const [state, setState] = useState({
        items: [],
        loading: false
    });
    let count = 0;
    let [resetVal, setResetVal] = useState<boolean>(false);


    useEffect(() => {
        if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
            refParent.current = refParent.current.getClientRects()[0];
            refChild.current = refChild.current.getClientRects()[0];
        }
    }, []);

    useEffect(() => {
        if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }

    }, [refParent?.current?.getClientRects()[0]?.width,refParent?.current?.clientWidth]);

    useEffect(() => {
        if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }

    }, [refParent?.current?.getClientRects()[0]?.width]);


    // Check if datagrid need to render detail Pane for rows
    const isDatagridWithDetailPane = (): boolean => {
        return (
            rowType
                ? rowType === GridRowType.ROWS_WITH_DETAIL_PANE ||
                rowType === GridRowType.EXPANDABLE_ROWS_WITH_DETAIL_PANE ||
                rowType === GridRowType.COMPACT_ROWS_WITH_DETAIL_PANE
                : false)
    };

    const columnsExpand = React.useMemo(
        () => [
            {
                // Build our expander column
                id: "expander", // Make sure it has an ID
                Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
                    <span {...getToggleAllRowsExpandedProps()}>
             {isAllRowsExpanded ? "👇" : "👉"}
           </span>
                ),
                Cell: ({row}) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
             {row.isExpanded ? "👇" : "👉"}
           </span>
                )
            },
            {
                Header: "Name",
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName"
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName"
                    }
                ]
            },
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Age",
                        accessor: "age"
                    },
                    {
                        Header: "Visits",
                        accessor: "visits"
                    },
                    {
                        Header: "Status",
                        accessor: "status"
                    },
                    {
                        Header: "Profile Progress",
                        accessor: "progress"
                    }
                ]
            }
        ],
        []
    );

    // @ts-nocheck
    const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest } : any, ref) => {
        const defaultRef = useRef();
        const resolvedRef : any = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }

        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" className="input-assumpte"  ref={resolvedRef} {...rest} />
                    <span className="reset-button">Reset Settings</span>
                </label>
            </div>
        );
    });

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // The useFilter Hook provides a way to set the filter
        allColumns, // Get all columns of the datagrid
        visibleColumns,
        state: {expanded},
        getToggleHideAllColumnsProps,
        resetResizing //Reset resizing of columns
    } = useTable({
            columns,
            columnsExpand,
            data,
            initialState: {pageIndex: 0,
                hiddenColumns: columns.filter(column => !column.show).map(column => column.Header)},
        },
        useFilters, // Adding the useFilters Hook to the table
        useSortBy,
        useExpanded,
        useBlockLayout,
        useResizeColumns
    );
    const [allValues, setIsChecked] = useState<any>([]);


    useEffect(() => {
        if (rows.length != 0) {
            setIsChecked(rows);
        }
    }, [rows]);

    const getColumnSelectionList = () => {
        if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }
        setOpen(!isOpen);
    }

    const handleDetailsPanel = (row, i) => {
        expandData = [
            {key: 'Device Description', value: data[i].deviceDescription},
            {key: 'Controller', value: data[i].controller},
            {key: 'Operational State', value: data[i].operationalState},
            {
                key: 'Block Size',
                value: data[i].blockSize
            },
            {key: 'Failure Predicted', value: data[i].failurePredicted},
            {key: 'Remaining Drive Life', value: data[i].remainingDriveLife},
            {key: 'Power Status', value: data[i].powerStatus},
            {key: 'Progress', value: data[i].progress},
            {
                key: 'Used RAID Disk space',
                value: data[i].usedRAIDDiskSpace
            },
            {
                key: 'Available RAID Disk space',
                value: data[i].availableRAIDDiskSpace
            },
            {
                key: 'Negotiated Speed',
                value: data[i].negotiatedSpeed
            },
            {
                key: 'Capable Speed',
                value: data[i].capableSpeed
            },
            {key: 'SAS Address', value: data[i].SASAddress},
            {key: 'Part Number', value: data[i].partNumber},
            {key: 'Manufacturer', value: data[i].manufacturer},
            {key: 'Product ID', value: data[i].productId},
            {key: 'Revision', value: data[i].revision},
            {key: 'Serial Number', value: data[i].serialNumber},
        ]


        setShowDetailData(expandData);
        setShowDetailPanelTitle(data[i].name)
        setDetailRowIndex(i);
        setShowDetailsPanel(true);
    }

    const getDetailPanel = () => {
        const detailPaneContent = props.detailPaneContent;
        return (
            <Card className='details-card'>
                <CardTitle>
                    <div className='title-container'>
                        <h2 className='title'>{showDetailPanelTitle}</h2>
                    </div>
                </CardTitle>
                <CardBlock>

                    <Table isNonBordered className='borderless-table'>
                        {detailPaneContent ? detailPaneContent :
                            <tbody>
                            {showDetailData?.map((item: any) => (
                                <tr key={item.key}>
                                    <td>{item.key}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        }
                    </Table>
                    <Button
                        primary
                        className='medium-button'
                        onClick={() => setShowDetailsPanel(false)}
                    >
                        {"Close"}
                    </Button>
                </CardBlock>
            </Card>
        )
    }

    const handleChangeSorting = (event) => {
        const {id, checked} = event.target;
        let tempSortValue;
        if (id === 'allSelect') {
            tempSortValue = allValues.map((val) => {
                return {...val, isChecked: checked}
            });
            setIsChecked(tempSortValue);
        } else {
            tempSortValue = allValues.map(val => val.id === id ? {...val, isChecked: checked} : val)
            setIsChecked(tempSortValue);
        }
    }
    const handleRadioSelect = (event) => {
        const {id, checked} = event.target;
        console.log(id, checked);
    }
    const renderRowSubComponent = React.useCallback(
        ({row}) => (
            <h3>
                my god, I can't belive I spent a whole afternoon reading the wrong stuff
            </h3>
        ),
        []
    );
    const designFilterTable = () => {
        return (
            <div className={"filter"}>
                    <div className={"table-css"} style={props.style}>
                        <table {...getTableProps()}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className={'csg-header'}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody {...getTableBodyProps()}  className={data.length !== 0 ? "table-body" : "empty-datagrid"}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className={'csg-row'}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                    </div>
            </div>

        );
    }
    const handleChangeSelect = () => {
        if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
            const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 215;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            settransformVal(transformVal);
        }

    }

    const closeFilter = () => {
        setIsFilterOpen(false);
    }
    const openFilter = () => {
        setIsFilterOpen(true);
    }

    const loadFilterIcon = () => {
        return (
            <div className="filter-icon" onClick={() => openFilter()}>
                {/*<img
            src="https://zeroheight-uploads.s3-accelerate.amazonaws.com/c7fba900e82a7c5dd07f7c?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA3AVNYHQK4QFFEFF5%2F20220805%2Feu-west-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20220805T080825Z&amp;X-Amz-Expires=86400&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=9966b1a038751cb05e171ef0f0115705b5f292ee94e487d88e09f471fd2411e7"
            alt="" height="32px" width="32px"
            className=" white-background max-full-height max-full-width spec-shadow"/>*/}

                <Icon shape={"filter"}/>
                {/*<img
              src="https://zeroheight-uploads.s3-accelerate.amazonaws.com/9e90a51bbf649788467df3?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA3AVNYHQK4QFFEFF5%2F20220805%2Feu-west-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20220805T080736Z&amp;X-Amz-Expires=86400&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=52e193e255e9dccefe2bdd6c32257cb318226c841c9004e26f7a14f3d7c834ff"
              alt="" height="32" width="32"
              className=" white-background max-full-height max-full-width spec-shadow" onClick={()=>openFilter()}/>*/}
            </div>
        )
    }

  /*  const [sentryRef,{ rootRef }] = useInfiniteScroll({
        loading: state.loading,
        hasNextPage: true,
      onLoadMore: fetchMoreData
    });*/

    return (
        <div>
            {props.isFilter && loadFilterIcon()}
            {props.isFilter &&
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10 col-md-10 col-lg-9">
                        {designFilterTable()}
                    </div>
                    {isFilterOpen &&
                        <div className="col-sm-2 col-md-2 col-lg-3">
                            <div className='filter-pane'>
                                <FilterPanel data={filterData} onChange={filterFunction} onClose={() => closeFilter()}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
            }

            <div className='clr-row flex-container'>
                {isOpen &&
                    <div
                        className="column-switch clr-popover-content"
                        ref={refChild}
                        role="dialog"
                        style={{
                            top: 0,
                            bottom: "auto",
                            right: "auto",
                            left: 0,
                            transform: transformVal,
                        }}>
                        <div className="ColumnSelect" >
                            <span className="ColumnSelect-header">Column Picker</span>

                            {allColumns.map((column) =>
                                    <div key={column.id}>

                                        <label>
                                            { column.Header !== defaultColumnHeader &&
                                                <><input type='checkbox' onClick={handleChangeSelect} id="allColumnSelect" {...column.getToggleHiddenProps()} />
                                                    <span className="ColumnSelect-header-names">{column.Header}
                          </span></>
                                            }
                                        </label>

                                    </div>

                            )}
                        </div>
                        <div className="ColumnSelect-reset-button">
                            <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                        </div>
                    </div>
                }

                { !props.isFilter && <div id="scrollableDiv"  className="scroll-div table-css" style={props.style} >
                    <div  className={showDetailsPanel && detailPanelShow ? "detailPanelCSS" : 'clr-col-12'}>
                        <table {...getTableProps()}  ref={refParent}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}
                                    className={'csg-header'}>
                                    {props.expandable ? <th/> : null}
                                    {selectionType === GridSelectionType.MULTI &&
                                        <th scope="col">
                                            <div className="dds__checkbox dds__checkbox--sm">
                                                <label className="dds__checkbox__label" htmlFor="sm-rad">
                                                    <input type="checkbox" id="allSelect"
                                                           className="dds__checkbox__input"
                                                           checked={allValues.filter(value => value?.isChecked !== true).length < 1}
                                                           onChange={handleChangeSorting}/>
                                                </label>
                                            </div>
                                        </th>
                                    }
                                    {selectionType === GridSelectionType.SINGLE &&
                                        <th>

                                        </th>
                                    }
                                    {headerGroup.headers.map(column => (

                                        <th {...column.getHeaderProps(props.sorting ? column.getSortByToggleProps() : "")}>
                                            <div ref={refSetting}  className="header-cell">
                                                {column.render("Header")}
                                                <span className="">
                                                  {column.isSorted
                                                      ? column.isSortedDesc
                                                          ? <div className="">
                                                              <Icon shape={"arrow down"}/>
                                                          </div>
                                                          :
                                                          <Icon shape={"arrow up"}/>
                                                      /*<div className=""><img
                                                              src="https://dds.dell.com/svgs/2.4.0/dds__icon--arrow-up.svg"
                                                              height="32px" width="32px" alt="dds__icon--arrow-up"/>
                                                          </div>*/
                                                      : ''
                                                  }
                                              </span>
                                            </div>
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${
                                                    column.isResizing ? 'isResizing' : '' }`}
                                            > </div>
                                        </th>

                                    ))}
                                    { columnSelect && <th >
                                        <Button link onClick={() => getColumnSelectionList()} icon={{shape: "settings", className:"is-solid" }}/>
                                    </th> }
                                </tr>
                            ))}
                            </thead>
                          {/*  <InfiniteScroll
                                dataLength={rows.length}
                                next={fetchMoreData}
                                hasMore={!!fetchMoreData}
                                height={550}
                                loader={<h5>Loading...</h5>}
                                scrollableTarget="scrollableDiv"
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                            <b> </b>
                                     </p>
                              }
                           >*/}
                                { allValues.length !== 0 ? <tbody {...getTableBodyProps()} className={"table-body" }>

                                    { allValues.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} onClick={() => detailPanelShow ? handleDetailsPanel(row,i) : ''} className={'csg-row'}>
                                                {selectionType === GridSelectionType.MULTI &&
                                                    <th scope={row}>
                                                        <div className="dds__checkbox dds__checkbox--sm">
                                                            <label className="dds__checkbox__label" htmlFor="sm-rad">
                                                                <input type="checkbox" id={row.id}
                                                                       className="dds__checkbox__input"
                                                                       onChange={handleChangeSorting}
                                                                       checked={row?.isChecked || false}/>
                                                            </label>
                                                        </div>
                                                    </th>
                                                }
                                                {selectionType === GridSelectionType.SINGLE &&
                                                    <th>
                                                        <div className="dds__radio-button dds__radio-button--sm">
                                                            <input className="dds__radio-button__input" type="radio"
                                                                   name="name-650298779"
                                                                   id="radio-button-control-426423994" value={row}
                                                                   onChange={handleRadioSelect}/>
                                                        </div>
                                                    </th>
                                                }
                                                {props.expandable ? <td className="expansion-column"
                                                                        {...row.getRowProps(row.getToggleRowExpandedProps())}>
                                                    {<div
                                                        className={row.isExpanded ? "expansion-icon expanded" : "expansion-icon"}>
                                                        <tr>
                                                            <td colSpan={visibleColumns.length}>

                                                                {renderRowSubComponent({row})}
                                                            </td>
                                                        </tr>
                                                        <Icon shape={"arrow right"}/>
                                                    </div>}

                                                </td> : null}
                                                {row.cells.map(cell => {
                                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                                })}
                                                <td/>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                    :
                                    (<div style={{ textAlign: 'center', paddingTop: "210px" }}>
                                        <div className="datagrid-placeholder-container ng-star-inserted">
                                            <div className="datagrid-placeholder datagrid-empty clr-align-items-center clr-justify-content-center">
                                                <div className="datagrid-placeholder-image ng-star-inserted"/>
                                                No items found!
                                            </div>
                                        </div></div>)}
                      {/*  </InfiniteScroll>*/}
                        </table>
                    </div>
                </div> }
                <div className={showDetailsPanel ? 'clr-col-4' : ''}>
                    {showDetailsPanel && showDetailData !== undefined &&
                        <div className='details-pane'>
                            {getDetailPanel()}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default DataGridWithInfiniteScroll;
