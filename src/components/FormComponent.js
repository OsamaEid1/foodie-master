import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

const FormComponent = (props) => {
    // Detect which Form Is Requested For
    let order, reservation, contact;
    if (props.for === "order") {
        order = true;
    } else if (props.for === "reservation") {
        reservation = true;
    } else if (props.for === "contact") {
        contact = true;
    }

    // Form Validation Result
    const data = useActionData();

    // Handle Changes
    // Inputs
    let [numOfSmallItems, setNumOfSmallItems] = useState(1);
    let [numOfMediumItems, setNumOfMediumItems] = useState(0);
    let [numOfLargeItems, setNumOfLargeItems] = useState(0);
    // CheckBoxes
    let [smallBoxChecked, setSmallBoxChecked] = useState(true);
    let [mediumBoxChecked, setMediumBoxChecked] = useState(false);
    let [largeBoxChecked, setLargeBoxChecked] = useState(false);

    // Set no. Of Items
    let handleInputChanges = (input, val) => {
        if (val >= 0) {
            if (input === "sm") {
                setNumOfSmallItems(val);
                if (smallBoxChecked === false) {
                    setSmallBoxChecked(true);
                }   
                if (val === 0) {
                    setSmallBoxChecked(false);
                }
            } else if (input === "med") {
                setNumOfMediumItems(val);
                if (mediumBoxChecked === false) {
                    setMediumBoxChecked(true);
                }
                if (val === 0) {
                    setMediumBoxChecked(false);
                }
            } else if (input === "lg") {
                setNumOfLargeItems(val);
                if (largeBoxChecked === false) {
                    setLargeBoxChecked(true);
                }
                if (val === 0) {
                    setLargeBoxChecked(false);
                }
            } else {
                console.log(Error("Invalid input name arg in handleInputChanges function call"));
            }
        }
    }
    // Set Checked OR Unchecked of every CheckBox
    let handleCheckBoxChanges = (box) => {
        if (box === "small") {
            setSmallBoxChecked(!smallBoxChecked);
        } else if (box === "medium") {
            setMediumBoxChecked(!mediumBoxChecked);
        } else if (box === "large"){
            setLargeBoxChecked(!largeBoxChecked);
        } else {
            console.error("Invalid input name arg in handleCheckBoxChanges function call");
        }
    }
    
    let totalCost;
    let fNameErr,
    lNameErr,
    adrsErr,
    phErr,
    locErr,
    CheckBoxesErr,
    dateErr,
    timeErr,
    guestsNumErr,
    msgErr,
    subjErr,
    emailErr;
    if (order) {
        // Calculate Total Cost In Real Time
        (
            () => {
                let smPrice = 0, medPrice = 0, lgPrice = 0;
                if (smallBoxChecked) {
                    smPrice = props.dish.price * numOfSmallItems; 
                    totalCost = smPrice;
                }
                if (mediumBoxChecked) {
                    medPrice = props.dish.medPrice * numOfMediumItems; 
                }
                if (largeBoxChecked) {
                    lgPrice = props.dish.lgPrice * numOfLargeItems; 
                }
                totalCost = smPrice + medPrice + lgPrice;
                if (props.dish.offer) {
                    let offer = (props.dish.offer / 100) * totalCost;
                    totalCost -= offer;
                }
            }
            )();
        // Inputs Errors
        (
            () => {
                if (data) {
                    if (data.name) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.fName) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.lName) {
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.address) {
                        adrsErr = {
                            border: "1px solid red",
                        };
                    }
                    if (data.phone) {
                        phErr = {
                            border: "1px solid red",
                        };
                    }
                    if (data.location) {
                        locErr = {
                            border: "1px solid red",
                        };
                    }
                    if (data.checkBox) {
                        CheckBoxesErr = {
                            border: "1px solid red",
                        };
                    }
                } 
            }
        )();
    } else if (reservation) {
        // Inputs Errors
        (
            () => {
                if (data) {
                    if (data.name) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.fName) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.lName) {
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.phone) {
                        phErr = {
                            border: "1px solid red",
                        };
                    }
                    if (data.date) {
                        dateErr = {
                            border: "1px solid red",
                        }
                    } 
                    if (data.time) {
                        timeErr = {
                            border: "1px solid red",
                        }
                    }
                    if (data.guestsNum) {
                        guestsNumErr = {
                            border: "1px solid red",
                        }
                    }
                } 
            }
        )();
    } else if (contact) {
        // Inputs Errors
        (
            () => {
                if (data) {
                    if (data.name) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.fName) {
                        fNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.lName) {
                        lNameErr = {
                            border: "1px solid red"
                        }
                    }
                    if (data.email) {
                        emailErr = {
                            border: "1px solid red",
                        };
                    }
                    if (data.subject) {
                        subjErr = {
                            border: "1px solid red",
                        }
                    } 
                    if (data.msg) {
                        msgErr = {
                            border: "1px solid red",
                        }
                    }
                } 
            }
        )();
    } else {
        console.log(Error("The Value OF 'for' Prop You Passed doesn't match with (order / reservation / contact)"));
    }
    // Set no. Of Persons 
    let [selected , setSelected] = useState(0);
    let handleSelect = (selected) => {
        setSelected(selected);
    };
    // Show Success Operation Message And Navigate User To Home Page
    let form = useRef();
    let sucOp = useRef();
    let navigate = useNavigate();
    useEffect(() => {
        if (data) {
            if (Object.keys(data).length === 0) {
                form.current.classList.add("hide");
                sucOp.current.classList.add("show");
                setTimeout(() => {
                    navigate("/");
                }, 3000)
            }
        }
    },[data])

    return (
        // style={formDisplaying}
        <div className="content">
            <Form method="post" action="" className="main-form" ref={form}>
                {/* Order Form */}
                {
                    order && (
                        <div className="form-content">
                            {/* This Input For Send Info To Form Validation Function */}
                            <input type="text" defaultValue="order" name="type" style={{display: "none"}} />
                            {/* End */}
                            <div className="info">
                                <h2>Info</h2>
                                <label className="name">
                                    Name
                                    <div className="input-group">
                                        <input type="text" name="f-name" placeholder="First" style={fNameErr} />
                                        <input type="text" name="l-name" placeholder="Last" style={lNameErr}/>
                                    </div>
                                    <p className="err-msg">{data && (data.name || data.fName || data.lName)}</p>
                                </label>
                                <label className="address">
                                    Address
                                    <input type="text" name="address" placeholder="Address In Details" style={adrsErr}/>
                                    <p className="err-msg">{data && data.address}</p>
                                </label>
                                <label className="phone">
                                    Phone
                                    <input type="tel" name="phone" placeholder="+2011 4201 4769" style={phErr}/>
                                    <p className="err-msg">{data && data.phone}</p>
                                </label>
                                <label className="location">
                                    Your Location
                                    <input type="text" name="location" style={locErr} />
                                    <p className="err-msg">{data && data.location}</p>
                                </label>
                            </div>
                            <hr/>
                            <div className="order-details">
                                <h2>Your Order</h2>
                                <p className="item-name">Item: <span>{props.dish.name + " "  + props.dish.cat}</span></p>
                                    <p>Size:</p>
                                <div className="order-size">
                                    <label className="small">
                                        <input type="checkbox" checked={smallBoxChecked} onChange={() => handleCheckBoxChanges("small")}  name="checkbox-small" value="small-size" style={CheckBoxesErr}/>
                                        <span>Small - &pound;{parseFloat(props.dish.price).toFixed(2)}</span>
                                        <input type="number" name="num-of-small-items" value={numOfSmallItems} onChange={(e) => handleInputChanges("sm",+e.target.value)} style={CheckBoxesErr}/>
                                    </label>
                                    <label className="medium">
                                        <input type="checkbox" checked={mediumBoxChecked} onChange={() => handleCheckBoxChanges("medium")}  name="checkbox-medium" value="medium" style={CheckBoxesErr}/>
                                        <span>Medium - &pound;{parseFloat(props.dish.medPrice).toFixed(2)}</span>
                                        <input type="number" name="num-of-medium-items" value={numOfMediumItems} onChange={(e) => handleInputChanges("med",+e.target.value)} style={CheckBoxesErr}/>
                                    </label>
                                    <label className="large">
                                        <input type="checkbox" checked={largeBoxChecked} onChange={() => handleCheckBoxChanges("large")}  name="checkbox-large" value="large" style={CheckBoxesErr}/>
                                        <span>Large - &pound;{parseFloat(props.dish.lgPrice).toFixed(2)}</span>
                                        <input type="number" name="num-of-large-items" value={numOfLargeItems} onChange={(e) => handleInputChanges("lg",+e.target.value)} style={CheckBoxesErr}/>
                                    </label>
                                </div>
                                <p className="err-msg">{data && data.checkBox}</p>
                            </div>
                            <hr/>
                            <div className="payment">
                                <h2>Payment</h2>
                                <p>Offer: <span>{ props.dish.offer ? props.dish.offer + "%" : "No Offer"}</span></p>
                                <p>Total Cost: <span>&pound;{parseFloat(totalCost).toFixed(2)}</span></p>
                            </div>
                        </div>
                    )
                }
                {/* Reservation Form */}
                {
                    reservation && (
                        <div className="form-content">
                            {/* This Input For Send Info To Form Validation Function */}
                            <input type="text" defaultValue="reservation" name="type" style={{display: "none"}} />
                            {/* End */}
                            <label className="name">
                                Name
                                <div className="input-group">
                                    <input type="text" name="f-name" placeholder="First" style={fNameErr} />
                                    <input type="text" name="l-name" placeholder="Last" style={lNameErr}/>
                                </div>
                                <p className="err-msg">{data && (data.name || data.fName || data.lName)}</p>
                            </label>
                            <label className="phone">
                                Phone
                                <input type="tel" name="phone" placeholder="+2011 4201 4769" style={phErr}/>
                                <p className="err-msg">{data && data.phone}</p>
                            </label>
                            <label className="date">
                                Date
                                <input type="date" name="date" style={dateErr}/>
                                <p className="err-msg">{data && data.date}</p>
                            </label>
                            <label className="time">
                                Time
                                <input type="time" name="time" style={timeErr}/>
                                <p className="err-msg">{data && data.time}</p>
                            </label>
                            <label className="guestsNum">
                                Number Of Guests
                                <select style={guestsNumErr} value={selected} name="guestsNum" onChange={(e) => handleSelect(e.target.value)}>
                                    <option style={{color: "#777"}} value="0" key="0">Please select</option>
                                    <option value="1" key="1">One</option>
                                    <option value="2" key="2">Tow</option>
                                    <option value="3" key="3">Three</option>
                                    <option value="4" key="4">Four</option>
                                    <option value="5" key="5">Five</option>
                                    <option value="6" key="6">Sex</option>
                                    <option value="7" key="7">Seven</option>
                                    <option value="8" key="8">Eight</option>
                                </select>
                                <p className="err-msg">{data && data.guestsNum}</p>
                            </label>
                            <label className="comments">
                                Comments
                                <textarea cols="30" rows="7" name="comments" placeholder="Write Any Comments You Have here.."></textarea>
                            </label>
                        </div>  
                    )
                }
                {/* Contact Us Form */}
                {
                    contact && (
                        <div className="form-content">
                            {/* This Input For Send Info To Form Validation Function */}
                            <input type="text" defaultValue="contact" name="type" style={{display: "none"}} />
                            {/* End */}
                            <label className="name">
                                Name
                                <div className="input-group">
                                    <input type="text" name="f-name" placeholder="First" style={fNameErr} />
                                    <input type="text" name="l-name" placeholder="Last" style={lNameErr}/>
                                </div>
                                <p className="err-msg">{data && (data.name || data.fName || data.lName)}</p>
                            </label>
                            <label className="email">
                                Email
                                <input type="text" name="email" placeholder="info@example.com" style={emailErr}/>
                                <p className="err-msg">{data && data.email}</p>
                            </label>
                            <label className="subject">
                                Subject
                                <input type="text" name="subject" style={subjErr} placeholder="Food Testy"/>
                                <p className="err-msg">{data && data.subject}</p>
                            </label>
                            <label className="msg">
                                Message
                                <textarea cols="30" rows="7" name="msg" placeholder="Write Your Message Here.." style={msgErr}></textarea>
                                <p className="err-msg">{data && data.msg}</p>
                            </label>
                        </div>  
                    )
                }
                <button type="submit">Submit</button>
            </Form>  
               {/* style={sucOrderDisplaying} */}
            <div className="success-operation" ref={sucOp} >
                { order && (<img src={require("../images/delivery-boy.png")} alt="delivery" />)}
                { order && (<h3>You will have the order soon..</h3>)}
                { reservation && (<h3>Success Reservation, We Are happy To See You Soon..</h3>)}
                { contact && (<h3>Thanks For Contact Us We Will Take Your Feedback In consideration</h3>)}
            </div>
        </div>
    );
}

