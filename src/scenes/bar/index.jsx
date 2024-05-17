import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
    return (
        <Box m="20px">
            <Header title="Student Number History" subtitle={"Monitor the number of students over the years."} />
            <Box height={"75vh"}>
                <BarChart />
            </Box>
        </Box>
    )
}

export default Bar;