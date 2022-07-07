//import ReactDataGrid from 'react-data-grid';
import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
// import "styles/components/Data   Grid.scss";
import './datagridCustomStyles.scss';


/**
 * Enum for GridSelectionType :
 * @param {MULTI} for enabling multi row select
 * @param {SINGLE} for enabling single row select
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}
type DataGridProps = {
    className?: string;
    style?: any;
    dataqa?: string;
    id?: string;
    row: { [key: string]: any };
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
};
export type DataGridRow = {
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    disableRowSelection?: boolean;
};
const DataGridInfiniteScroll = (props: DataGridProps) => {
    const data: any = props.row;
    const columns: any = props.column;
    const selectionType: any = props.selectionType;

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
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data,
        initialState: {pageIndex: 0},
        defaultColumn,
    });
    const [allValues, setIsChecked] = useState<any>([]);
    useEffect(() => {
        setIsChecked(rows);
    }, [rows]);

    const handleChange = (e) => {
        const {id, checked} = e.target;
        if (id === 'allSelect') {
            let tempUser = allValues.map((val) =>{
                return {...val , isChecked:checked}
            });
            setIsChecked(tempUser);
        } else {
            let tempUser = allValues.map(val => val.id === id ? {...val, isChecked: checked} : val)
            setIsChecked(tempUser);
        }
    }
    return (
        <div className="table-css">
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
                                               onChange={handleChange}/>
                                    </label>
                                </div>
                            </th>
                        }
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-body">
                {allValues.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className={'csg-row'}>
                            {selectionType === GridSelectionType.MULTI &&
                            <th scope={row}>
                                <div className="dds__checkbox dds__checkbox--sm">
                                    <label className="dds__checkbox__label" htmlFor="sm-rad">
                                        <input type="checkbox" id={row.id}
                                               className="dds__checkbox__input"
                                               onChange={handleChange}
                                               checked={row?.isChecked || false}/>
                                    </label>
                                </div>
                            </th>
                            }
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>

        </div>

    )
}
export default DataGridInfiniteScroll;