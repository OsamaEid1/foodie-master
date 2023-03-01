import { useLocation} from "react-router-dom";
// Import Fetch Component
import useFetch from "../components/useFetch";
//FontAwesome 
import 'font-awesome/css/font-awesome.min.css';

const BlogDetails = () => {
    // Get Blog's id from state prop of location
    let location = useLocation();

    // Fetch Blog Data
    let {data: blog, isPending, error} = useFetch("/data/blogs.json", location.state);

    return (
        <div className="blog-details">
            {isPending && <p>Loading...</p>}
            {error && (<p style={{ color: "red" }}>Error: {error}</p>)}
            { blog && (
                <div className="content" key={blog.id}>
                    <h1 className="title">{blog.text.title}</h1>
                    <div className="intro">
                        <h2>{blog.text.intro.head}</h2>
                        <p>{blog.text.intro.body}</p>
                    </div>
                    <div className="ingredients">
                        <h2>{blog.text.ingredients.head}</h2>
                        <dl>
                            <dt>{blog.text.ingredients.ingredient1}</dt>
                                <dd>{blog.text.ingredients.ingredient1Details}</dd>
                            <dt>{blog.text.ingredients.ingredient2}</dt>
                                <dd>{blog.text.ingredients.ingredient2Details}</dd>
                            <dt>{blog.text.ingredients.ingredient3}</dt>
                                <dd>{blog.text.ingredients.ingredient3Details}</dd>
                            <dt>{blog.text.ingredients.ingredient4}</dt>
                                <dd>{blog.text.ingredients.ingredient4Details}</dd>
                        </dl>
                    </div>
                    <div className="making">
                        <h2>{blog.text.making.head}</h2>
                        <dl>
                            <dt>{blog.text.making.step1}</dt>
                                <dd>{blog.text.making.step1Details}</dd>
                            <dt>{blog.text.making.step2}</dt>
                                <dd>{blog.text.making.step2Details}</dd>
                            <dt>{blog.text.making.step3}</dt>
                                <dd>{blog.text.making.step3Details}</dd>
                            <dt>{blog.text.making.step4}</dt>
                                <dd>{blog.text.making.step4Details}</dd>
                            <dt>{blog.text.making.step5}</dt>
                                <dd>{blog.text.making.step5Details}</dd>
                            <dt>{blog.text.making.step6}</dt>
                                <dd>{blog.text.making.step6Details}</dd>
                        </dl>
                    </div>
                    <hr/>
                    <ul className="blog-info">
                        <li>Published By: <span>{blog.publisher}</span></li>
                        <li>Category: <span>{blog.cat}</span></li>
                        <li>Date: <span>{blog.dateAndTime}</span></li>
                    </ul>
                </div>
            )
            }
        </div>
    );
}

export default BlogDetails;