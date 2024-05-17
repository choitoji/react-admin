// import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNumber: "",
//     address: "",
//     yearLevel: "",
//     age: "", // Add age to the initial values
//     status:"",
//     sex:"",
//     schoolYear:"",
// };

// const phoneRegExp = /((^(\+)(\d){12}$)|(^\d{11}$))/;

// const userSchema = yup.object().shape({
//     idNumber: yup.string().required("required"),
//     firstName: yup.string().required("required"),
//     lastName: yup.string().required("required"),
//     age: yup.string().required("required"),
//     email: yup.string().email("invalid email").required("required"),
//     contactNumber: yup.string().matches(phoneRegExp, "Phone number is not valid.").required("required"),
//     address: yup.string().required("required"),
//     yearLevel: yup.string().required("required").nullable(),
//     status: yup.string().required("required").nullable(),
//     sex: yup.string().required("required").nullable(),
//     schoolYear: yup.string().required("required").nullable(),
// });

// const Form = () => {
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const navigate = useNavigate()

//     const handleFormSubmit = (values) => {
//         axios
//             .post("http://localhost:3001/api/createStudent", values) // Pass values directly
//             .then((res) => {
//                 console.log(res);
//                 navigate("../students"); // Use history.push to navigate
//             })
//             .catch((err) => console.log(err));
//     };

//     return (
//         <Box m="20px">
//             <Header title="ADD STUDENT" subtitle="Create a New Student Profile" />

//             <Formik
//                 onSubmit={handleFormSubmit}
//                 initialValues={initialValues}
//                 validationSchema={userSchema}
//             >
//                 {({ 
//                     values, 
//                     errors, 
//                     touched, 
//                     handleBlur, 
//                     handleChange, 
//                     handleSubmit
//                 }) => (
//                     <form onSubmit={handleSubmit}>
//                         <Box 
//                             display="grid" 
//                             gap="30px" 
//                             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                             m="20px 0 0 0"
//                             sx={{
//                                 "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "ID Number"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.idNumber}
//                                 name="idNumber"
//                                 error={!!touched.idNumber && !!errors.idNumber}
//                                 helperText={touched.idNumber && errors.idNumber}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "First Name"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.firstName}
//                                 name="firstName"
//                                 error={!!touched.firstName && !!errors.firstName}
//                                 helperText={touched.firstName && errors.firstName}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "Last Name"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.lastName}
//                                 name="lastName"
//                                 error={!!touched.lastName && !!errors.lastName}
//                                 helperText={touched.lastName && errors.lastName}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "Age"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.age}
//                                 name="age"
//                                 error={!!touched.age && !!errors.age}
//                                 helperText={touched.age && errors.age}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "Contact Number"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.contactNumber}
//                                 name="contactNumber"
//                                 error={!!touched.contactNumber && !!errors.contactNumber}
//                                 helperText={touched.contactNumber && errors.contactNumber}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "Email"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.email}
//                                 name="email"
//                                 error={!!touched.email && !!errors.email}
//                                 helperText={touched.email && errors.email}
//                                 sx={{ gridColumn: "span 2"}}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label= "Address"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.address}
//                                 name="address"
//                                 error={!!touched.address && !!errors.address}
//                                 helperText={touched.address && errors.address}
//                                 sx={{ gridColumn: "span 4"}}
//                             />
//                             <Select
//                                 fullWidth
//                                 variant="filled"
//                                 label="Sex"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.sex}
//                                 name="sex"
//                                 displayEmpty
//                                 error={!!touched.sex && !!errors.sex}
//                                 sx={{ gridColumn: "span 1" }}
//                             >
//                                 <MenuItem value="" disabled>Sex</MenuItem>
//                                 <MenuItem value="Male">Male</MenuItem>
//                                 <MenuItem value="Female">Female</MenuItem>
//                                 <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
//                             </Select>
//                             <Select
//                                 fullWidth
//                                 variant="filled"
//                                 label="Year Level"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.yearLevel}
//                                 name="yearLevel"
//                                 displayEmpty
//                                 error={!!touched.yearLevel && !!errors.yearLevel}
//                                 sx={{ gridColumn: "span 1" }}
//                             >
//                                 <MenuItem value="" disabled>Year Level</MenuItem>
//                                 <MenuItem value="1st Year">1st Year</MenuItem>
//                                 <MenuItem value="2nd Year">2nd Year</MenuItem>
//                                 <MenuItem value="3rd Year">3rd Year</MenuItem>
//                                 <MenuItem value="4th Year">4th Year</MenuItem>
//                             </Select>
//                             <Select
//                                 fullWidth
//                                 variant="filled"
//                                 label="Enrollment Status"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.status}
//                                 name="status"
//                                 displayEmpty
//                                 error={!!touched.status && !!errors.status}
//                                 sx={{ gridColumn: "span 1" }}
//                             >
//                                 <MenuItem value="" disabled>Enrollment Status</MenuItem>
//                                 <MenuItem value="Enrolled">Enrolled</MenuItem>
//                                 <MenuItem value="Not Yet Enrolled">Not Yet Enrolled</MenuItem>
//                                 <MenuItem value="Dropped">Dropped</MenuItem>
//                                 <MenuItem value="Ineligible">Ineligible</MenuItem>
//                                 <MenuItem value="With Liability">With Liability</MenuItem>
//                             </Select>
//                             <Select
//                                 fullWidth
//                                 variant="filled"
//                                 label="School Year"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.schoolYear}
//                                 name="schoolYear"
//                                 displayEmpty
//                                 error={!!touched.schoolYear && !!errors.schoolYear}
//                                 sx={{ gridColumn: "span 1" }}
//                             >
//                                 <MenuItem value="" disabled>School Year</MenuItem>
//                                 <MenuItem value="2024-2025">2024-2025</MenuItem>
//                                 <MenuItem value="2023-2024">2023-2024</MenuItem>
//                                 <MenuItem value="2022-2023">2022-2023</MenuItem>
//                                 <MenuItem value="2021-2022">2021-2022</MenuItem>
//                                 <MenuItem value="2020-2021">2020-2021</MenuItem>
//                             </Select>
//                         </Box>
//                         <Box display="flex" justifyContent="end" mt="20px">
//                             <Button type="submit" color="secondary" variant="contained"> 
//                                 Add Student
//                             </Button>
//                         </Box>
//                     </form>
//                 )}
//             </Formik>
//         </Box>
//     );
// };

