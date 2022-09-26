/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import {useRef,useState, forwardRef, useEffect} from "react";
import { Button } from "@dellstorage/clarity-react/forms/button";
import {useTable, Column,useRowSelect, Hooks,useSortBy} from "react-table";
import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
import {Constants} from "components/DataGridWithInfiniteScroll/Constants";
import {CheckBox} from "@dellstorage/clarity-react/forms/checkbox/CheckBox";
import {Icon} from "@dellstorage/clarity-react/icon";
import filter from "assets/filter.svg";
import filterOpen from "assets/filter-solid.svg";
import emptyDatagrid from "assets/emptyDatagrid.svg";
import { Card, CardBlock, CardTitle } from "@dellstorage/clarity-react/cards";
import CloseButton from "react-bootstrap/CloseButton";
import { Table } from "@dellstorage/clarity-react/tables";

/**
 * General component description :
 * DataGridWithInfiniteScroll :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}

/**
 * type for datagrid row detail pane data :
 * @param {title} title for detail pane
 * @param {columnNames} ColumnNames is for detail panel column display
 * @param {detailPaneContentJSON} detailPaneContentJSON  to fetch row detail pane contents in JSON
 */
    type DetailPaneData = {
    title?: any; // TODO : Change "any" to specific type while writing wrappers
    columnNames?: any; // TODO : Change "any" to specific type while writing wrappers
    detailPaneContentJSON: any; // TODO : Change "any" to specific type while writing wrappers
};


/**
 * @param {rows} rows data
 * @param {columns} column details
 * @param {className} CSS class names
 * @param {style} to add custom CSS styles
 * @param {isLoading} if true then show loading icon before table is rendered
 * @param {className} is to get a custom class to be applied or else default class is applied.
 * @param {showColumnSelect} showColumnSelect is boolean value if true,column can be show or hide
 * @param {defaultColumnHeader} defaultColumnHeader is to set one default
 * @param {detailDataProps} detailDataProps is to get the data for detail panel in key value format
 * @param {detailPaneContent} detailPaneContent is to display funtion in detail panel instean of key value
 * @param {showDetailPanel} if true, detail panel on datagrid will appear else not
 */
type DataGridProps = {
    rows: {[key: string]: any}[];
    columns: Column<{[key: string]: any}>[];
    style?: any;
    isLoading?: boolean;
    className?:string;
    selectionType?: GridSelectionType;
    isSorting?:boolean;
    isFilter?:boolean;
    filterData?:any;
    showColumnSelect?: boolean;
    defaultColumnHeader?: string;
    detailDataProps?: DetailPaneData;
    detailPaneContent?: any; // TODO : Change "any" to specific type while writing wrappers
    showDetailPanel?: boolean;
};

