import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [studentData, setStudentData] = useState([]);

    // Custom color mapping function based on year level
    const getColor = (bar) => {
        switch (bar.indexValue) {
            case "1st Year":
                return colors.greenAccent[400];
            case "2nd Year":
                return colors.yellowAccent[400];
            case "3rd Year":
                return colors.redAccent[400];
            case "4th Year":
                return colors.blueAccent[400];
            default:
                return colors.grey[500];
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/studentNumber")
            .then(response => {
                // Initialize an object to hold data grouped by school year
                const groupedData = {};
    
                // Process each student record
                response.data.forEach(student => {
                    const { _id, count } = student;
                    const { schoolYear, yearLevel } = _id; // Extract schoolYear from _id
    
                    // Check if the school year exists in grouped data
                    if (!groupedData[schoolYear]) {
                        // Initialize counts to 0
                        groupedData[schoolYear] = {
                            "1st Year": 0,
                            "2nd Year": 0,
                            "3rd Year": 0,
                            "4th Year": 0
                        };
                    }
                    // Set the count of students for the corresponding year level and school year
                    groupedData[schoolYear][yearLevel] = count;
                });
    
                // Sort schoolYear data in ascending order
                const sortedSchoolYears = Object.keys(groupedData).sort();
    
                // Transform grouped data into the required format for bar chart
                const transformedData = sortedSchoolYears.map(schoolYear => ({
                    schoolYear,
                    ...groupedData[schoolYear]
                }));
    
                // Update state with sorted and transformed data
                setStudentData(transformedData);
            })
            .catch(error => {
                console.error("Error fetching student data:", error);
            });
    }, []);
    
    const valueFormatter = (value) => Math.round(value);
    
    return (
        <ResponsiveBar
            data={studentData}
            theme={{
                // added
                axis: {
                  domain: {
                    line: {
                      stroke: colors.grey[100],
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                tooltip: {
                    container: {
                        color: colors.grey[500], // Set hover text color here
                    },
                },
              }}
              keys={["1st Year", "2nd Year", "3rd Year", "4th Year"]} // Define keys for each year level
              indexBy="schoolYear"
              groupMode="grouped"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.25}
              valueScale={{ type: 'linear', format: valueFormatter }} // Apply custom value formatter
              indexScale={{ type: 'band', round: true }}
              colors={(bar) => getColor({ indexValue: bar.id })}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: isDashboard ? undefined : "School Year",
                  legendPosition: 'middle',
                  legendOffset: 32,
                  truncateTickAt: 0
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: isDashboard ? undefined : "Number of Students",
                  legendPosition: 'middle',
                  legendOffset: -40,
                  truncateTickAt: 0
              }}
              enableLabel={false}
              enableGridY={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ theme: 'background' }}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemOpacity: 100,
                              }
                          }
                      ]
                  }
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
          />
      )
  }
  
  export default BarChart;