import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return ( 
        <section className="not-found-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <h3>The page you are looking for does not exist !</h3>
            <Link to="/" className="main-btn">Go To Home</Link>
        </section>
    );
}

export default NotFoundPage;