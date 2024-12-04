import React from "react";
import { Container, Typography, Box, ThemeProvider, createTheme } from "@mui/material";
import learnmoreimg from "../assets/learnmorepg.png";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const LearnMorepg = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container
          sx={{
            width: "90%",  // Set container width to 90%
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 5,
            gap: 2,
            mb: 5,
          }}
        >
          <div className="flex justify-between mb-8">
            <div className="flex text-3xl text-[#5B5B5B] font-semibold">
              <IoIosArrowBack
                size={45}
                className="cursor-pointer"
                onClick={() => navigate(-1)} // Navigate back on click
              />
              <div className="col ml-3">
                <Typography variant="h4" component="h1" sx={{ textAlign: "left" }}>
                  Learn More About the Maathru Application
                </Typography>
              </div>
            </div>
          </div>

          <Typography
            variant="h5"
            component="h2"
            sx={{ marginTop: 3, textAlign: "center", alignSelf: "center" }}
          >
            Welcome to Maathru!
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 0,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "justify",
                flex: 1,
                maxWidth: { xs: "100%", sm: "60%" },
              }}
            >
              The Maathru application is a pioneering platform dedicated to enhancing maternal
              and child health in Sri Lanka by providing a comprehensive, user-friendly solution
              that connects expectant mothers, fathers, midwives, and healthcare professionals.
              Designed with a holistic approach, Maathru facilitates real-time communication, 
              integrates various health services, and offers educational resources to empower 
              users with vital information about prenatal and postnatal care. The application 
              fosters community engagement through forums, supports family involvement, and 
              prioritizes data security and privacy, ensuring a seamless healthcare experience. 
              By eliminating barriers to access and promoting preventive care, Maathru aims to 
              create a healthier future for families across the nation, ultimately transforming 
              the landscape of maternal and child healthcare.
            </Typography>
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "10%", sm: "35%" },
              }}
            >
              <img
                src={learnmoreimg}
                alt="Maathru Application"
                style={{ width: "85%", height: "auto" }}
              />
            </Box>
          </Box>

          <Typography
            variant="h6"
            component="h3"
            sx={{ textAlign: "left", fontWeight: "bold", mt: 4 }}
          >
            Application Overview
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify", mb: 3 }}>
            The Maathru application is a transformative digital platform designed to enhance maternal 
            and child health in Sri Lanka by addressing inefficiencies in the existing healthcare system. 
            It serves as a centralized hub for expectant mothers, fathers, midwives, and healthcare professionals, 
            providing easy access to essential services such as appointment scheduling, health tracking, and 
            educational resources. With an intuitive interface, Maathru ensures that users of all technological 
            backgrounds can navigate the platform effortlessly. The application promotes real-time communication 
            between parents and healthcare providers, facilitating timely support throughout the pregnancy journey. 
            Additionally, it fosters community engagement through discussion forums, allowing users to share experiences 
            and advice. With a strong emphasis on data security and privacy, Maathru empowers families to manage their 
            health proactively, ultimately contributing to a healthier future for mothers and children in Sri Lanka.
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Key Features
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 4,
              textAlign: "left",
              mb: 3,
            }}
          >
            <li>
              <Typography variant="body1">
                <strong>User-Friendly Interface:</strong> Designed for ease of use,
                ensuring that all users can navigate the application effortlessly.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Role-Based Access:</strong> Tailored functionalities for
                different user roles:
                <Box component="ul" >
                  <li>Parents: Access to child health tracking and midwife communication.</li>
                  <li>Midwives: Efficient scheduling and management of home visits.</li>
                  <li>Doctors: Overview of patient health records and clinic schedules.</li>
                  <li>Admins: Management of users, blog approvals, and health statistics.</li>
                </Box>
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Health Tracking:</strong> Parents can monitor their child's growth and vaccination schedules, ensuring timely healthcare interventions.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Midwife Scheduling:</strong> Streamlined management of midwife visits enhances the experience for both midwives and parents.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Educational Resources:</strong> Access to informative articles and discussion forums to educate users about maternal health.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Community Engagement:</strong> Users can interact through forums, share experiences, and support each other in their journeys.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Bilingual Support:</strong> Available in both Sinhala and English, making it accessible to a wider audience.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Responsive Design:</strong> Mobile-friendly interface allows users to access information and services on-the-go.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "normal" }}>
            Join Us in Improving Maternal Health!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify", mb: 4 }}>
            By using the Maathru application, you are contributing to a healthier
            future for mothers and children in Sri Lanka. Together, we can make a
            difference!
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default LearnMorepg;