import { Box, Typography, useTheme, InputAdornment, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import axios from "axios"; // Import axios
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Form from "../form";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete('http://localhost:3001/api/deleteStudent/' + id)
      .then(res => {
        console.log(res);
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
        setFilteredStudents(prevFilteredStudents => prevFilteredStudents.filter(student => student.id !== id));
        window.location.reload();
      }).catch(err => console.log(err));
  }

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditDialogOpen = (student) => {
    console.log("Selected student for editing:", student); // Log the selected student
    setSelectedStudent(student);
    setOpenEditDialog(true);
  };

  const handleEditFormSubmit = (values, actions) => {
    console.log("Submitting the following values:", values);
    console.log("Selected student ID for update:", selectedStudent.databaseId); // Log the selected student ID
    axios.put(`http://localhost:3001/api/updateStudent/${selectedStudent.databaseId}`, values)
      .then(res => {
        console.log("Update response:", res);
        handleEditDialogClose();
        const updatedStudents = students.map(student =>
          student.databaseId === selectedStudent.databaseId ? { ...student, ...values } : student
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      })
      .catch(err => console.log("Update error:", err));
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/getAllstudents")
      .then(response => {
        const updatedStudents = response.data.map((student, index) => ({
          ...student,
          id: index + 1, // Use a unique identifier based on the index
          databaseId: student._id, // Ensure database ID is set correctly
        }));
        console.log(updatedStudents);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        Object.values(student).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const openDeleteDialog = (id) => {
    setSelectedStudentId(id);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setSelectedStudentId(null);
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (selectedStudentId) {
      handleDelete(selectedStudentId);
      closeDeleteDialog();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "idNumber", headerName: "ID Number" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "sex",
      headerName: "Sex",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "yearLevel",
      headerName: "Year Level",
      flex: 1,
    },
    {
      field: "schoolYear",
      headerName: "School Year",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Enrollment Status",
      flex: 2,
      renderCell: ({ row: { status } }) => {
        let bgColor;
        switch (status) {
          case "Enrolled":
            bgColor = colors.greenAccent[500];
            break;
          case "Not Yet Enrolled":
            bgColor = colors.redAccent[500];
            break;
          case "Dropped":
            bgColor = colors.blueAccent[500];
            break;
          case "Ineligible":
            bgColor = colors.blueAccent[900];
            break;
          case "With Liability":
            bgColor = colors.redAccent[800];
            break;
          default:
            bgColor = colors.grey[500];
        }

        return (
          <Box
            width="75%"
            m="10px 10px"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={bgColor}
            borderRadius="4px"
          >
            {status === "Enrolled" && <CheckIcon />}
            {status === "Not Yet Enrolled" && <CloseIcon />}
            {status === "Dropped" && <RemoveIcon />}
            {status === "Ineligible" && <PersonRemoveIcon />}
            {status === "With Liability" && <WarningAmberIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" m="10px">
          <IconButton onClick={() => handleEditDialogOpen(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => openDeleteDialog(row.databaseId)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="STUDENTS"
        subtitle="List of Enrollees"
      />

      {/* Search bar */}
      <Box display="flex" mb={2} mt={3}>
        <Button variant="contained" color="secondary" sx={{ color: colors.grey[100] }} onClick={() => navigate('/add-student')}>
          Add Student
        </Button>
        <Box justifyContent="flex-end">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
            <InputBase
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
      </Box>

      <Box
        m="-10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {/* Data grid */}
        <DataGrid
          rows={filteredStudents} // Use filtered data here
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />

        <Dialog open={openDialog} onClose={closeDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this student?
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} sx={{ color: colors.grey[100] }}>Cancel</Button>
            <Button onClick={confirmDelete} sx={{ color: colors.grey[100] }}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogContent>
            {/* Pass selected student data to the form */}
            {selectedStudent && (
              <Form initialValues={selectedStudent} onSubmit={handleEditFormSubmit} />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Students;