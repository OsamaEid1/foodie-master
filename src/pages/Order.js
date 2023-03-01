// Router Functions
import { useLocation } from "react-router-dom";
// Custom Hook
import useFetch from "../components/useFetch";
// Form Component
import Form from "../components/FormComponent";

const Order = () => {
    // Get dish's id and collection from state property of location
    let location = useLocation();

    const {data: dish, isPending, error} = useFetch("/data/menu.json", location.state);

    // Fetch Dish Data
    return ( 
        <section className="order">
            <div className="container">
                <div className="head">
                    <h1>Order A <span>Meal</span></h1>
                </div>
                { isPending && <p>Loading...</p> }
                { error && (<p style={{ color: "red" }}>Error: {error}</p>) } 
                { dish && <Form for="order" dish={dish} /> }
            </div>
        </section>
    );
}

export default Order;