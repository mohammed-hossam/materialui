import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  arSD,
  GridActionsCellItem,
  gridNumberComparator,
  gridStringOrNumberComparator,
  getGridStringOperators,
  getGridNumericOperators,
  useGridApiContext,
  gridPageSelector,
  gridPageCountSelector,
  useGridSelector,
} from '@mui/x-data-grid';

import { Button, Pagination, TextField } from '@mui/material';
import classes from './test.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

// to get the avalible operators
console.log(getGridNumericOperators()[0].InputComponent);
// const restofoperators = getGridNumericOperators();
// The rows prop should keep the same reference between two renders except when you want to apply new rows. Otherwise, the grid will re-apply heavy work like sorting and filtering.
const initialRows = [
  {
    id: 1,
    names: 'Muhammad',
    location: 'aksa',
    age: 20,
    customCell: 2019,
    product: 'لابتوب',
    done: true,
  },
  {
    id: 2,
    names: 'khaled',
    location: 'begypt',
    age: 14,
    customCell: 2020,
    product: 'شنطة',
    done: false,
  },
  {
    id: 3,
    names: 'omar',
    location: 'cuae',
    age: 36,
    customCell: 2021,
    product: 'كوشتي',
    done: true,
  },
  {
    id: 4,
    names: 'fat7y',
    location: 'italy',
    age: 62,
    customCell: 2021,
    product: 'علبة',
    done: true,
  },
  {
    id: 5,
    names: 'abdo',
    location: 'spain',
    age: 56,
    customCell: 2021,
    product: 'بسكوت',
    done: false,
  },
];

function getFullName(params) {
  return `${params.row.names || ''} ${params.row.age || ''}`;
}

function RatingInputValue(props) {
  const { item, applyValue, focusElementRef } = props;

  const ratingRef = React.useRef(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      ratingRef.current
        .querySelector(`input[value="${Number(item.value) || ''}"]`)
        ?.focus();
    },
  }));

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <TextField
      // name="custom-rating-filter-operator"
      // placeholder="Filter value"
      // value={Number(item.value)}
      value={isNaN(Number(item.value)) ? 0 : Number(item.value)}
      onChange={handleFilterChange}
      // precision={0.5}
      ref={ratingRef}
      type="number"
    />
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function Table() {
  const [rows, setRows] = useState(initialRows);
  const [sortModel, setSortModel] = useState([{ field: 'age', sort: 'desc' }]);
  const [filterModel, setFilterModel] = useState();

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  function customComparator(v1, v2) {
    console.log(v1, v2);
  }
  // function ageNameSortComparator(v1, v2, param1, param2) {
  //   console.log(v1);
  //   console.log(param2);
  //   const doneComparatorResult = gridNumberComparator(
  //     v1.done,
  //     v2.done,
  //     param1,
  //     param2
  //   );

  //   // The `isdone` values of the two cells are different
  //   // We can stop here and sort based on the `isdone` field.
  //   if (doneComparatorResult !== 0) {
  //     return doneComparatorResult;
  //   }

  //   return gridStringOrNumberComparator(v1.product, v2.product, param1, param2);
  // }

  // columns = GridColDef[]
  //defaut width=100px
  //defaut minWidth=50px
  //default type=string
  const columns = [
    {
      field: 'names',
      headerName: 'الاسماء',
      width: 200,
      cellClassName: classes.test,
    },
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
      sortComparator: customComparator,
    },
    {
      field: 'age',
      headerName: 'العمر',
      width: 200,
      filterOperators: [
        {
          label: 'اعلي من',
          value: 'اعلي من',
          getApplyFilterFn: (filterItem) => {
            if (
              !filterItem.columnField ||
              !filterItem.value ||
              !filterItem.operatorValue
            ) {
              return null;
            }

            return (params) => {
              return Number(params.value) >= Number(filterItem.value);
            };
          },
          InputComponent: RatingInputValue,
          // InputComponent: getGridNumericOperators()[0].InputComponent,
          InputComponentProps: { type: 'number' },
        },
        ...getGridNumericOperators(),
      ],
    },
    {
      field: 'done',
      headerName: 'الحالة',
      width: 200,
    },
    {
      field: 'product',
      headerName: 'المنتج',
      width: 200,
      valueGetter: (params) => ({
        product: params.row.product,
        done: params.row.done,
      }),
      valueFormatter: (params) => {
        const value = params.value;
        console.log('formater', value.done);
        if (value.done) {
          return `${value.product} (done)`;
        }

        return value.product;
      },
      // sortComparator: ageNameSortComparator,
    },
    {
      field: 'agewithname',
      headerName: 'الاسم مع العمر',
      width: 200,
      valueGetter: getFullName,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'customCell',
      headerName: 'custom cell',
      // width: 80,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            // style={{ marginLeft: 16 }}
          >
            {params.value}
          </Button>
        </strong>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Admin"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="Duplicate User"
          showInMenu
        />,
      ],
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
          // Pagination: CustomPagination,
        }}
        initialState={
          {
            // sorting: {
            //   sortModel: [{ field: 'age', sort: 'desc' }],
            // },
            // filter: {
            //   filterModel: {
            //     items: [
            //       {
            //         // id: 1,
            //         columnField: 'age',
            //         value: '0',
            //         operatorValue: 'اعلي من',
            //       },
            //     ],
            //   },
            // },
          }
        }
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => {
          console.log(newSortModel);
          setSortModel(newSortModel);
        }}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => {
          console.log('filterchanged', newFilterModel);
          setFilterModel(newFilterModel);
        }}
        autoHeight
        // disableColumnSelector={true}
        // disableColumnMenu={true}
        // disableColumnResize={true} (pro-only)
        // onRowsScrollEnd={handleOnRowsScrollEnd} (pro-only)
      />
    </div>
  );
}
/* <div style={{ height: 300, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div> */
export default Table;
