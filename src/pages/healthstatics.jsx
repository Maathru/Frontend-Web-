import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import ApexCharts from 'react-apexcharts';
import { Search as SearchIcon } from '@mui/icons-material';
import Heading from "@/components/ui/heading";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid #ccc',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: '1px solid #000096',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '2px solid #000096',
  },
  '& .MuiInputBase-input': {
    color: 'black',
  },
});

const data = {
  crucialStats: {
    series: [
      { name: 'Rate of maternal health complications', data: [5, 10, 15, 10, 15, 20, 25] },
      { name: 'Rate of preterm births', data: [5, 7, 9, 8, 7, 10, 12] },
    ],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
      colors: ['#620084', '#8a3dff'],
      stroke: { curve: 'smooth' },
    },
  },
  vaccinationRates: {
    series: [{ name: 'Vaccination Rates', data: [100, 200, 300, 200, 300, 400, 500] }],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
      colors: ['#620084'], 
      stroke: { curve: 'smooth' }, 
    },
  },
  heightWeight: {
    series: [
      { name: 'Height', data: [100, 200, 300, 200, 300, 400, 500] },
      { name: 'Weight', data: [100, 150, 200, 250, 300, 350, 400] },
    ],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
      colors: ['#620084', '#8a3dff'],
      stroke: { curve: 'smooth' },
    },
  },
  differentDiseases: {
    series: [{ name: 'Disease Cases', data: [10, 20, 30, 40, 50, 60] }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5'] },
      colors: ['#620084'],
    },
  },
  maternalHealthConditions: {
    series: [25, 13, 12, 37, 13],
    options: {
      chart: { type: 'donut' },
      labels: ['Condition 1', 'Condition 2', 'Condition 3', 'Condition 4', 'Condition 5'],
      colors: ['#620084', '#8a3dff', '#9C33C1', '#6a1bff', '#A8B8D8'], 
    },
  },
};

const HealthStatistics = () => {
  const { t } = useTranslation('HealthStatistics');

  return (
    <Container>
      <Heading title={t("Health Statistics")} />
      
      <Box display="flex" alignItems="center" mb={2}>
        <StyledTextField
          label={t("Search")}
          variant="standard"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Crucial Statistics")}
              </Typography>
              <ApexCharts
                options={data.crucialStats.options}
                series={data.crucialStats.series}
                type="line"
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Vaccination Rates")}
              </Typography>
              <ApexCharts
                options={data.vaccinationRates.options}
                series={data.vaccinationRates.series}
                type="line"
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Height, Weight Over Time For Children")}
              </Typography>
              <ApexCharts
                options={data.heightWeight.options}
                series={data.heightWeight.series}
                type="line"
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}> {/* Margin bottom of 20px */}
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Different Diseases In Different Regions")}
              </Typography>
              <ApexCharts
                options={data.differentDiseases.options}
                series={data.differentDiseases.series}
                type="bar"
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}> {/* Margin bottom of 20px */}
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Different Maternal Health Conditions")}
              </Typography>
              <ApexCharts
                options={data.maternalHealthConditions.options}
                series={data.maternalHealthConditions.series}
                type="donut"
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HealthStatistics;
