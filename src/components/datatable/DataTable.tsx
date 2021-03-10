import React from 'react';

interface DataTableProps {
  columns: string[]
  widths?: string[]
  children?:string[]
  getServiceDetails?:any;
}
class DataTable extends React.Component<DataTableProps> {
  render() {
    const { columns, widths, children} = this.props;
    return (
      <div>
      <table className="table table-striped custom-table table-hover">
        <thead>
           <tr>
          {columns.map((column, i) => (
          <th key={i} style={widths && widths[i] ? { width: widths[i] } : undefined}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
    </table>
      </div>
    );
  }
}


export default DataTable;
