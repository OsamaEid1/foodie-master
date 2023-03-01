// Router 
import { Link } from "react-router-dom"
// Hooks 
import { useEffect, useRef } from "react";  
// Custom Hook 
import useFetch from "../components/useFetch";

// Import Menu CSS File
// import "../css/pages/menu.css";

const Menu = () => {
    // Fetch Menu Data 
    const {data: menu, isPending, error} = useFetch("/data/menu.json");

    //Filter Menu
    const filter = useRef();
    const items = useRef();

    const toggleActiveLi = (lis, clickedLi) => {
        lis.forEach((li) => {
            li.classList.remove("active-li");
        });
        clickedLi.classList.add("active-li");
    }
    useEffect(() => {
        if (filter.current) {
            let lis = Array.from(filter.current.children);
            lis.forEach((li) => {
                li.onclick = () => {
                    let itemsArr = Array.from(items.current.children);
                    if (li.innerText.toLowerCase() === "all") {
                        toggleActiveLi(lis,li);
                        itemsArr.forEach((item) => {
                            item.style.display = "block";
                        });
                    } else if (!li.classList.contains("active-li")) {
                        toggleActiveLi(lis,li);
                        itemsArr.forEach((item) => {
                            if (item.dataset.cat.toLowerCase() === li.innerText.toLowerCase()) {
                                item.style.display = "block";
                            } else {
                                item.style.display = "none";
                            }
                        });
                    }
                }
            });
        }
    }, [])

    return ( 
        <section className="menu">
            <div className="container">
                <div className="head">
                    <h1>Our <span>Menu</span></h1>
                </div>
                <ul className="filter" ref={filter}>
                    <li className="active-li">All</li>
                    <li>Pizza</li>
                    <li>Burger</li>
                    <li>Sandwich</li>
                    <li>Drink</li>
                </ul>
                { isPending && (<p>Loading...</p>) }
                { error && (<p style={{color: "red"}}>Error: {error}</p>)}
                <div className="items" ref={items}>
                {
                    menu && menu.map((dish) => {
                        return (
                        <div className="item" data-cat={dish.cat} key={dish.id}>
                            <div className="image">
                                {
                                    dish.offer? (<span className="offer">{dish.offer && -dish.offer + "%"}</span>):
                                    (<span className="offer" style={{backgroundColor: "transparent"}}></span>)
                                }
                                <img src={dish.img} alt="" />
                                <Link
                                    to={dish.name.replaceAll(" ", "-")}
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
            </div>
        </section>
    );
}

export default Menu;