export const formValidation = async({request}) => {
    // Get Form Data 
    const data = await request.formData();
    // Get Type Of Form
    const formType = data.get("type"); 
    console.log("LLLLLLLLLLL",formType);
    // Set Object To Set Inputs Values In
    let submission = {};

    if (formType === "order") {        
        submission = {
            fName: data.get("f-name").replaceAll(" ", ""),
            lName: data.get("l-name").replaceAll(" ", ""),
            address: data.get("address").replaceAll(" ", ""),
            phone: data.get("phone").replaceAll(" ", ""),
            location: data.get("location").replaceAll(" ", ""),
            smallBoxChecked: data.get("checkbox-small"),
            mediumBoxChecked: data.get("checkbox-medium"),
            largeBoxChecked: data.get("checkbox-large"),
            numOfSmallItems: data.get("num-of-small-items"),
            numOfMediumItems: data.get("num-of-medium-items"),
            numOfLargeItems: data.get("num-of-large-items"),
        }
    } else if (formType === "reservation") {
        submission = {
            fName: data.get("f-name").replaceAll(" ", ""),
            lName: data.get("l-name").replaceAll(" ", ""),
            phone: data.get("phone").replaceAll(" ", ""),
            date: data.get("date"),
            time: data.get("time"),
            guestsNum: data.get("guestsNum"),
        }
    } else if (formType === "contact") {
        submission = {
            fName: data.get("f-name").replaceAll(" ", ""),
            lName: data.get("l-name").replaceAll(" ", ""),
            email: data.get("email").replaceAll(" ", ""),
            subject: data.get("subject"),
            msg: data.get("msg"),
        }
    } else {
        console.log(Error("The type of the form you passed is invalid !"))
    }
console.log("subm", submission);
// Regular Expressions for checking the inputs
const onlyStringReg = /[0-9!.,@#$%^&*(){}[\]_+=><\";:?\-~/\\|]/;
    const phoneReg =
    /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
    const locationUrlReg = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const someSpecialCharsReg = /[!@#$%^&*+\"?*~]/;
    
    console.log(emailReg.test(submission.email));
    // Handle Errors
    // Set Object To Set Inputs Errors In
    let errors = {};

    if (formType === "order") {
        // Handle Empty Inputs
        (
            () => {
                if (submission.fName === "" && submission.lName === "") {
                    errors.name = "Your Name Is Required !";
                } else if (submission.fName === "" ) {
                    errors.fName = "Your First Name Is Required !";
                } else if (submission.lName === "") {
                    errors.lName = "Your Last Name Is Required !";
                }
                if (submission.address === "") {
                    errors.address = "Your Address Is Required !";
                }
                if (submission.phone === "") {
                    errors.phone = "Your Phone Is Required !";
                }
                if (!submission.smallBoxChecked && !submission.mediumBoxChecked && !submission.smallBoxChecked) {
                    errors.checkBox = "You Must Choose the size of your meal !";
                }
            }
        )();
    // Handle Invalid Inputs
    (
        () => {
            if (
                (submission.fName !== "" &&
                onlyStringReg.test(submission.fName)) &&
                (submission.lName !== "" &&
                onlyStringReg.test(submission.lName))
            ) {
                errors.name = "Please Enter valid Names !"
            } else if (submission.fName !== "" && onlyStringReg.test(submission.fName)) {
                errors.fName = "Please Enter a valid First Name !"
            } else if (submission.lName !== "" && onlyStringReg.test(submission.lName)) {
                errors.lName = "Please Enter a valid Last Name !"
            }
            if (submission.address !== "" && someSpecialCharsReg.test(submission.address)) {
                errors.address = "Please Enter a valid Address !"
            }
            if (submission.phone !== "" && !phoneReg.test(submission.phone)) {
                errors.phone = "Please Enter a valid Phone Number !"
            }
            if (submission.location !== "" && !locationUrlReg.test(submission.location)) {
                errors.location = "Please Enter a valid Location !"
            }
        }
    )();
    } else if (formType === "reservation") {
        // Handle Empty Inputs
        (
            () => {
                if (submission.fName === "" && submission.lName === "") {
                    errors.name = "Your Name Is Required !";
                } else if (submission.fName === "" ) {
                    errors.fName = "Your First Name Is Required !";
                } else if (submission.lName === "") {
                    errors.lName = "Your Last Name Is Required !";
                }
                if (submission.phone === "") {
                    errors.phone = "Your Phone Is Required !";
                }
                if (submission.date === "") {
                    errors.date = "Reservation Date Is Required !";
                }
                if (submission.time === "") {
                    errors.time = "Reservation Time Is Required !";
                }
                if (submission.guestsNum === 0) {
                    errors.guestsNum = "Please Select The Number Of Guests Will Come With You !";
                }
            }
        )();
    // Handle Invalid Inputs
    (
        () => {
            if (
                (submission.fName !== "" &&
                onlyStringReg.test(submission.fName)) &&
                (submission.lName !== "" &&
                onlyStringReg.test(submission.lName))
            ) {
                errors.name = "Please Enter valid Names !"
            } else if (submission.fName !== "" && onlyStringReg.test(submission.fName)) {
                errors.fName = "Please Enter a valid First Name !"
            } else if (submission.lName !== "" && onlyStringReg.test(submission.lName)) {
                errors.lName = "Please Enter a valid Last Name !"
            }
            if (submission.phone !== "" && !phoneReg.test(submission.phone)) {
                errors.phone = "Please Enter a valid Phone Number !"
            }
        }
    )()
    } else if (formType === "contact") {
        // Handle Empty Inputs
        (
            () => {
                if (submission.fName === "" && submission.lName === "") {
                    errors.name = "Your Name Is Required !";
                } else if (submission.fName === "" ) {
                    errors.fName = "Your First Name Is Required !";
                } else if (submission.lName === "") {
                    errors.lName = "Your Last Name Is Required !";
                }
                if (submission.email === "") {
                    errors.email = "Your Email Is Required !";
                }
                if (submission.subject === "") {
                    errors.subject = "Subject Is Required !";
                }
                if (submission.msg === "") {
                    errors.msg = "Message Is Required !";
                }
            }
        )();
    // Handle Invalid Inputs
    (
        () => {
            if (
                (submission.fName !== "" &&
                onlyStringReg.test(submission.fName)) &&
                (submission.lName !== "" &&
                onlyStringReg.test(submission.lName))
            ) {
                errors.name = "Please Enter valid Names !"
            } else if (submission.fName !== "" && onlyStringReg.test(submission.fName)) {
                errors.fName = "Please Enter a valid First Name !"
            } else if (submission.lName !== "" && onlyStringReg.test(submission.lName)) {
                errors.lName = "Please Enter a valid Last Name !"
            }
            if (submission.subject !== "" && !isNaN(submission.subject)) {
                errors.subject = "Please Enter a Valid Subject !";
            }
            if (submission.email !== "" && !emailReg.test(submission.email)) {
                errors.email = "Please Enter a valid Email !"
            }
        }
    )()

    } else {
        console.log(Error("The type of the form you passed is invalid !"))
    }

    return errors;
}

export default FormComponent;