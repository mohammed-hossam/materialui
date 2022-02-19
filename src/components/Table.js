import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'names', headerName: 'الاسماء', width: 200 },
  {
    field: 'location',
    headerName: 'الجهة',
    minWidth: 150,
    renderHeader: (params) => (
      <strong>
        {'الجهة'}
        <span role="img" aria-label="enjoy">
          🎂
        </span>
      </strong>
    ),
  },
];
//defaut width=100px
//defaut minWidth=50px
const rows = [
  { id: 1, names: 'Muhammad', location: 'ksa' },
  { id: 2, names: 'khaled', location: 'egypt' },
  { id: 3, names: 'omar', location: 'uae' },
];
/* <div style={{ height: 300, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div> */
function Table() {
  return (
    <div style={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        // disableColumnSelector={true}
      />
    </div>
  );
}

export default Table;
