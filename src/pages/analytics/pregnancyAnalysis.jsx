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

import PregnancyAnalysisByRegion from '@/components/analyticComponents/PregnancyAnalysisByRegion';
import BMIChart from '@/components/analyticComponents/BmiChart';
import DiseaseAnalysis from '@/components/analyticComponents/diseaseAnalysis';
import PregnancyCountByAge from '@/components/analyticComponents/PregnancyCountByAge';

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


const PregnancyAnalysis = () => {
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
                {t("Pregnancy Analysis")}
              </Typography>
                <PregnancyAnalysisByRegion />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Age Analysis")}
              </Typography>
              <PregnancyCountByAge />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {t("Disease Analysis")}
              </Typography>
              <DiseaseAnalysis />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}> 
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                {t("BMI Analysis")}
              </Typography>
              <BMIChart />
            </Box>
          </Paper>
        </Grid>
        {/*<Grid item xs={6} sx={{ mb: 2 }}> 
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
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default PregnancyAnalysis;
