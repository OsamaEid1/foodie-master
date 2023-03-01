// Form Component
import Form from "../components/FormComponent";

const Reservation = () => {
    return (
        <section className="reservation">
            <div className="container">
                <div className="head">
                    <h1>Book A <span>Table</span></h1>
                </div>
                <Form for="reservation" />
            </div>
        </section>
    );
}

export default Reservation;