import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../Visitors.css"

const Visitors = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', gender: '', occupation: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const onDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });
  
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3005/users/${userId}`);
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
    }
  };
  

  const handleOpen = () => {
    setOpen(true);
    setEditUser(null);
    setNewUser({ name: '', email: '', gender: '', occupation: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:3005/users', newUser);
      const newUserList = [...users, response.data];
      setUsers(newUserList);
      Swal.fire('Success!', 'User has been added.', 'success');
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while adding the user.', 'error');
    }
  };
  

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/users/${editUser.id}`, newUser);
      const updatedUsers = users.map((user) => (user.id === editUser.id ? { ...user, ...newUser } : user));
      setUsers(updatedUsers);
      Swal.fire('Success!', 'User has been updated.', 'success');
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'An error occurred while updating the user.', 'error');
    }
  };
  

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewUser(user);
    setOpen(true);
  };

  return (
    <>
      <Paper className='paper' >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h6">Visitors List</Typography>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
            Add Visitor
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {users.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((data) => {
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
                          onMouseEnter={(e) => e.target.style.color = 'black'}
                          onMouseLeave={(e) => e.target.style.color = 'blue'}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: '20px',
                            color: 'blue',
                            cursor: 'pointer',
                          }}
                          className="cursor-pointer"
                          onClick={() => onDelete(data.id)}
                          onMouseEnter={(e) => e.target.style.color = 'black'}
                          onMouseLeave={(e) => e.target.style.color = 'blue'}
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle  sx={{fontWeight:'bold'}}>
          {editUser ? 'Edit User' : 'Add New User'}
          </DialogTitle>
        <DialogContent>
          <form>
            <Box mb={2}>
              <Typography>Name:</Typography>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Email:</Typography>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Gender:</Typography>
              <input
                type="text"
                name="gender"
                value={newUser.gender}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
            <Box mb={2}>
              <Typography>Occupation:</Typography>
              <input
                type="text"
                name="occupation"
                value={newUser.occupation}
                onChange={handleInputChange}
                className="form-control"
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={editUser ? handleEditUser : handleAddUser} variant="contained">
            {editUser ? 'Update' : 'Submit'}
          </Button>
          <Button onClick={handleClose} variant="contained" >
            Cancel
          </Button>
        </DialogActions> 
      </Dialog>
    </>
  );
};

export default Visitors;
