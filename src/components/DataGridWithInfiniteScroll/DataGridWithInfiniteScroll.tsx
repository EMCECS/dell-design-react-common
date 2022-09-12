/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { Button } from "@dellstorage/clarity-react/forms/button";
import { Icon } from "@dellstorage/clarity-react/icon/Icon";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
    Cell,
    HeaderGroup,
    Row,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    useTable,
} from "react-table";
import { Card, CardBlock, CardTitle } from "@dellstorage/clarity-react/cards";
import { Table } from "@dellstorage/clarity-react/tables";
import FilterPanel from "components/DataGridWithInfiniteScroll/FilterPanel";
import filter from "assets/images/filter.svg";
import filterOpen from "assets/images/filter-solid.svg";
import emptyDatagrid from "assets/images/emptyDatagrid.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Spinner,
    SpinnerSize,
} from "@dellstorage/clarity-react/spinner/Spinner";
import { Constants } from "components/DataGridWithInfiniteScroll/Constants";

/**
 * General component description :
 * DataGridWithInfiniteScroll :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */


/**
 * TODO:
 * Type Any need to be changes to specific types while writing wrappers for props.
 */

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

/**
 * type for DataGridRow :
 * @param {rowData} row data
 * @param {rowID} unique ID to identify row
 * @param {isSelected} set to true if row is selected
 * @param {className} CSS class name
 * @param {style} CSS style
 * @param {expandableRowData} Expandable row content
 */

export type DataGridRow = {
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    disableRowSelection?: boolean;
    expandableRowData?: ExpandableRowDetails;
};
/**
 * type for datagrid expandable row data :
 * @param {isLoading} if true then show loading icon for expandable row
 * @param {onRowExpand} callback function to  fetch expandable row contents
 * @param {onRowContract} callback function for additional logic after row contracts
 * @param {expandableContent} content to show after row expand
 * @param {isExpanded} true if row is already expanded
 * @param {hideRowExpandIcon} if true then hide icon for expandable row
 */
export type ExpandableRowDetails = {
    isLoading?: boolean;
    onRowExpand?: (row: DataGridRow) => Promise<any>;
    onRowContract?: (row: DataGridRow) => void;
    expandableContent?: any;
    isExpanded?: boolean;
    hideRowExpandIcon?: boolean;
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
    sortFunction: (
        rows: DataGridRow[],
        order: SortOrder,
        columnName: string
    ) => Promise<DataGridRow[]>;
    isSorted?: boolean;
    hideSort?: boolean;
};

/**
 * type for datagrid row detail pane data :
 * @param {title} title for detail pane
 * @param {columnNames} ColumnNames is for detail panel column display
 * @param {detailPaneContentJSON} detailPaneContentJSON  to fetch row detail pane contents in JSON
 */
export type DetailPaneData = {
    title?: any;
    columnNames?: any;
    detailPaneContentJSON: any;
};

/**
 * @param {className} CSS class names
 * @param {style} CSS styles
 * @param {id} unique ID for datagrid
 * @param {rows} rows data
 * @param {columns} column details
 * @param {selectionType} row selection type that is multi or single
 * @param {rowType} Expandable or compact row type
 * @param {isSorting} if true, sorting on datagrid will appear else not
 * @param {isFilter} if true, Filter panel will appear else not
 * @param {showColumnSelect} showColumnSelect is boolean value if true,column can be show or hide
 * @param {detailDataProps} detailDataProps is to get the data for detail panel in key value format
 * @param {detailPaneContent} detailPaneContent is to display funtion in detail panel instean of key value
 * @param {showDetailPanel} if true, detail panel on datagrid will appear else not
 * @param {defaultColumnHeader} defaultColumnHeader is to set one default column on Column Show Hide functionality to show that column on DataGrid
 * @param {filterData} filterData is set of html components which can be shown in Filter Panel.
 * @param {getInfiniteScrollData} getInfiniteScrollData to get the data from function calling the infinite data
 * @param {fetchMoreData} fetchMoreData will fetch next set of record in Infinite Scroll once user is end of the page
 * @param {datagridBodyHeight}  is fixed height for the body of the datagrid
 * @param {isLoading} if true then show loading icon for expandable row
 * @param {callbackForColumnName} callback function to send columnName which user had clicked for sorting
 * @param {loadingMessage} message to be passed while the infinite scroll loads nect data

 */

