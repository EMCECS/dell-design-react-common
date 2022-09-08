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
 import {useBlockLayout, useExpanded, useFilters, useResizeColumns, useSortBy, useTable} from "react-table";
 import {Card, CardBlock, CardTitle} from '@dellstorage/clarity-react/cards'
 import {Table} from '@dellstorage/clarity-react/tables';
 import FilterPanel from "./FilterPanel";
 import filter from "assets/images/filter.svg";
 import filterOpen from 'assets/images/filter-solid.svg'
 import emptyDatagrid from 'assets/images/emptyDatagrid.svg';
 import InfiniteScroll from "react-infinite-scroll-component";
 import {Spinner, SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
 
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
     sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => Promise<DataGridRow[]>;
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
  * @param {pagination} pagination support
  * @param {rowType} Expandable or compact row type
  * @param {isSorting} sorting true or false
  * @param {isFilter} filtering true or false
  * @param {pagination} pagination support
  * @param {showColumnSelect} showColumnSelect is boolean value for column selection flag
  * @param {detailDataProps} detailDataProps is to get the detail panel data of type DetailPaneData
  * @param {detailPaneContent} detailPaneContent is to display funtion in detail panel instean of key value
  * @param {showDetailPanel} showDetailPanel is to display detail panel
  * @param {defaultColumnHeader} defaultColumnHeader is to set one default column to show
  * @param {filterFunction} filterFunction to get the functioning part of filter
  * @param {filterData} filterData to get data to be filtered.
  * @param {getInfiniteScrollData} getInfiniteScrollData to get the data from function calling the infinite data
  * @param {fetchMoreData} fetchMoreData is function prop to get next data
  * @param {datagridBodyHeight} datagridBodyHeight is fixed height for the body of the datagrid
  */
 type DataGridProps = {
     className?: string;
     style?: any;
     id?: string;
     rows?: { [key: string]: any };
     columns: { [key: string]: any };
     selectionType?: GridSelectionType;
     rowType?: GridRowType;
     isSorting?: boolean;
     isFilter?: boolean;
     expandable?: boolean;
     pagination?: boolean;
     showColumnSelect?: boolean;
     detailDataProps?: DetailPaneData;
     detailPaneContent?: any;
     showDetailPanel?: boolean;
     defaultColumnHeader?: any;
     filterFunction?: Function;
     filterData?: any;
     getInfiniteScrollData?: any;
     fetchMoreData?: any;
     datagridBodyHeight?: any;
     isLoading?: boolean;
     callbackForColumnName?: Function;
 }
 
 type FilterProps = {
     title?: string;
     children?: Function
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
 
 const idForSorting = 'allSelect';
 
 const DataGridWithInfiniteScroll = (props: DataGridProps, filterProps: FilterProps) => {
     const data: any = props?.rows ? props?.rows : [];
     const columns: any = props?.columns;
     const selectionType: any = props?.selectionType;
     const isLoading: any = props?.isLoading;
     const filterData: any = props?.filterData;
     const filterFunction: any = props?.filterFunction;
     const getInfiniteScrollData: any = props?.getInfiniteScrollData;
     const datagridBodyHeight: any = props?.datagridBodyHeight;
     const fetchMoreData: any = props?.fetchMoreData;
     const callbackForColumnName: any = props?.callbackForColumnName;
     const [infiniteScrollData, setinfiniteScrollData] = useState(getInfiniteScrollData);
     const defaultDatagridBodyHeight = 550;
     const title: any = filterProps?.title;
     const showColumnSelect: boolean = props?.showColumnSelect ? props?.showColumnSelect : false;
     const detailDataProps: any = props?.detailDataProps;
     const defaultColumnHeader: any = props?.defaultColumnHeader;
     const showDetailPanel: boolean = props?.showDetailPanel ? props?.showDetailPanel : false;
     const refParent: any = useRef();
     const refChild: any = useRef();
     const refSetting: any = useRef();
     const [isOpen, setOpen] = useState<boolean>(false);
     const [transformVal, settransformVal] = useState<any>("translateX(0px) translateY(0px)");
     const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false)
     const [, setDetailRowIndex] = useState<number>()
     const [showDetailData, setShowDetailData] = useState<any>()
     const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>()
     let expandData: { key: string; value: any; }[] = [{key: "", value: ""}];
     const rowType: any = props.rowType;
     const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
 
     useEffect(() => {
         if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
             refParent.current = refParent.current.getClientRects()[0];
             refChild.current = refChild.current.getClientRects()[0];
         }
     }, []);
 
     useEffect(() => {
         returnPositionColumnSelectionDropdown()
 
     }, [refParent?.current?.getClientRects()[0]?.width, refParent?.current?.clientWidth]);
 
     useEffect(() => {
         returnPositionColumnSelectionDropdown()
 
     }, [refParent?.current?.getClientRects()[0]?.width]);
 
 
 
     /**
      * This funtion is to get the Reset Setting for column selection, which shows all the columns
      */
     const IndeterminateCheckbox = forwardRef(({indeterminate, ...rest}: any, ref) => {
         const defaultRef = useRef();
         const resolvedRef: any = ref || defaultRef;
 
         useEffect(() => {
             returnPositionColumnSelectionDropdown()
             resolvedRef.current.indeterminate = indeterminate;
         }, [resolvedRef, indeterminate]);
 
         returnPositionColumnSelectionDropdown()
 
         return (
             <div className="checkbox">
                 <label>
                     <input type="checkbox" className="input-assumpte" ref={resolvedRef} {...rest} />
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
         getToggleHideAllColumnsProps,
     } = useTable({
             columns,
             data,
         },
         useFilters, // Adding the useFilters Hook to the table
         useSortBy, // Adding for sorting to the table
         useExpanded,
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
         if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
             const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
             const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
             const transformVal =
                 "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
             settransformVal(transformVal);
         }
     }
 
     /**
      * getColumnSelectionList function
      * This function is called on setting icon, to open the column selection dropdown
      */
     const getColumnSelectionList = () => {
         returnPositionColumnSelectionDropdown()
         setOpen(!isOpen);
     }
 
      /**
      * handleDetailsPanel function
      * This function returns the details for detail panel content
      */
     const handleDetailsPanel = (row: any, i: number) => {
         let detailPanelKeys = Object.keys(detailDataProps?.columnNames);
         for (let j = 0; j < detailPanelKeys.length; j++) {
             let keyValue = {
                 key: detailDataProps?.columnNames[detailPanelKeys[j]],
                 value: String(detailDataProps?.detailPaneContentJSON[i][detailPanelKeys[j]])
             };
             expandData.push(keyValue);
         }
         setShowDetailData(expandData);
         setShowDetailPanelTitle(detailDataProps?.detailPaneContentJSON[i][detailDataProps?.title])
         setDetailRowIndex(i);
         setShowDetailsPanel(true);
     }
 
     /**
      * This function is to return a panel (Box) of detail panel component
      */
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
                     {detailPaneContent ? detailPaneContent() :
                         <Table isNonBordered className='borderless-table'>
 
                             <tbody>
                             {showDetailData?.map((item: any) => (
                                 <tr key={item.key}>
                                     <td>{item.key}</td>
                                     <td className="value-width">{item.value}</td>
                                 </tr>
                             ))}
                             </tbody>
 
                         </Table>
                     }
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
 
    /**
     * handleMultiSelect function is to handle the multi select functionality
     * 
     */    
     const handleMultiSelect = (event: any) => {
         const {id, checked} = event.target;
         let tempSortValue;
         if (id === idForSorting) {
             tempSortValue = allValues.map((val: any) => {
                 return {...val, isChecked: checked}
             });
             setIsChecked(tempSortValue);
         } else {
             tempSortValue = allValues.map((val: any) => val.id === id ? {...val, isChecked: checked} : val)
             setIsChecked(tempSortValue);
         }
     }

     /**
     * This function is to handle the single select functionality
     * 
     */    
     const handleRadioSelection = (event: any) => {
         const {id, checked} = event.target;
         return {id, checked};
     }
     const renderRowSubComponent = React.useCallback(
         ({row}) => (
             <h3>
                 Row Sub Component is working
             </h3>
         ),
         []
     );
 
     /**
      *  handleColumnSelectionChange function is to position the column selection dropdown after selecting/deselecting the column
      */
     const handleColumnSelectionChange = () => {
        returnPositionColumnSelectionDropdown()
        //  if (refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null) {
        //      const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
        //      const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 215;
        //      const transformVal =
        //          "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
        //      settransformVal(transformVal);
        //  }
 
     }
 
     const closeFilter = () => {
         setIsFilterOpen(false);
     }
     const openFilter = () => {
         setIsFilterOpen(true);
     }
 
     /**
      * This function returns the filter icon on the top to open the filter panel
      */
     const loadFilterIcon = () => {
         return (
             <div className={isFilterOpen ? 'filter-open' : 'filter-icon'} onClick={() => openFilter()}>
                 {isFilterOpen ?
                     <img src={filterOpen} alt={filterOpen}/>
                     : <img src={filter} alt={filter}/>
                 }
             </div>
         )
     }
 

     const renderMultiSelectDataGridHeader = () => {
         return (
             <th scope="col">
                 <div className="dds__checkbox dds__checkbox--sm">
                     <label className="dds__checkbox__label" htmlFor="sm-rad">
                         <input type="checkbox" id="allSelect"
                                className="dds__checkbox__input"
                                checked={allValues.filter((value: any) => value?.isChecked !== true).length < 1}
                                onChange={handleMultiSelect}/>
                     </label>
                 </div>
             </th>
         )
     }

     const renderMultiSelectDataGridRow = (row: any) => {
         return (
             <th scope={row}>
                 <div className="dds__checkbox dds__checkbox--sm">
                     <label className="dds__checkbox__label" htmlFor="sm-rad">
                         <input type="checkbox" id={row.id}
                                className="dds__checkbox__input"
                                onChange={handleMultiSelect}
                                checked={row?.isChecked || false}/>
                     </label>
                 </div>
             </th>
         )
     }
     const renderSingleSelectDataGridRow = (row: any) => {
         return (
             <th>
                 <div className="dds__radio-button dds__radio-button--sm">
                     <input className="dds__radio-button__input" type="radio"
                            name="name-650298779"
                            id="radio-button-control-426423994" value={row}
                            onChange={handleRadioSelection}/>
                 </div>
             </th>
         )
     }
 
     /**
      * renderEmptyDatagrid function returns the empty datagrid message and images in the table body
      * 
      */
     const renderEmptyDatagrid = () => {
         return (
             <div className="empty-datagrid-style">
                 <div className="datagrid-placeholder-container ng-star-inserted">
                     <div
                         className="datagrid-placeholder datagrid-empty clr-align-items-center clr-justify-content-center">
                         <div className="ng-star-inserted"/>
                         <img src={emptyDatagrid} alt={emptyDatagrid}/>
                         No items found!
                     </div>
                 </div>
             </div>
         )
     }
 
     /**
      * renderColumnSelection function returns the column selection 
      */
     const renderColumnSelection = () => {
         return (
             <div className="column-switch clr-popover-content"
                  ref={refChild}
                  role="dialog"
                  style={{
                      top: 0,
                      bottom: "auto",
                      right: "auto",
                      left: 0,
                      transform: transformVal,
                  }}>
                 <div className="ColumnSelect">
                     <span className="ColumnSelect-header">Column Picker</span>
 
                     {allColumns.map((column: any) =>
                         <div key={column.id}>
 
                             <label>
                                 {column.Header !== defaultColumnHeader &&
                                     <><input type='checkbox' onClick={handleColumnSelectionChange}
                                              id="allColumnSelect" {...column.getToggleHiddenProps()} />
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
         )
     }
 
     /**
      * renderSorting returns the sorting icon on the column where sorting is called. 
      */
     const renderSorting = (column: any) => {
         return (
             <div ref={refSetting} className="header-cell">
                 {column.render("Header")}
                 <span className="">
                   {column.isSorted
                       ? column.isSortedDesc ?
                           <div className=""><Icon shape={"arrow down"}/></div> :
                           <Icon shape={"arrow up"}/> : ''
                   }
               </span>
             </div>
         )
     }

     /**
      * This function is to return the filter panel when clicked on filter icon
      */
     const displayFilterPanel = () => {
         return (
             <div className="col-sm-2 col-md-2 col-lg-3">
                 <div className='filter-pane'>
                     <FilterPanel data={filterData} title="Filters" onChange={filterFunction}
                                  onClose={() => closeFilter()}/>
                 </div>
             </div>
         )
     }

     /**
      * This function is to return detail panel
      */
     const displayDetailPanel = () => {
         return (
             <div className={showDetailsPanel ? 'clr-col-4' : ''}>
                 <div className='details-pane'>
                     {getDetailPanel()}
                 </div>
 
             </div>
         )
     }
     return (
         <div>
 
             {isLoading ?
                 (<Spinner size={SpinnerSize.SMALL}/>
                 )
                 : (<div className={props.isFilter ? '' : 'clr-row flex-container'}>
                         {isOpen && renderColumnSelection()  }
                         {props.isFilter && loadFilterIcon()}
                         <div id="scrollableDiv" className={props.isFilter ? 'container-fluid' : 'scroll-div table-css'}>
                             <div
                                 className={showDetailsPanel && showDetailPanel ? "detailPanelCSS" : 'clr-col-12' || props.isFilter ? 'row' : 'clr-col-12'}>
                                 <div className={isFilterOpen ? "col-sm-10 col-md-10 col-lg-9" : 'clr-col-12'}>
                                     <div className={props.isFilter ? "table-css table-responsive filter-table" : 'table-css'}>
                                         <table {...getTableProps()} className={'table-width'} ref={refParent} style={props.style}>
                                             <thead>
                                             {headerGroups.map((headerGroup: any) => (
                                                 <tr {...headerGroup.getHeaderGroupProps()}
                                                     className={'csg-header'}>
                                                     {props.expandable ? <th/> : null}
                                                     {selectionType === GridSelectionType.MULTI &&
                                                         renderMultiSelectDataGridHeader()
                                                     }
                                                     {selectionType === GridSelectionType.SINGLE &&
                                                         <th/>
                                                     }
                                                     {headerGroup.headers.map((column: any) => (
                                                         <th {...column.getHeaderProps(props.isSorting ? column.getSortByToggleProps() : "")}
                                                             onClick={(e) => {
                                                                 if(props.isSorting) {
                                                                     //trigger the react-table header onClick manually
                                                                     column.getHeaderProps(column.getSortByToggleProps()).onClick(e);
 
                                                                     //Our Custom onclick functionality to pass columnName
                                                                     callbackForColumnName(column);
                                                                 }
                                                             }}
                                                         >
                                                             {renderSorting(column)}
                                                             <div
                                                                 {...column.getResizerProps()}
                                                                 className={`resizer ${
                                                                     column.isResizing ? 'isResizing' : ''}`}
                                                             />
                                                         </th>
 
                                                     ))}
                                                     {showColumnSelect &&
                                                         <th>
                                                             <Button link onClick={() => getColumnSelectionList()}
                                                                     icon={{shape: "settings", className: "is-solid"}}/>
                                                         </th>
                                                     }
                                                 </tr>
                                             ))}
                                             </thead>
 
                                             <InfiniteScroll
                                                 dataLength={rows.length}
                                                 next={fetchMoreData}
                                                 hasMore={!!fetchMoreData}
                                                 height={datagridBodyHeight ? datagridBodyHeight : defaultDatagridBodyHeight}
                                                 loader={<h5>Loading...</h5>}
                                                 scrollableTarget="scrollableDiv"
                                                 endMessage={
                                                     <p style={{textAlign: 'center'}}>
                                                         <b> </b>
                                                     </p>
                                                 }
                                             >
                                                 {allValues.length !== 0 ?
                                                     <tbody {...getTableBodyProps()} className={"table-body"}>
 
                                                     {allValues.map((row: any, i: number) => {
                                                         prepareRow(row);
                                                         return (
                                                             <tr {...row.getRowProps()}
                                                                 onClick={() => showDetailPanel ? handleDetailsPanel(row, i) : ''}
                                                                 className={'csg-row'}>
                                                                 {selectionType === GridSelectionType.MULTI &&
                                                                     renderMultiSelectDataGridRow(row)
                                                                 }
                                                                 {selectionType === GridSelectionType.SINGLE &&
                                                                     renderSingleSelectDataGridRow(row)
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
                                                                 {row.cells.map((cell: any) => {
                                                                     return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                                                 })}
                                                                 <td/>
                                                             </tr>
                                                         );
                                                     })
                                                     }
                                                     </tbody>
                                                     :
                                                     (renderEmptyDatagrid())}
                                             </InfiniteScroll>
                                         </table>
                                     </div>
                                 </div>
                                 {isFilterOpen && displayFilterPanel()}
                             </div>
                         </div>
                         {showDetailsPanel && showDetailData !== undefined && displayDetailPanel()}
                     </div>
                 )
             }
         </div>
     )
 }
 export default DataGridWithInfiniteScroll;
