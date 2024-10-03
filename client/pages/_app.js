import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser}) => {
    return (
        <div>
            <h1>Header! {currentUser.email}</h1>
            <Component {...pageProps} />
        </div>
    )
} 

AppComponent.getInitialProps = async (appContext) => {
    console.log(appContext);
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    const pageProps = await appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : {};
    console.log(pageProps);

    return {
        pageProps,
        ...data
    }
}

export default AppComponent;