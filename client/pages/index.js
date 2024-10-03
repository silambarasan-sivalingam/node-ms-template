import buildClient from "../api/build-client";

// request from component
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });

  return <h1>Landing Page</h1>;
};


// request from getInitialProps
LandingPage.getInitialProps = async ({ context }) => {
  const { data } = await buildClient({ context }).get("/api/users/currentuser");

  return data;
}

export default LandingPage;

