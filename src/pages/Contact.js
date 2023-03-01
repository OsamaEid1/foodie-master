// Import Form Component
import Form from "../components/FormComponent";

const Contact = () => {
    return ( 
        <section className="contact">
            <div className="container">
                <div className="head">
                    <h1>Contact <span>Us</span></h1>
                </div>
                <Form for="contact" />
            </div>
        </section>
    );
}

export default Contact;