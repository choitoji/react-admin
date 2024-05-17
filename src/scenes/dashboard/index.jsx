import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import axios from "axios";
import { useState} from "react";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        axios.get("http://localhost:3001/api/getAllstudents")
            .then(response => {
                const jsonData = response.data;
                const jsonString = JSON.stringify(jsonData, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "student_database.json");
                document.body.appendChild(link);
                link.click();
                setDownloading(false);
            })
            .catch(error => {
                console.error("Error downloading student database:", error);
                setDownloading(false);
            });
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" m="0 0 20px 0">
                <Header title="DASHBOARD" subtitle="Welcome back!" />
                <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                >
                    {downloading ? "Downloading..." : (
                        <>
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Download Database
                        </>
                    )}
                </Button>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Number of Students Over The Years
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Student Gender Data
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <PieChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Dashboard;