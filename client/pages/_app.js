import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ Component, pageProps}) => {
    return (
        <div>
            <h1>Header!</h1>
            <Component {...pageProps} />
        </div>
    )
} 