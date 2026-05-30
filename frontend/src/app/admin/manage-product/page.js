'use client'
import * as React from 'react';
import axios from 'axios';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Switch,
  FormControlLabel,
  useMediaQuery
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

// ---------------- SORT HELPERS ----------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ---------------- MAIN COMPONENT ----------------
export default function EnhancedTable() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [multiSelect, setMultiSelect] = React.useState(true); // 🔥 mode switch
  const [loading, setLoading] = React.useState(true);

  const isMobile = useMediaQuery('(max-width:600px)');

  // ---------------- FETCH ----------------
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
        );
        setData(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---------------- HEAD COLUMNS ----------------
  const headCells = React.useMemo(() => {
    if (!data.length) return [];

    return Object.keys(data[0])
      .filter((k) => k !== '_id')
      .map((key) => ({
        id: key,
        label: key.toUpperCase(),
        numeric: typeof data[0][key] === 'number',
      }));
  }, [data]);

  // ---------------- SELECT LOGIC ----------------

  // 🔥 SINGLE + MULTI SELECT SUPPORT
  const handleSelectRow = (id) => {
    if (!multiSelect) {
      // SINGLE SELECT MODE
      setSelected((prev) => (prev[0] === id ? [] : [id]));
    } else {
      // MULTI SELECT MODE
      setSelected((prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
      );
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(data.map((row) => row._id));
    } else {
      setSelected([]);
    }
  };

  // ---------------- DELETE API ----------------
  const handleDelete = async () => {
    if (!selected.length) return;

    try {
      // 🔥 Example API call (you will replace backend URL later)
      const {data}=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-product`, {
        ids: selected,
      });
      toast.success(data.message)
      // remove from UI instantly
      setData((prev) =>
        prev.filter((item) => !selected.includes(item._id))
      );

      setSelected([]);
    } catch (err) {
      console.log('Delete failed', err);
       toast.error("Failed To Delete!")
    }
  };

  // ---------------- PAGINATION ----------------
  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // ---------------- VISIBLE ROWS ----------------
  const visibleRows = React.useMemo(() => {
    return [...data]
      .sort(getComparator(order, orderBy || headCells[0]?.id))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, order, orderBy, page, rowsPerPage, headCells]);

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <Box display="flex" justifycontent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className=''>
    <Box sx={{ width: '100%', p: isMobile ? 1 : 3 }}>
        <h1 className=" text-3xl font-bold m-10 text-orange-400">Manage Product:</h1>

      <Paper sx={{ width: '100%', overflowX: 'auto' }}>

        {/* TOOLBAR */}
        <Toolbar sx={{ display: 'flex', justifycontent: 'space-between',  }}>


          <Box display="flex" gap={1} alignitems="center">

            {/* MODE SWITCH */}
            <FormControlLabel
              control={
                <Switch
                  checked={multiSelect}
                  onChange={() => {
                    setMultiSelect(!multiSelect);
                    setSelected([]);
                  }}
                />
              }
              label={multiSelect ? "Multi Select" : "Single Select"}
            />

            {/* DELETE BUTTON */}
            {selected.length > 0 && (
              <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{color:"red"}} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

        </Toolbar>

        {/* TABLE */}
        <TableContainer sx={{ maxHeight: 500 }}>

          <Table size={isMobile ? 'small' : 'medium'}>

            {/* HEADER */}
            <TableHead>
              <TableRow>

                {/* SELECT ALL ONLY FOR MULTI SELECT */}
                <TableCell padding="checkbox">
                  {multiSelect ? (
                    <Checkbox
                      checked={
                        selected.length === data.length &&
                        data.length > 0
                      }
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  ) : null}
                </TableCell>

                {headCells.map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.label}
                  </TableCell>
                ))}

              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {visibleRows.map((row, index) => {
                const rowId = row._id ?? index;
                const isSelected = selected.includes(rowId);

                return (
                  <TableRow
                    key={rowId}
                    hover
                    selected={isSelected}
                    onClick={() => handleSelectRow(rowId)}
                    sx={{ cursor: 'pointer' }}
                  >

                    {/* CHECKBOX */}
                    <TableCell padding="checkbox">
                      {multiSelect ? (
                        <Checkbox checked={isSelected} />
                      ) : (
                        <Checkbox checked={isSelected} />
                      )}
                    </TableCell>

                    {/* DATA */}
                    {headCells.map((cell) => (
                      <TableCell key={cell.id}>
                        {row[cell.id] ?? '-'}
                      </TableCell>
                    ))}

                  </TableRow>
                );
              })}
            </TableBody>

          </Table>

        </TableContainer>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </Box></div>
  );
}