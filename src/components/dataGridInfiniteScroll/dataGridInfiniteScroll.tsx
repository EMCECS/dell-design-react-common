
//import ReactDataGrid from 'react-data-grid';
import React from "react";
import { useTable } from "react-table";
import "styles/components/DataGrid.scss";
import './datagridCustomStyles.scss';

type DataGridProps = {
    data: { [key: string]: any };
    column: { [key: string]: any };
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
const DataGridInfiniteScroll = (props:DataGridProps) => {
    const data: any = props.data;
    const columns: any = props.column;

    const defaultColumn = React.useMemo(
        () => ({
            width: props.defaultColumnWidth?props.defaultColumnWidth:200,
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
        initialState: { pageIndex: 0 },
        defaultColumn,
    });

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                        className={'csg-header'}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-body">
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className={'csg-row'} >
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