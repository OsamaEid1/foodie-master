import { Outlet } from "react-router-dom";

const BlogsLayout = () => {
    return (
    <section className="blogs">
        <div className="container">
            <div className="head">
            <h1>
                Our <span>Blogs</span>
            </h1>
            </div>
            <Outlet />
        </div>
    </section>
    );
}

export default BlogsLayout;