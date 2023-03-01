// Import Hooks 
import { Link } from "react-router-dom";
// Import Custom Hook
import useFetch from "../components/useFetch";

const Blogs = () => {
    // Fetch Menu Data 
    let {data: blogs, isPending, error} = useFetch("/data/blogs.json");
    // Styles 
    let blogsContainer = {
        display: "flex",
        flexDirection: "column"
    } 

    return (
        <div className="blogs-container" style={blogsContainer}>
            {isPending && <p>Loading...</p>}
            {error && (
                <p style={{ color: "red" }}>Error: {error}</p>
            )}
            {blogs &&
                blogs.map((blog) => {
                    return (
                    <div className="blog" key={blog.id}>
                        <div className="content">
                            <div className="blog-info">
                                <p>
                                <i className="fa fa-calendar"></i>
                                {blog.dateAndTime}
                                </p>
                                <p>
                                <i className="fa-regular fa-user"></i>
                                {blog.publisher}
                                </p>
                            </div>
                            <div className="text">
                                <Link
                                    to={blog.blogTitle.replaceAll(" ", "-")}
                                    state={blog.id}
                                    className="title"
                                >
                                    {blog.blogTitle}
                                </Link>
                                <p>{blog.blogSubTitle}</p>
                            </div>
                            <Link
                                to={blog.blogTitle.replaceAll(" ", "-")}
                                state={blog.id}
                                className="read-more"
                            >
                                READ MORE
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    );
            })
            }
        </div>
    );
}

export default Blogs;