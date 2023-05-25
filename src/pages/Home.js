import React, { useEffect, useState } from 'react';
import { Typography, Link } from '@mui/material';

const Home = () => {
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleWindowResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div></div>
    // <div 
    //   className='flex flex-col w-full'
    //   style={{height: height - 82}}
    // >
    //   <Typography variant="h4" gutterBottom>
    //     Welcome to Integma
    //   </Typography>
    //   <Typography variant="body1" gutterBottom>
    //     Upon page load, you arrive at the authentication interface which offers options for both login and registration. 
    //     New users can initiate the registration process by providing their email and setting a secure password - the password 
    //     must consist of at least eight characters, including one uppercase letter and one numerical digit. 
    //     For existing users, they can access their account by entering their registered email and corresponding password.
    //   </Typography>
    //   <Typography variant="body1" gutterBottom>
    //     Upon successful authentication of the login request, you are greeted by the home page. 
    //     This page provides details to help guide unexperienced users through the softwares functionalities.
    //   </Typography>
    //   {/* Continue the text in a similar way */}
    //   <Typography variant="body1" gutterBottom>
    //     The first tab you are prompted to visit is the the resource drop-down menu tab. Clicking will show the resource tabs 
    //     within the software which currently include <Link href="https://github.com/uJenDev/BachelorProject/tree/main/src/features/Materials">Materials</Link>, 
    //     <Link href="https://github.com/uJenDev/BachelorProject/tree/main/src/features/Tools">Tools</Link> and 
    //     <Link href="https://github.com/uJenDev/BachelorProject/tree/main/src/features/Coolants">Coolants</Link>. 
    //     Selecting one of the three will reroute the user to a new page utilising the URL /"resource".
    //   </Typography>
    //   Continue the text in a similar way
    // </div>
  );
};

export default Home;