type DataGridProps = {
    className?: string;
    style?: any;
    id?: string;
    rows?: Array<object>;
    columns: any;
    selectionType?: GridSelectionType;
    rowType?: GridRowType;
    isSorting?: boolean;
    isFilter?: boolean;
    expandable?: boolean;
    showColumnSelect?: boolean;
    detailDataProps?: DetailPaneData;
    detailPaneContent?: any;
    showDetailPanel?: boolean;
    defaultColumnHeader?: string;
    filterData?: any;
    getInfiniteScrollData?: any;
    fetchMoreData?: any;
    datagridBodyHeight?: string;
    isLoading?: boolean;
    callbackForColumnName?: Function;
    loadingMessage?: string;
};

const DataGridWithInfiniteScroll = (props: DataGridProps) => {
    const data: Array<object> = props?.rows ? props?.rows : [];
    const {
        columns,
        selectionType,
        isLoading,
        filterData,
        getInfiniteScrollData,
        datagridBodyHeight,
        fetchMoreData,
        loadingMessage,
    } = props;
    const callbackForColumnName: any = props?.callbackForColumnName;
    const [infiniteScrollData, setinfiniteScrollData] = useState(
        getInfiniteScrollData
    );
    const showColumnSelect: boolean = props?.showColumnSelect
        ? props?.showColumnSelect
        : false;
    const detailDataProps: DetailPaneData | undefined = props?.detailDataProps;
    const defaultColumnHeader: string | undefined = props?.defaultColumnHeader;
    const showDetailPanel: boolean = props?.showDetailPanel
        ? props?.showDetailPanel
        : false;
    const refParent: any = useRef();
    const refChild: any = useRef();
    const refSetting: any = useRef();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [transformVal, settransformVal] = useState<any>(
        "translateX(0px) translateY(0px)"
    );
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false);
    const [, setDetailRowIndex] = useState<number>();
    const [showDetailData, setShowDetailData] =
        useState<{ key: string; value: "" }[]>();
    const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>();
    let expandData: { key: string; value: any }[] = [{ key: "", value: "" }];
    const rowType: any = props.rowType;
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    useEffect(() => {
        if (
            refParent.current !== null &&
            refParent.current !== undefined &&
            refChild.current !== undefined &&
            refChild.current !== null
        ) {
            refParent.current = refParent.current.getClientRects()[0];
            refChild.current = refChild.current.getClientRects()[0];
        }
    }, []);

    useEffect(() => {
        returnPositionColumnSelectionDropdown();
    }, [
        refParent?.current?.getClientRects()[0]?.width,
        refParent?.current?.clientWidth,
    ]);

    useEffect(() => {
        returnPositionColumnSelectionDropdown();
    }, [refParent?.current?.getClientRects()[0]?.width]);

    /**
     * This funtion is to get the Reset Setting for column selection, which shows all the columns
     */
    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }: any, ref) => {
            const defaultRef = useRef();
            const resolvedRef: any = ref || defaultRef;

            useEffect(() => {
                returnPositionColumnSelectionDropdown();
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            returnPositionColumnSelectionDropdown();
            return (
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            className="input-assumpte"
                            ref={resolvedRef}
                            {...rest}
                        />
                        <span className="reset-button">{Constants.RESET_SETTINGS}</span>
                    </label>
                </div>
            );
        }
    );

    /**
     * @param {getTableProps} is a function to resolve any props needed by the react table wrapper.
     * @param {getTableBodyProps } to render table body of react table
     * @param {headerGroups } return headers which is going to be the headers of the table
     * @param {rows} display rows of the datagrid
     * @param {allColumns} display all columns of the datagrid
     * @param {prepareRow} is a function that must be called on any row to be displayed. It is responsible for preparing a row for rendering.
     * @param {getToggleHideAllColumnsProps} If datagrid have hide show column functionality
     * @param {useSortBy} to add sorting functionality on datagrid
     * @param {useResizeColumns} this is default functionality of react table to provide column resize
     * @param {useTable } hook takes options and plugins to build a table instance. The basic options are columns and row data.
     * @param {useBlockLayout }is a react-table plugin hook that adds support for headers and cells to be rendered as inline-block divs (or other non-table elements) with explicit width.
     * @param {getSortByToggleProps } getSortByToggleProps() is a function that resolves any props needed while toggling the sort direction.
     */
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        allColumns,
        prepareRow,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        useBlockLayout,
        useResizeColumns
    );

    const [allValues, setIsChecked] = useState<any>([]);
    useEffect(() => {
        if (rows.length !== 0) {
            setIsChecked(rows);
        }
    }, [rows]);

    /**
     * returnPositionColumnSelectionDropdown function
     * This function returns the positions of the column selection dropdown as the table size varies (columns hidden/shown)
     */
    const returnPositionColumnSelectionDropdown = () => {
        if (
            refParent.current !== null &&
            refParent.current !== undefined &&
            refChild.current !== undefined &&
            refChild.current !== null
        ) {
            const HideShowColumnsMenuTop =
                refParent.current.getClientRects()[0].top +
                Constants.COLUMN_SELECTION_MENU_TOP;
            const HideShowColumnsMenuLeft =
                refParent.current.getClientRects()[0].width -
                Constants.COLUMN_SELECTION_MENU_LEFT;
            const transformVal =
                "translateX(" +
                HideShowColumnsMenuLeft +
                "px) " +
                "translateY(" +
                HideShowColumnsMenuTop +
                "px)";
            settransformVal(transformVal);
        }
    };

    /**
     * getColumnSelectionList function
     * This function is called on setting icon, to open the column selection dropdown
     */
    const getColumnSelectionList = () => {
        returnPositionColumnSelectionDropdown();
        setOpen(!isOpen);
    };

    /**
     * handleDetailsPanel function
     * This function returns the details for detail panel content
     */
    const handleDetailsPanel = (row: Row, i: number) => {
        let detailPanelKeys = Object.keys(detailDataProps?.columnNames);
        for (let j = 0; j < detailPanelKeys.length; j++) {
            let keyValue = {
                key: detailDataProps?.columnNames[detailPanelKeys[j]],
                value: String(
                    detailDataProps?.detailPaneContentJSON[i][detailPanelKeys[j]]
                ),
            };
            expandData.push(keyValue);
        }
        setShowDetailData(expandData);
        setShowDetailPanelTitle(
            detailDataProps?.detailPaneContentJSON[i][detailDataProps?.title]
        );
        setDetailRowIndex(i);
        setShowDetailsPanel(true);
    };

    /**
     * This function is to return a panel (Box) of detail panel component
     */
    const getDetailPanel = () => {
        const detailPaneContent = props.detailPaneContent;
        return (
            <Card className="details-card">
                <CardTitle>
                    <div className="title-container">
                        <h2 className="title">{showDetailPanelTitle}</h2>
                    </div>
                </CardTitle>
                <CardBlock>
                    {detailPaneContent ? (
                        detailPaneContent()
                    ) : (
                        <Table isNonBordered className="borderless-table">
                            <tbody>
                            {showDetailData?.map((item: { key: string; value: "" }) => (
                                <tr key={item.key}>
                                    <td>{item.key}</td>
                                    <td className="value-width">{item.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                    <Button
                        primary
                        className="medium-button"
                        onClick={() => setShowDetailsPanel(false)}
                    >
                        {Constants.CLOSE}
                    </Button>
                </CardBlock>
            </Card>
        );
    };

    /**
     * handleMultiSelect function is to handle the multi select functionality
     *
     */
    const handleMultiSelect = (event: any) => {
        const { id, checked } = event.target;
        let tempSortValue;
        if (id === Constants.ID_FOR_SORTING) {
            tempSortValue = allValues.map((val: any) => {
                return { ...val, isChecked: checked };
            });
            setIsChecked(tempSortValue);
        } else {
            tempSortValue = allValues.map((val: any) =>
                val.id === id ? { ...val, isChecked: checked } : val
            );
            setIsChecked(tempSortValue);
        }
    };

    /**
     * This function is to handle the single select functionality
     *
     */
    const handleRadioSelection = (value: Row) => {
        return value;
    };

    /**
     *  handleColumnSelectionChange function is to position the column selection dropdown after selecting/deselecting the column
     */
    const handleColumnSelectionChange = () => {
        returnPositionColumnSelectionDropdown();
    };

    /*Function to close Filter Panel*/
    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    /* Function to Open Filter Panel*/
    const openFilter = () => {
        setIsFilterOpen(true);
    };

    /**
     * This function returns the filter icon on the top to open the filter panel
     */
    const loadFilterIcon = () => {
        return (
            <div
                className={isFilterOpen ? "filter-open" : "filter-icon"}
                onClick={() => openFilter()}
            >
                {isFilterOpen ? (
                    <img src={filterOpen} alt={filterOpen} />
                ) : (
                    <img src={filter} alt={filter} />
                )}
            </div>
        );
    };

    /*Function to display multiselect Header*/
    const renderMultiSelectDataGridHeader = () => {
        return (
            <th scope="col">
                <div>
                    <label>
                        <input
                            type="checkbox"
                            id="allSelect"
                            checked={
                                allValues.filter((value: any) => value?.isChecked !== true)
                                    .length < 1
                            }
                            onChange={handleMultiSelect}
                        />
                    </label>
                </div>
            </th>
        );
    };

    /*Function to display multiselect rows*/
    const renderMultiSelectDataGridRow = (row: any) => {
        return (
            <th scope={row}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            id={row.id}
                            onChange={handleMultiSelect}
                            checked={row?.isChecked || false}
                        />
                    </label>
                </div>
            </th>
        );
    };

    /*Function to render Single Select Row*/
    const renderSingleSelectDataGridRow = (row: any) => {
        return (
            <th>
                <div>
                    <input
                        type="radio"
                        name="radio-group"
                        id="radio-button-control"
                        value={row}
                        onClick={() => handleRadioSelection(row)}
                    />
                </div>
            </th>
        );
    };

    /**
     * renderEmptyDatagrid function returns the empty datagrid message and images in the table body
     *
     */
    const renderEmptyDatagrid = () => {
        return (
            <div className="empty-datagrid-style">
                <div className="datagrid-placeholder-container">
                    <div className="datagrid-placeholder datagrid-empty clr-align-items-center clr-justify-content-center">
                        <div />
                        <img src={emptyDatagrid} alt={emptyDatagrid} />
                        {Constants.EMPTY_DATA_GRID_NO_ITEMS_FOUND}
                    </div>
                </div>
            </div>
        );
    };

    /**
     * renderColumnSelection function returns the column selection
     */
    const renderColumnSelection = () => {
        return (
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
                }}
            >
                <div className="ColumnSelect">
                    <span className="ColumnSelect-header">{Constants.COLUMN_PICKER}</span>

                    {allColumns.map((column: any) => (
                        <div key={column.id}>
                            <label>
                                {column.Header !== defaultColumnHeader && (
                                    <>
                                        <input
                                            type="checkbox"
                                            onClick={handleColumnSelectionChange}
                                            id="allColumnSelect"
                                            {...column.getToggleHiddenProps()}
                                        />
                                        <span className="ColumnSelect-header-names">
                      {column.Header}
                    </span>
                                    </>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="ColumnSelect-reset-button">
                    <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                </div>
            </div>
        );
    };

    /**
     * renderSorting returns the sorting icon on the column where sorting is called.
     */
    const renderSorting = (column: any) => {
        return (
            <div ref={refSetting} className="header-cell">
                {column.render("Header")}
                <span className="">
          {column.isSorted ? (
              column.isSortedDesc ? (
                  <div className="">
                      <Icon shape={"arrow down"} />
                  </div>
              ) : (
                  <Icon shape={"arrow up"} />
              )
          ) : (
              ""
          )}
        </span>
            </div>
        );
    };

    /**
     * This function is to return the filter panel when clicked on filter icon
     */
    const displayFilterPanel = () => {
        return (
            <div className="col-sm-2 col-md-2 col-lg-3">
                <div className="filter-pane">
                    <FilterPanel
                        data={filterData}
                        title="Filters"
                        onClose={() => closeFilter()}
                    />
                </div>
            </div>
        );
    };

    /**
     * This function is to return detail panel
     */
    const displayDetailPanel = () => {
        return (
            <div className={showDetailsPanel ? "clr-col-4" : ""}>
                <div className="details-pane">{getDetailPanel()}</div>
            </div>
        );
    };

    return (
        <div>
            {isLoading ? (
                <Spinner size={SpinnerSize.SMALL} />
            ) : (
                <div className={props.isFilter ? "" : "clr-row flex-container"}>
                    {isOpen && renderColumnSelection()}
                    {props.isFilter && loadFilterIcon()}
                    <div
                        id="scrollableDiv"
                        className={
                            props.isFilter ? "container-fluid" : "scroll-div table-css"
                        }
                    >
                        <div
                            className={
                                showDetailsPanel && showDetailPanel
                                    ? "detailPanelCSS"
                                    : "clr-col-12" || props.isFilter
                                        ? "row"
                                        : "clr-col-12"
                            }
                        >
                            <div
                                className={
                                    isFilterOpen ? "col-sm-10 col-md-10 col-lg-9" : "clr-col-12"
                                }
                            >
                                <div
                                    className={
                                        props.isFilter
                                            ? "table-css table-responsive filter-table"
                                            : ""
                                    }
                                >
                                    <table
                                        {...getTableProps()}
                                        ref={refParent}
                                        style={props.style}
                                    >
                                        <thead>
                                        {headerGroups.map((headerGroup: HeaderGroup) => (
                                            <tr
                                                {...headerGroup.getHeaderGroupProps()}
                                                className={"csg-header"}
                                            >
                                                {props.expandable ? <th /> : null}
                                                {selectionType === GridSelectionType.MULTI &&
                                                    renderMultiSelectDataGridHeader()}
                                                {selectionType === GridSelectionType.SINGLE && <th />}
                                                {headerGroup.headers.map((column: any) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            props.isSorting
                                                                ? column.getSortByToggleProps()
                                                                : ""
                                                        )}
                                                        onClick={(e) => {
                                                            if (props.isSorting) {
                                                                //trigger the react-table header onClick manually
                                                                column
                                                                    .getHeaderProps(
                                                                        column.getSortByToggleProps()
                                                                    )
                                                                    .onClick(e);

                                                                //Our Custom onclick functionality to pass columnName
                                                                callbackForColumnName(column);
                                                            }
                                                        }}
                                                    >
                                                        {renderSorting(column)}
                                                        <div
                                                            {...column.getResizerProps()}
                                                            className={`resizer ${
                                                                column.isResizing ? "isResizing" : ""
                                                            }`}
                                                        />
                                                    </th>
                                                ))}
                                                {showColumnSelect && (
                                                    <th>
                                                        <Button
                                                            link
                                                            onClick={() => getColumnSelectionList()}
                                                            icon={{
                                                                shape: "settings",
                                                                className: "is-solid",
                                                            }}
                                                        />
                                                    </th>
                                                )}
                                            </tr>
                                        ))}
                                        </thead>

                                        <InfiniteScroll
                                            dataLength={rows.length}
                                            next={fetchMoreData}
                                            hasMore={!!fetchMoreData}
                                            height={
                                                datagridBodyHeight
                                                    ? datagridBodyHeight
                                                    : Constants.DEFAULT_DATAGRID_BODY_HEIGHT
                                            }
                                            loader={<h5>{loadingMessage ? loadingMessage : Constants.DEFAULT_LOADING_INFINITE_SCROLL_TEXT}</h5>}
                                            scrollableTarget="scrollableDiv"
                                            endMessage={
                                                <p className={"infinite-scroll-end-message"}>
                                                    <b> </b>
                                                </p>
                                            }
                                        >
                                            {allValues.length !== 0 ? (
                                                <tbody
                                                    {...getTableBodyProps()}
                                                    className={"table-body"}
                                                >
                                                {allValues.map((row: Row, i: number) => {
                                                    prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically
                                                    return (
                                                        <tr
                                                            {...row.getRowProps()}
                                                            onClick={() =>
                                                                showDetailPanel
                                                                    ? handleDetailsPanel(row, i)
                                                                    : ""
                                                            }
                                                            className={"csg-row"}
                                                        >
                                                            {selectionType === GridSelectionType.MULTI &&
                                                                renderMultiSelectDataGridRow(row)}
                                                            {selectionType === GridSelectionType.SINGLE &&
                                                                renderSingleSelectDataGridRow(row)}
                                                            {row.cells.map((cell: Cell) => {
                                                                return (
                                                                    <td {...cell.getCellProps()}>
                                                                        {cell.render("Cell")}
                                                                    </td>
                                                                );
                                                            })}
                                                            <td />
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            ) : (
                                                renderEmptyDatagrid()
                                            )}
                                        </InfiniteScroll>
                                    </table>
                                </div>
                            </div>
                            {isFilterOpen && displayFilterPanel()}
                        </div>
                    </div>
                    {showDetailsPanel &&
                        showDetailData !== undefined &&
                        displayDetailPanel()}
                </div>
            )}
        </div>
    );
};
export default DataGridWithInfiniteScroll;
