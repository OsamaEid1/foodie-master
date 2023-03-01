// Router 
import { Link } from "react-router-dom";
// svg Icons 
import PromoIcon1 from "../images/PromoIcon1.js";
import PromoIcon2 from "../images/PromoIcon2.js";
import PromoIcon3 from "../images/PromoIcon3.js";
import PromoIcon4 from "../images/PromoIcon4.js";
//FontAwesome 
import 'font-awesome/css/font-awesome.min.css';
// Custom Hook 
import useFetch from "../components/useFetch.js";

const Home = () => {
    // Fetch Popular Dishes Data 
    let {data: popularDishes, isPending: dishesIsPending, error: dishesError} = useFetch("/data/menu.json");
    // Get The First 3 Dishes Which Are The Popular 
    if (popularDishes) {
        [...popularDishes] = [popularDishes[0], popularDishes[1], popularDishes[2]];
    }
    // Fetch Latest Blogs
    let {data: blogs, isPending: blogsIsPending, error: blogsError} = useFetch("/data/blogs.json");
    // Get The First 3 Blogs Which Are The Latest
    if (blogs) {
        [...blogs] = [blogs[0], blogs[1], blogs[2]];
    }   

    return (
        <div className="home">
            {/* Start landing */}
            <section className="landing">
                <div className="container">
                    <div className="text">
                        <h3>Eat Then Work</h3>
                        <h1>Supper delicious Burger in town!</h1>
                        <p>Food is any substance consumed to provide nutritional support for an organism.</p>
                        <a className="main-btn Booking-btn" href="reservation">Book A Table</a>
                    </div>
                    <div className="banner">
                        <div className="image">
                            <img src={require("../images/hero-banner.png")} alt="" />
                        </div>
                    </div>
                </div>
                <img className="banner-shape" src={require("../images/hero-bg-shape.png")} alt="" />
            </section>
            {/* End landing */}

            {/* Start Promo */}
            <section className="promo">
                <div className="container">
                    <div className="promo-item">
                        <PromoIcon1 />
                        <h2>Italian Pizza</h2>
                        <p>Food is any substance consumed to provide nutritional support for an organism</p>
                        <img src={require("../images/promo-1.png")} alt="Pizza" />
                    </div>
                    <div className="promo-item">
                        <PromoIcon2 />
                        <h2>Burger</h2>
                        <p>Food is any substance consumed to provide nutritional support for an organism</p>
                        <img src={require("../images/promo-2.png")} alt="Pizza" />
                    </div>
                    <div className="promo-item">
                        <PromoIcon3 />
                        <h2>French Fry</h2>
                        <p>Food is any substance consumed to provide nutritional support for an organism</p>
                        <img src={require("../images/promo-3.png")} alt="Pizza" />
                    </div>
                    <div className="promo-item">
                        <PromoIcon4 />
                        <h2>Soft Drinks</h2>
                        <p>Food is any substance consumed to provide nutritional support for an organism</p>
                        <img src={require("../images/promo-4.png")} alt="Pizza" />
                    </div>
                </div>
            </section>
            {/* End Promo */}

            {/* Start About */}
            <section id="about">
                <div className="container">
                    <div className="image">
                        <img className="red-sale-shape" src={require("../images/sale-shape-red.png")} alt="Get Up To 50% Off Now" />
                        <img src={require("../images/about-img.png")} alt="Burger, Drink and Frize" />
                    </div>
                    <div className="text">
                        <h1>
                            Caferio, Burgers, and Best Pizzas <span>in Town!</span>
                        </h1>
                        <p>The restaurants in Hangzhou also catered to many northern Chinese who had fled south from Kaifeng during the Jurchen invasion of the 1120s, 
                            while it is also known that many restaurants were run by families.
                        </p>
                        <ul>
                            <li><i className="fa-solid fa-circle-check"></i>Delicious & Healthy Foods</li>
                            <li><i className="fa-solid fa-circle-check"></i>Specific Family And Kids Zone</li>
                            <li><i className="fa-solid fa-circle-check"></i>Music & Other Facilities</li>
                            <li><i className="fa-solid fa-circle-check"></i>Fastest Food Home Delivery</li>
                        </ul>
                        <a className="main-btn" href="menu">Order Now</a>
                    </div>
                </div>
            </section>
            {/* End About */}
            {/* Start Popular Dishes */}
            <section className="popular-dishes">
                <div className="container">
                    <div className="head">
                        <h1>Our Delicious <span>Foods</span></h1>
                        <h4>Popular Dishes</h4>
                    </div>
                    <div className="items">
                    { dishesIsPending && (<p>Loading...</p>) }
                    { dishesError && (<p style={{color: "red"}}>Error: {dishesError}</p>)}
                    {
                        popularDishes && popularDishes.map((dish) => {
                            return(
                            <div className="item" key={dish.id}>
                                <div className="image">
                                {
                                    dish.offer?
                                    (<span className="offer">{dish.offer && -dish.offer + "%"}</span>)
                                    :
                                    (<span className="offer" style={{backgroundColor: "transparent"}}></span>)
                                }
                                    <img src={dish.img} alt="" />
                                    <Link
                                        to={"menu/" + dish.name.replaceAll(" ", "-")}
                                        state={dish.id}
                                        className="order"
                                        >
                                            Order Now
                                    </Link>
                                </div>
                                <p className="cat">{dish.cat}</p>
                                <h2 className="item-name">{dish.name}</h2>
                                {( () => {
                                    if (!dish.offer) {
                                        return (<p className="price">PRICE: <span>&pound;{parseFloat(dish.price).toFixed(2)}</span></p>)
                                    } else {
                                        let price = dish.price - ((dish.offer / 100) * dish.price);
                                        return (<p className="price">PRICE: <span>&pound;{parseFloat(price).toFixed(2)}</span>  <strike>&pound;{parseFloat(dish.price).toFixed(2)}</strike></p>)
                                    }
                                }
                                )()}
                                </div>
                            )
                        })
                    }
                    </div>
                    <a href="menu" className="main-btn">See More</a>
                </div>
            </section>
            {/* End Menu */}

            {/* Start Cta */}
            <section className="cta">
                <div className="container">
                    <div className="text">
                        <h1>The Foodie Have Excellent Of <span>Quality Burgers!</span></h1>
                        <p>The restaurants in Hangzhou also catered to many northern Chinese who had fled south from Kaifeng during the Jurchen invasion of the 1120s, while it is also known that many restaurants were run by families.</p>
                        <a href="menu" className="main-btn">Order Now</a>
                    </div>
                    <div className="image">
                        <img className="white-sale-shape" src={require("../images/sale-shape.png")} alt="50% Off Now" />
                        <img src={require("../images/cta-banner.png")} alt="Burger" />
                    </div>
                </div>
            </section>
            {/* End Cta */}

            {/* Start Delivery */}
            <section className="delivery">
                <div className="container">
                    <div className="text">
                        <h1>A Moments Of Delivered On <span>Right Time</span> & Place</h1>
                        <p>The restaurants in Hangzhou also catered to many northern Chinese who had fled south from Kaifeng during the Jurchen invasion of the 1120s, while it is also known that many restaurants were run by families.</p>
                        <a href="menu" className="main-btn">Order Now</a>
                    </div>
                    <div className="image">
                        <img src={require("../images/delivery-boy.png")} alt="Delivery" />
                    </div>
                </div>
            </section>
            {/* End Delivery */}

            {/* Start Blog */}
            <section className="blogs">
                <div className="container">
                    <div className="head">
                        <h1>This Is All About <span>Foods</span></h1>
                        <h4>Latest Blog Posts</h4>
                    </div>
                    <div className="blogs-container">
                    { blogsIsPending && (<p>Loading...</p>) }
                    { blogsError && (<p style={{color: "red"}}>Error: {blogsError}</p>) }
                    {
                        blogs && blogs.map((blog) => {
                            if (blog.id <= 3) {
                                return (
                                <div className="blog" key={blog.id}>
                                    <div className="image">
                                        <span className="cat">{blog.cat}</span>
                                        <img src={blog.img} alt="" />
                                    </div>
                                    <div className="content">
                                        <div className="blog-info">
                                            <p><i className="fa fa-calendar"></i>{blog.dateAndTime}</p>
                                            <p><i className="fa-regular fa-user"></i>{blog.publisher}</p>
                                        </div>
                                        <div className="text">
                                            <Link
                                                to={"blogs/" + blog.blogTitle.replaceAll(" ", "-")}
                                                state={blog.id}
                                                className="title"
                                                >
                                                {blog.blogTitle}
                                            </Link>
                                            <p>{blog.blogSubTitle}</p>
                                        </div>
                                        <Link
                                            to={"blogs/" + blog.blogTitle.replaceAll(" ", "-")}
                                            state={blog.id}
                                            className="read-more"
                                            >
                                            READ MORE
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                                )
                            }
                        })
                    }
                    </div>
                    <a href="blogs" className="main-btn">See More</a>    
                </div>
            </section>
            {/* End Blog */}
        </div>
    );
}

export default Home;