import axios from "axios";

// request from component
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
 
  return <h1>Landing Page</h1>;
};


// request from getInitialProps
LandingPage.getInitialProps = async () => {
    // const response = await axios.get('/api/users/currentuser');

    // return response.data ;

    console.log('Landing Page getInitialProps');
    return {};
}

export default LandingPage;

