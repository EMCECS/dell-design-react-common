import React, {useEffect, useRef, useState} from "react";
import {useFilters, useSortBy, useTable} from "react-table";
import { Button} from "@dellstorage/clarity-react/forms/button";
import { Card, CardBlock, CardTitle } from '@dellstorage/clarity-react/cards'
import { Table } from '@dellstorage/clarity-react/tables'
import './DatagridCustomStyles.scss';
import './DatagridCoulumnSelectionStyles.scss';
import './DatagridDetailPanelStyles.scss';

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
    const selectionType: any = props?.selectionType;
    const columnSelect : boolean = props?.columnSelect ? props?.columnSelect : false;
    const detailPanelShow: boolean = props?.detailPanelShow ? props?.detailPanelShow : false;
    const refParent : any = useRef();
    const refChild : any = useRef();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [transformVal, settransformVal] = useState<any>("translateX(0px) translateY(0px)");
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false)
    const [detailRowIndex, setDetailRowIndex] = useState<number>()
    const [showDetailData, setShowDetailData] = useState<any>()
    const [showDetailPanelTitle, setShowDetailPanelTitle] = useState<string>()
    let expandData: { key: string; value: any; }[];

    useEffect(() => {
        setShowDetailsPanel(true);        
    }, [showDetailData]);

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

  }, [refParent?.current?.getClientRects()[0]?.width]);


    const defaultColumn = React.useMemo(
        () => ({
            width: props.defaultColumnWidth ? props.defaultColumnWidth : 200,
        }),
        []
    )
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // The useFilter Hook provides a way to set the filter
        allColumns // Get all columns of the datagrid
    } = useTable({
            columns,
            data,
            initialState: {pageIndex: 0},
            defaultColumn,
        },
        useFilters, // Adding the useFilters Hook to the table
        useSortBy
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
            const HideShowColumnsMenuLeft = refParent.current.getClientRects()[0].width - 180;
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
                            <input type='checkbox' id="allColumnSelect"  {...column.getToggleHiddenProps()} />
                            <span className="ColumnSelect-header-names">{column.Header}</span>
                        </label>
                    </div>
                )}
          </div>
                <div className="ColumnSelect-reset-button">
            
                    <Button link className="Reset-button-margin-css"  >
                    <span className="ColumnSelect-header">Reset Settings </span> </Button>

                </div>
          </div>
        }

        <div className="table-css" style={props.style} ref={refParent}>
            <div className={showDetailsPanel ? 'clr-col-12' : 'clr-col-12'}>
            <table {...getTableProps()} className="table-css">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                        className={'csg-header'}>
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
                                <div className="header-cell">
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
                            </th>
                        ))}
                           { columnSelect && <th>
                                <Button link onClick={() => getColumnSelectionList()} icon={{shape: "settings", className:"is-solid" }}/>
                           </th> }
                    </tr>
                ))}
                </thead>


                { data.length != 0  ?  
                <tbody {...getTableBodyProps()} className={data.length != 0 ? "table-body" : "empty-datagrid"}>
                {allValues ? allValues.map((row, i) => {
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
                }) : <tr className="empty-table-border"></tr>
                }
                </tbody>
                : 
                <tbody className="empty-datagrid">
                 {/* <tr> */}
                    <div className="datagrid-placeholder-container ng-star-inserted">
                        <div className="datagrid-placeholder datagrid-empty clr-align-items-center clr-justify-content-center">
                            <div className="datagrid-placeholder-image ng-star-inserted"></div>
                            No items found!
                        </div>
                    </div>
                {/* // </tr>  */} 
                 </tbody>    
            }


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