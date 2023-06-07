import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../Styles/Visitors.css"

const Visitors = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visitors, setVisitors] = useState([]);
  const [open, setOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState({ name: '', email: '', gender: '', occupation: '' });
  const [editVisitor, setEditVisitor] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/visitors');
      setVisitors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const onDelete = async (visitorId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this visitor!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3005/visitors/${visitorId}`);
        const updatedVisitors = visitors.filter((visitor) => visitor.id !== visitorId);
        setVisitors(updatedVisitors);
        Swal.fire('Deleted!', 'Visitor has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while deleting the visitor.', 'error');
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditVisitor(null);
    setNewVisitor({ name: '', email: '', gender: '', occupation: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVisitor((prevVisitor) => ({ ...prevVisitor, [name]: value }));
  };

  const handleAddVisitor = async () => {
    try {
      const response = await axios.post('http://localhost:3005/visitors', newVisitor);
      const newVisitorList = [...visitors, response.data];
      setVisitors(newVisitorList);
      Swal.fire('Success!', 'Visitor has been added.', 'success');
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while adding the visitor.', 'error');
    }
  };

  const handleEditVisitor = async () => {
    try {
      await axios.put(`http://localhost:3005/visitors/${editVisitor.id}`, newVisitor);
      const updatedVisitors = visitors.map((visitor) => (visitor.id === editVisitor.id ? { ...visitor, ...newVisitor } : visitor));
      setVisitors(updatedVisitors);
      Swal.fire('Success!', 'Visitor has been updated.', 'success');
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while updating the visitor.', 'error');
    }
  };

  const handleEditClick = (visitor) => {
    setEditVisitor(visitor);
    setNewVisitor(visitor);
    setOpen(true);
  };

  return (
    <>
      <Paper className='paper'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h6">Visitors List</Typography>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
            Add Visitor
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 690 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                  Gender
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                  Occupation
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                    <TableCell key={data.id} align="left">
                      {data.name}
                    </TableCell>
                    <TableCell key={data.id} align="left">
                      {data.email}
                    </TableCell>
                    <TableCell key={data.id} align="left">
                      {data.gender}
                    </TableCell>
                    <TableCell key={data.id} align="left">
                      {data.occupation}
                    </TableCell>
                    <TableCell key={data.id} align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: '20px',
                            color: 'blue',
                            cursor: 'pointer',
                          }}
                          className="cursor-pointer"
                          onClick={() => handleEditClick(data)}
                          onMouseEnter={(e) => (e.target.style.color = 'black')}
                          onMouseLeave={(e) => (e.target.style.color = 'blue')}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: '20px',
                            color: 'blue',
                            cursor: 'pointer',
                          }}
                          className="cursor-pointer"
                          onClick={() => onDelete(data.id)}
                          onMouseEnter={(e) => (e.target.style.color = 'black')}
                          onMouseLeave={(e) => (e.target.style.color = 'blue')}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 50]}
          component="div"
          count={visitors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>{editVisitor ? 'Edit Visitor' : 'Add Visitor'}</DialogTitle>
        <DialogContent>
          <form>
            <Box mb={2}>
              <Typography>Name:</Typography>
              <input
                type="text"
                name="name"
                value={newVisitor.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Email:</Typography>
              <input
                type="email"
                name="email"
                value={newVisitor.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Gender:</Typography>
              <input
                type="text"
                name="gender"
                value={newVisitor.gender}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Occupation:</Typography>
              <input
                type="text"
                name="occupation"
                value={newVisitor.occupation}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={editVisitor ? handleEditVisitor : handleAddVisitor} variant="contained">
            {editVisitor ? 'Update' : 'Submit'}
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </> 
  );
};

export default Visitors;
