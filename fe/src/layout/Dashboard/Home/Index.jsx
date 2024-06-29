// material-ui

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import UniqueVisitorCard from './UniqueVisitorCard';

import axios from 'axios';
import { useEffect, useState } from 'react';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const numberToVND = (number) => {
    //check if number is string
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export default function DashboardDefault() {
    const [countCustomer, setCountCustomer] = useState(0);
    const [countOrder, setCountOrder] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    //load customer
    const loadCustomer = async () => {
        try {
            const response = await axios.get(`/customer`);
            setCountCustomer(response.data.length);

        } catch (error) {
            console.error(error);
        }
    }

    const loadOrder = async () => {
        try {
            const response = await axios.get(`/order`);
            setCountOrder(response.data.length);
            //total TotalPrice
            let total = 0;
            response.data.forEach((order) => {
                total += Number(order.TotalPrice);
            });
            setTotalIncome(total);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadCustomer();
        loadOrder();
    }, []);


    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Grid container rowSpacing={6} columnSpacing={4.5} sx={{}}>
                {/* row 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Page Views" count="356" percentage={59.3} extra="356" unit="views" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Users" count={countCustomer} percentage={70.5} extra="8,900" unit="customers" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Order" count={countOrder} percentage={27.4} isLoss color="warning" extra="1,943" unit="orders" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Sales" count={numberToVND(totalIncome)} percentage={27.4} isLoss color="warning" extra="$20,395" unit="VND" />
                </Grid>

                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                {/* row 2 */}
                <Grid item xs={12} md={12} lg={12}>
                    <UniqueVisitorCard />
                </Grid>

                {/* <Grid item xs={12} md={5} lg={4}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Income Overview</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <Box sx={{ p: 3, pb: 0 }}>
                            <Stack spacing={2}>
                                <Typography variant="h6" color="text.secondary">
                                    This Week Statistics
                                </Typography>
                                <Typography variant="h3">7,000,650 VND</Typography>
                            </Stack>
                        </Box>
                        <MonthlyBarChart />
                    </MainCard>
                </Grid> */}

            </Grid>
        </div>
    );
}