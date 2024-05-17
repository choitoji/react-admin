import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const PieChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [studentGenderData, setStudentGenderData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/studentGenderCount")
            .then(response => {
                const genderCounts = response.data;
                const formattedData = [
                    { id: 'Male', label: 'Male', value: genderCounts.male },
                    { id: 'Female', label: 'Female', value: genderCounts.female },
                    { id: 'Prefer not to say', label: 'Prefer not to say', value: genderCounts.preferNotToSay }
                ];
                setStudentGenderData(formattedData);
            })
            .catch(error => {
                console.error("Error fetching student gender data:", error);
            });
    }, []);

    return (
        
        <ResponsivePie
        data={studentGenderData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
                    fill: colors.grey[100], // Set label color here
                },
            },
            tooltip: {
                container: {
                    color: colors.grey[500], // Set hover text color here
                },
            },
        }}
        sortByValue={true}
        innerRadius={0.5}
        activeOuterRadiusOffset={8}
        cornerRadius={5}
        colors={(pie) => {
            switch (pie.id) {
                case 'Male':
                    return colors.blueAccent[500];
                case 'Female':
                    return colors.redAccent[500];
                case 'Prefer not to say':
                    return colors.yellowAccent[700];
                default:
                    return colors.grey[500];
            }
        }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels= {isDashboard? false:true}
        arcLinkLabelsTextColor= {colors.grey[100]}
        arcLinkLabelsDiagonalLength={36}
        arcLinkLabelsStraightLength={36}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabel="value"
        arcLabelsTextColor={colors.grey[100]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: colors.grey[100],
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: colors.grey[100]
                        }
                    }
                ]
            }
        ]}
    />
    );
};

export default PieChart;