function DataGridWithInfiniteScroll(props: DataGridProps) {
    const {style, isLoading, columns, className,selectionType,isSorting,isFilter,filterData} = props;
    const refSetting: any = useRef();
    const data = props.rows;
    const detailPaneContent = props?.detailPaneContent;
    const detailDataProps: DetailPaneData | undefined = props?.detailDataProps;
    const showDetailPanel = props?.showDetailPanel
    const [isFilterOpen, toggleFilter] = useState<boolean>(false);
    const showColumnSelect = props?.showColumnSelect;
    const defaultColumnHeader  = props?.defaultColumnHeader;
    const [isOpen, setOpen] = useState<boolean>(false);
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false);
    const [, setDetailRowIndex] = useState<number>();
    const [showDetailData, setShowDetailData] =
        useState<{ key: string; value: "" }[]>();
    const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>();
    let expandData: { key: string; value: any }[] = [{ key: "", value: "" }]; // TODO : Change "any" to specific type while writing wrappers

    const tableHooks = (hooks: Hooks) => {
        if (selectionType === GridSelectionType.MULTI) {
            hooks.visibleColumns.push((columns: Column<{[key: string]: any}>[]) => [
                {
                    id: Constants.ID_FOR_MULTI_SELECT,
                    Header: ({getToggleAllRowsSelectedProps}: Hooks) => (
                        <CheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({row}: Hooks) => <CheckBox {...row.getToggleRowSelectedProps()} />,
                },
                ...columns,
            ]);
        }
    };
    /**
     * @param {getTableProps} is a function to resolve any props needed by the react table wrapper.
     * @param {getTableBodyProps } to render table body of react table
     * @param {headerGroups } return headers which is going to be the headers of the table
     * @param {rows} display rows of the datagrid
     * @param {prepareRow} is a function that must be called on any row to be displayed. It is responsible for preparing a row for rendering.
     * @param {useTable } hook takes options and plugins to build a table instance. The basic options are columns and row data
     */
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns, getToggleHideAllColumnsProps} = useTable({
        columns,
        data,
    },
        tableHooks,
        useSortBy,
        useRowSelect,
        );
    
    const [allValues, setIsChecked] = useState<any>([]); // TODO : Change "any" to specific type while writing wrappers
        useEffect(() => {
         if (rows.length !== 0) {
          setIsChecked(rows);
         }
        }, [rows]);

    /**
  * handleDetailsPanel function
  * This function returns the details for detail panel content
  */
 const handleDetailsPanel = (row: any, index: number) => {
    let detailPanelKeys = Object.keys(detailDataProps?.columnNames);
    for (let j = 0; j < detailPanelKeys.length; j++) {
     let keyValue = {
      key: detailDataProps?.columnNames[detailPanelKeys[j]],
      value: String(
          detailDataProps?.detailPaneContentJSON[index][detailPanelKeys[j]]
      ),
     };
     expandData.push(keyValue);
    }
    setShowDetailData(expandData);
    setShowDetailPanelTitle(
        detailDataProps?.detailPaneContentJSON[index][detailDataProps?.title]
    );
    setDetailRowIndex(index);
    setShowDetailsPanel(true);
   };

   /**
    * This function is to return a panel (Box) of detail panel component
    */
   const getDetailPanel = () => {
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
     * Function to render react table Header
     * @param {getHeaderGroupProps} to map the headerGroups to show the individual <tr> by getting the getHeaderGroupProps()
     * @param {render}  spread the column prop along with its equivalent getHeaderProps() function. render() function takes in a string “Header” that will act as a reference when we will structure our data.
     */
    /*Function to close Filter Panel*/
    const closeFilter = () => {
        toggleFilter(false);
    };

    /* Function to Open Filter Panel*/
    const openFilter = () => {
        toggleFilter(true);
    };

    const renderSorting = (column: any) => {
        return (<div ref={refSetting} className="header-cell">
                {column.render("Header")}
                <span className="">
                 {column.isSorted && (column.isSortedDesc ? (
                         <Icon shape={"arrow down"}/>
                     ) : (<Icon shape={"arrow up"}/>))}
        </span>
            </div>);
    };
    /*Function to render Single Select Row*/
    const renderSingleSelectDataGridRow = (row: any) => {
        return (
            <th>
                    <input
                        type="radio"
                        name={Constants.DEFAULT_RADIO_GROUP_NAME}
                        value={row}
                    />
            </th>
        );
    };
    const renderTableHeader = () => {
        return (
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {selectionType === GridSelectionType.SINGLE && <th />}
                    {headerGroup.headers.map((column:any) => (
                        <th {...column.getHeaderProps(isSorting?column.getSortByToggleProps():'')}
                            onClick={() => isSorting ? column.toggleSortBy(!column.isSortedDesc):''}
                        >
                            {isSorting?renderSorting(column):''}
                            {!isSorting?column.render(Constants.DEFAULT_COLUMN_HEADER):''}
                            <div className={"datagrid-column-separator"} />
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
        );
    };

    /**
     * Function to render react table Row
     * @param {cell.getCellProps} Return an array of prop objects and react-table will merge them appropriately
     * @param {cell.render } function takes in a string “Cell” that will act as a reference when we will structure our data.
     */
    const renderTableRow = () => {
        return (
            <tbody {...getTableBodyProps()} className={className}>
            {rows.map((row,index) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} onClick={() =>
                        showDetailPanel
                            ? handleDetailsPanel(row, index)
                            : ""
                    }>
                        {selectionType === GridSelectionType.SINGLE &&
                            renderSingleSelectDataGridRow(row)}
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render(Constants.DEFAULT_CELL_VALUE)}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        );
    };

    /**
  * This function is to return detail panel
  */
 const displayDetailPanel = () => {
    return (
        // <div className={showDetailsPanel ? "clr-col-4" : ""}>
         <div className="details-pane">{getDetailPanel()}</div>
        // </div>
    );
   };

const showFilterIcon =()=>{
    return(
        <div
            className={"filter-icon"}
            onClick={() => openFilter()}
        >
            {isFilterOpen ? (
                <img src={filterOpen} alt={filterOpen} />
            ) : (
                <img src={filter} alt={filter} />
            )}
        </div>
    )
}
    const displayFilterPanel = () => {
        return (
            <div className="col-sm-2 col-md-2 col-lg-3">
                <div className="filter-panel">
                    <section className={"filter_header"}>
                        {Constants.DEFAULT_FILTER_TITLE}
                        <span  onClick={() => closeFilter()} className={"align-close-icon"}>
                        <Icon shape={"window-close"}/>
                        </span>
                    </section>
                    <div className="filter_divider"/>
                   <div className="filter-item-container">{filterData}</div>
                </div>
            </div>
        );
    };

    // This funtion is to get the Reset Setting for column selection, which shows all the columns
    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }: any, ref) => {
        //Can not change any type, as this are in built func
        const defaultRef = useRef();
        const resolvedRef: any = ref || defaultRef; // TODO : Change "any" to specific type while writing wrappers

        useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);
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

    //RenderColumnSelection function returns the column selection 
    const renderColumnSelection = () => {
        const toggleHideAllColumnProps : any = {...getToggleHideAllColumnsProps()};
        return (
            <div className="column-switch clr-popover-content column-select-popup">
              <div className="ColumnSelect">
                <span className="ColumnSelect-header">{Constants.COLUMN_PICKER}</span>
    
                    {allColumns.map(
                        (
                            column: any // TODO : Change "any" to specific type while writing wrappers
                        ) => (
                            <div key={column.id}>
                            {column.Header !== defaultColumnHeader && 
                            (
                            <label>
                                    <input type="checkbox" id={Constants.ID_FOR_ALL_COLUMN_SELECT} {...column.getToggleHiddenProps()} />
                                    <span className="ColumnSelect-header-names">{column.Header}</span>                               
                            </label>
                            )}
                            </div>
                        )
                    )}
               </div>
               <hr></hr>
                <div className="ColumnSelect-reset-button">     
                    { toggleHideAllColumnProps.indeterminate != 0 ?  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                    : (<label> <span className="reset-button">{Constants.RESET_SETTINGS}</span> </label>)
                    }
                </div>
            </div>
        );
    };

     /**
  * renderEmptyDatagrid function returns the empty datagrid message and images in the table body
  */
    const renderEmptyDatagrid = () => {
        // TODO replace with CSS/ICON
        return (
            <div className="empty-datagrid-style">
            <div className="datagrid-placeholder-container">
             <div className="datagrid-placeholder clr-align-items-center clr-justify-content-center">
              <div />
              <tbody>
              <img src={emptyDatagrid} alt={emptyDatagrid} />
              {Constants.EMPTY_DATA_GRID_NO_ITEMS_FOUND}
              </tbody>
             </div>
            </div>
            </div>
        );
    };

    //Function to render react table with Table Header and Table Rows
    const renderTable = () => {
        return (
            <>
          {isFilter?showFilterIcon():''}
          {isOpen && renderColumnSelection()}
            {showColumnSelect && (                         
                          <Button
                              link
                              onClick={() => setOpen(!isOpen)}
                              icon={{
                               shape:"view-columns"                               
                              }}
                              className={"column-select-icon"}
                          />
            )}

                {isFilter &&
                    <div className={"row"}>
                        <div className={isFilterOpen ? "col-sm-10 col-md-10 col-lg-9" : "clr-col-12"}>
                            <table {...getTableProps()} style={style} className={"data-grid-infinite-table"}>
                                {renderTableHeader()}
                                {allValues.length !== 0 ?  renderTableRow() : renderEmptyDatagrid() }
                            </table>
                        </div>
                        {isFilterOpen && displayFilterPanel()}
                    </div>
                }
                {!isFilter &&
                    <div className={showDetailsPanel && showDetailPanel ? "clr-row" : ""}>
                        <div className={showDetailsPanel && showDetailPanel ? "clr-col-8" : "clr-col-12" || isFilter  ? "row" : "clr-col-12" }>
                    <table {...getTableProps()} style={style}
                           className={isFilterOpen ? "col-sm-10 col-md-10 col-lg-9 data-grid-infinite-table" : "data-grid-infinite-table"}>
                        {renderTableHeader()}
                        {allValues.length !== 0 ? renderTableRow() : renderEmptyDatagrid()}
                    </table>
                        </div>
                        {showDetailsPanel &&
                            showDetailData !== undefined &&
                            <div className="clr-col-4">  {displayDetailPanel()} </div>}
                    </div>
                }
            </>
        );
    };

    return isLoading ? <Spinner size={SpinnerSize.SMALL} /> : renderTable();
}
export default DataGridWithInfiniteScroll;