// export default Form;

import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const phoneRegExp = /((^(\+)(\d){12}$)|(^\d{11}$))/;

const userSchema = yup.object().shape({
    idNumber: yup.string().required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    age: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contactNumber: yup.string().matches(phoneRegExp, "Phone number is not valid.").required("required"),
    address: yup.string().required("required"),
    yearLevel: yup.string().required("required").nullable(),
    status: yup.string().required("required").nullable(),
    sex: yup.string().required("required").nullable(),
    schoolYear: yup.string().required("required").nullable(),
});

const Form = ({ initialValues, onSubmit }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()

    const handleFormSubmit = (values) => {
        axios
            .post("http://localhost:3001/api/createStudent", values) // Pass values directly
            .then((res) => {
                console.log(res);
                navigate("../students"); // Use history.push to navigate
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box m="20px">
            <Header title={initialValues ? "EDIT STUDENT" : "ADD STUDENT"} subtitle={initialValues ? "Edit Student Profile" : "Create a New Student Profile"} />

            <Formik
                onSubmit={initialValues? onSubmit: handleFormSubmit}
                initialValues={initialValues || {
                    firstName: "",
                    lastName: "",
                    email: "",
                    contactNumber: "",
                    address: "",
                    yearLevel: "",
                    age: "",
                    status: "",
                    sex: "",
                    schoolYear: "",
                }}
                validationSchema={userSchema}
                enableReinitialize
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            m="20px 0 0 0"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="ID Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.idNumber}
                                name="idNumber"
                                error={!!touched.idNumber && !!errors.idNumber}
                                helperText={touched.idNumber && errors.idNumber}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                error={!!touched.age && !!errors.age}
                                helperText={touched.age && errors.age}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contactNumber}
                                name="contactNumber"
                                error={!!touched.contactNumber && !!errors.contactNumber}
                                helperText={touched.contactNumber && errors.contactNumber}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Select
                                fullWidth
                                variant="filled"
                                label="Sex"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sex}
                                name="sex"
                                displayEmpty
                                error={!!touched.sex && !!errors.sex}
                                sx={{ gridColumn: "span 1" }}
                            >
                                <MenuItem value="" disabled>Sex</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                            </Select>
                            <Select
                                fullWidth
                                variant="filled"
                                label="Year Level"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.yearLevel}
                                name="yearLevel"
                                displayEmpty
                                error={!!touched.yearLevel && !!errors.yearLevel}
                                sx={{ gridColumn: "span 1" }}
                            >
                                <MenuItem value="" disabled>Year Level</MenuItem>
                                <MenuItem value="1st Year">1st Year</MenuItem>
                                <MenuItem value="2nd Year">2nd Year</MenuItem>
                                <MenuItem value="3rd Year">3rd Year</MenuItem>
                                <MenuItem value="4th Year">4th Year</MenuItem>
                            </Select>
                            <Select
                                fullWidth
                                variant="filled"
                                label="Enrollment Status"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.status}
                                name="status"
                                displayEmpty
                                error={!!touched.status && !!errors.status}
                                sx={{ gridColumn: "span 1" }}
                            >
                                <MenuItem value="" disabled>Enrollment Status</MenuItem>
                                <MenuItem value="Enrolled">Enrolled</MenuItem>
                                <MenuItem value="Not Yet Enrolled">Not Yet Enrolled</MenuItem>
                                <MenuItem value="Dropped">Dropped</MenuItem>
                                <MenuItem value="Ineligible">Ineligible</MenuItem>
                                <MenuItem value="With Liability">With Liability</MenuItem>
                            </Select>
                            <Select
                                fullWidth
                                variant="filled"
                                label="School Year"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.schoolYear}
                                name="schoolYear"
                                displayEmpty
                                error={!!touched.schoolYear && !!errors.schoolYear}
                                sx={{ gridColumn: "span 1" }}
                            >
                                <MenuItem value="" disabled>School Year</MenuItem>
                                <MenuItem value="2024-2025">2024-2025</MenuItem>
                                <MenuItem value="2023-2024">2023-2024</MenuItem>
                                <MenuItem value="2022-2023">2022-2023</MenuItem>
                                <MenuItem value="2021-2022">2021-2022</MenuItem>
                                <MenuItem value="2020-2021">2020-2021</MenuItem>
                            </Select>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                {initialValues ? "Update Student" : "Add Student"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;