// AboutUs.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../Styles/AboutUs.css';
import image1 from '../Images/cyb1.webp';
import image2 from '../Images/cyb2.jpg';
import image3 from '../Images/cyb3.jpg';

const AboutUs = () => {
  return (
    <div className="aboutUsContainer">
      <div className="textContainer">
        <Box flexGrow={1} maxWidth="600px" marginBottom="16px">
          <Typography variant="h4" gutterBottom>
            About Visitor Management System
          </Typography>
          <Typography variant="body1" gutterBottom>
            The Visitor Management System is a comprehensive solution designed to streamline and enhance the management of visitors in various settings such as offices, schools, hospitals, and more. It provides a secure and efficient way to register, track, and monitor visitors, ensuring a safe and organized environment.
          </Typography>
          <Typography variant="body1" gutterBottom>
            With the Visitor Management System, you can easily capture visitor details, including their names, contact information, purpose of visit, and check-in/check-out times. The system automates the registration process, allowing visitors to sign in electronically, print badges, and notify the host about their arrival.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Additionally, the system offers features like ID verification, visitor pre-registration, appointment scheduling, and real-time notifications. It helps improve security by identifying and flagging unauthorized visitors, managing visitor access permissions, and maintaining a digital record of visitor data for future reference.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The Visitor Management System simplifies visitor management workflows, reduces administrative overhead, and enhances the overall visitor experience. It ensures compliance with regulations and provides valuable insights through comprehensive reporting and analytics, enabling organizations to make informed decisions and ensure the safety and security of their premises.
          </Typography>
        </Box>
      </div>
      <div className="imageContainer">
        <img src={image1} alt="About Us " width={200} />
        <img src={image2} alt="About Us " width={200} />
        <img src={image3} alt="About Us" width={200} />
      </div>
    </div>
  );
};

export default AboutUs;
