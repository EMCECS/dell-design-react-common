import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useFilters, useSortBy, useTable, useBlockLayout, useResizeColumns} from "react-table";
import { Button} from "@dellstorage/clarity-react/forms/button";
import { Card, CardBlock, CardTitle } from '@dellstorage/clarity-react/cards'
import { Table } from '@dellstorage/clarity-react/tables'
import './DatagridCustomStyles.scss';
import './DatagridCoulumnSelectionStyles.scss';
import './DatagridDetailPanelStyles.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import makeData from "./DatagridInfiniteScrollMockDataCode";

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
    row?: { [key: string]: any };
    column: { [key: string]: any };
    selectionType?: GridSelectionType;
    sorting?: boolean;
    expandable?: boolean;
    expandComponent?: any;
    pagination?: boolean;
    columnSelect?: boolean;
    infiniteScroll?: boolean;
    tableType?: "csg" | "isg" | "compact";
    defaultColumnWidth?: number;
    tableHeight?: number;
    detailPaneContent? : any;
    detailPanelShow? : boolean;
    defaultColumnHeader? : any;
    fetchMoreData? : Function
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
export type DataGridRow = {
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    disableRowSelection?: boolean;
};
const DataGridWithInfiniteScroll = (props: DataGridProps) => {
    const data: any = props?.row ? props?.row : [];
    const columns: any = props?.column;
    const fetchMoreData: any = props?.fetchMoreData;
    const selectionType: any = props?.selectionType;
    const defaultColumnHeader : any = props?.defaultColumnHeader;
    const columnSelect : boolean = props?.columnSelect ? props?.columnSelect : false;
    const detailPanelShow: boolean = props?.detailPanelShow ? props?.detailPanelShow : false;
    const refParent : any = useRef();
    const refChild : any = useRef();
    const refSetting : any = useRef();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [transformVal, settransformVal] = useState<any>("translateX(0px) translateY(0px)");
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false)
    const [detailRowIndex, setDetailRowIndex] = useState<number>()
    const [showDetailData, setShowDetailData] = useState<any>()
    const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>()
    let expandData: { key: string; value: any; }[];
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
  if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
    const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
    const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
    const transformVal =
    "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
    settransformVal(transformVal);
    }

  }, [refParent?.current?.getClientRects()[0]?.width,refParent?.current?.clientWidth]);

  // @ts-nocheck
    const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;
     

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

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
        getToggleHideAllColumnsProps,
        resetResizing //Reset resizing of columns
    } = useTable({
            columns, 
            data,
            initialState: {pageIndex: 0,
            hiddenColumns: columns.filter(column => !column.show).map(column => column.Header)},
        },
        useFilters, // Adding the useFilters Hook to the table
        useSortBy,
        useBlockLayout,
        useResizeColumns
    );
    const [allValues, setIsChecked] = useState<any>([]);
   
    useEffect(() => {
        if(rows.length != 0){
            setIsChecked(rows);
        }
    }, [rows]);

    const getColumnSelectionList = () => {
    if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
    const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
    const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 85;
    const transformVal =
    "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
    settransformVal(transformVal);
  }
    setOpen(!isOpen);
  }

  const handleDetailsPanel = (row, i) => {
    expandData = [
        { key: 'Device Description', value: data[i].deviceDescription },
        { key: 'Controller', value: data[i].controller },
        { key: 'Operational State', value: data[i].operationalState },
        {
          key: 'Block Size',
          value: data[i].blockSize },
        { key: 'Failure Predicted', value: data[i].failurePredicted },
        { key: 'Remaining Drive Life', value: data[i].remainingDriveLife },
        { key: 'Power Status', value: data[i].powerStatus },
        { key: 'Progress', value: data[i].progress },
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
        { key: 'SAS Address', value: data[i].SASAddress },
        { key: 'Part Number', value: data[i].partNumber },
        { key: 'Manufacturer', value: data[i].manufacturer },
        { key: 'Product ID', value: data[i].productId },
        { key: 'Revision', value: data[i].revision },
        { key: 'Serial Number', value: data[i].serialNumber },
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
          { detailPaneContent ? detailPaneContent :
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

    const handleChangeSorting = (e) => {
        const {id, checked} = e.target;
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

    const handleChangeSelect = (e) => {
      if(refParent.current !== null && refParent.current !== undefined && refChild.current !== undefined && refChild.current !== null){
        const HideShowColumnsMenuTop = refParent.current.getClientRects()[0].top + 50;
        const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 215;
        const transformVal =
        "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
        settransformVal(transformVal);
    }

  }

   const [sentryRef,{ rootRef }] = useInfiniteScroll({
        loading: state.loading,
        hasNextPage: true,
        onLoadMore: fetchMoreData
      });

    return (

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
                        { column.Header != defaultColumnHeader &&     
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

        <div id="scrollableDiv"  className="scroll-div table-css" style={props.style} >
            <div  className={showDetailsPanel ? "detailPanelCSS" : 'clr-col-12'}>
            <table {...getTableProps()}  ref={refParent}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                        className={data.length == 0 ? 'csg-header empty-datagrid-header-bottom' : 'csg-header'}>
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
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(props.sorting ? column.getSortByToggleProps() : "")}>
                                <div ref={refSetting} className="header-cell">
                                    {column.render("Header")}
                                    <span className="">
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <div className="">
                                                            <img
                                                            src="https://dds.dell.com/svgs/2.4.0/dds__icon--arrow-down.svg"
                                                            height="30px" width="30px" alt="dds__icon--arrow-down"/>
                                                        </div>
                                                        : <div className=""><img
                                                            src="https://dds.dell.com/svgs/2.4.0/dds__icon--arrow-up.svg"
                                                            height="32px" width="32px" alt="dds__icon--arrow-up"/>
                                                        </div>
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
                <InfiniteScroll
                    dataLength={rows.length}
                    next={fetchMoreData}
                    hasMore={fetchMoreData ? true : false}
                    height={550}
                    loader={<h5>Loading...</h5>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b> </b>
                      </p>
                    }
                >
              { allValues.length != 0 ? <tbody {...getTableBodyProps()} className={"table-body" }>
                
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
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                            <td></td>
                        </tr>
                    );
                }) 
                }
                </tbody>
                : 
                (<div style={{ textAlign: 'center', paddingTop: "210px" }}>
                <div className="datagrid-placeholder-container ng-star-inserted">
                  <div className="datagrid-placeholder datagrid-empty clr-align-items-center clr-justify-content-center">
                      <div className="datagrid-placeholder-image ng-star-inserted"></div>
                      No items found!
                  </div>
              </div></div>)}

            </InfiniteScroll>
            </table>
            </div>
        </div>
        <div className={showDetailsPanel ? 'clr-col-4' : ''}>
                {showDetailsPanel && showDetailData !== undefined &&
                    <div className='details-pane'>                  
                        {getDetailPanel()}
                    </div>
                }
        </div>
    </div>

    )
}
export default DataGridWithInfiniteScroll;