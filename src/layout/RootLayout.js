import { useEffect, useRef } from "react";
import { Link,  NavLink , Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
   //Toggle Menu
   let firstSpan = useRef();
   let secondSpan = useRef();
   let thirdSpan = useRef();
   let nav = useRef();
   let toggleMenu = () => {
      firstSpan.current.classList.toggle("toggle-top-span");
      secondSpan.current.classList.toggle("toggle-middle-span");
      thirdSpan.current.classList.toggle("toggle-bottom-span");

      nav.current.classList.toggle("toggle-nav")
   };
   
   // Change Header Style On Scrolling
   let header = useRef();
   let backTopBtn = useRef();

   window.onscroll = () => {
      if (window.scrollY >= 10) {
         // Change Header Styles
         header.current.classList.add("change-header-style");
         firstSpan.current.classList.add("change-header-spans-style");
         secondSpan.current.classList.add("change-header-spans-style");
         thirdSpan.current.classList.add("change-header-spans-style");
         // Show Back To Top Button 
         backTopBtn.current.classList.add("show-back-top-btn")
      } else {
         // Change Header Styles
         header.current.classList.remove("change-header-style");
         firstSpan.current.classList.remove("change-header-spans-style");
         secondSpan.current.classList.remove("change-header-spans-style");
         thirdSpan.current.classList.remove("change-header-spans-style");
         // Hide Back To Top Button 
         backTopBtn.current.classList.remove("show-back-top-btn")
      }
   }
   
   // Change Background And Text Colors Of The Header If Page Component is Rendered
   let location = useLocation();
   useEffect( () => {
      if (header.current) { 
         if (location.pathname !== "/" ) {
            header.current.classList.add("header-pages-style");
            firstSpan.current.classList.add("change-header-spans-style");
            secondSpan.current.classList.add("change-header-spans-style");
            thirdSpan.current.classList.add("change-header-spans-style");
         } else if (header.current.classList.contains("header-pages-style")) {
               header.current.classList.remove("header-pages-style");
               firstSpan.current.classList.remove("change-header-spans-style");
               secondSpan.current.classList.remove("change-header-spans-style");
               thirdSpan.current.classList.remove("change-header-spans-style");
            }
      }
   }, [header.current, location.pathname])

   //Back to top button
   let toTop = () => {
      window.scrollTo({top: 0, behavior: "smooth"})
   };


   return (
      <div className="root-layout">
         <header ref={header}>
            <div className="container">
               <Link to="/" className="logo">
                  <h1>
                     Foodie<span></span>
                  </h1>
               </Link>
               <nav>
                  <div className="toggle-menu" onClick={toggleMenu}>
                     <span ref={firstSpan}></span>
                     <span ref={secondSpan}></span>
                     <span ref={thirdSpan}></span>
                  </div>
                  <ul ref={nav}>
                     <li>
                        <NavLink to="/" className="active" onClick={toggleMenu}>
                           Home
                        </NavLink>
                     </li>
                     <li>
                        <a href="/#about" onClick={toggleMenu}>About</a>
                     </li>
                     <li>
                        <NavLink to="menu" onClick={toggleMenu}>Menu</NavLink>
                     </li>
                     <li>
                        <NavLink to="blogs" onClick={toggleMenu}>Blog</NavLink>
                     </li>
                     <li>
                        <NavLink to="contact" onClick={toggleMenu}>Contact Us</NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="reservation"
                           className="main-btn resrv-btn"
                           onClick={toggleMenu}
                           >
                           Reservation
                        </NavLink>
                     </li>
                  </ul>
               </nav>
            </div>
         </header>
         <main>
            <Outlet />
         </main>
         <footer>
            <div className="container">
               <div className="social-links">
                  <Link to="#" className="logo">
                     <h2>
                        Foodie<span></span>
                     </h2>
                  </Link>
                  <p>
                     Financial experts support or help you to to find out which
                     way you can raise your funds more.
                  </p>
                  <ul>
                     <li>
                        <Link to="#">
                           <i className="fa fa-facebook"></i>
                        </Link>
                     </li>
                     <li>
                        <Link to="#">
                           <i className="fa fa-twitter"></i>
                        </Link>
                     </li>
                     <li>
                        <Link to="#">
                           <i className="fa fa-instagram"></i>
                        </Link>
                     </li>
                     <li>
                        <Link to="#">
                           <i className="fa fa-linkedin"></i>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className="opening-hours">
                  <h2 className="footer-head">Opening Hours</h2>
                  <p>Monday-Friday: 08:00-22:00</p>
                  <p>Tuesday 4PM: Till Mid Night</p>
                  <p>Saturday: 10:00-16:00</p>
               </div>
               <div className="contact-info">
                  <h2 className="footer-head">Contact Info</h2>
                  <p>+1 (062) 109-9222</p>
                  <p>Info@YourGmail24.com</p>
                  <p>
                     153 Williamson Plaza,<br></br>Maggieberg, MT 09514
                  </p>
               </div>
               <div className="news-offers">
                  <h2 className="footer-head">News Offers</h2>
                  <form action="">
                     <input type="email" placeholder="Your Email" />
                     <button type="submit">SUBSCRIBE</button>
                  </form>
               </div>
            </div>
            <div className="delivery-footer">
               <img
                  src={require("../images/delivery-boy.png")}
                  alt="Delivery Boy"
               />
            </div>
            <div className="copy-rights">
               <p>
                  Coded With &#9829; By {}
                  <a
                     href="https://osamaeid1.github.io/Portfolio/"
                     target="_blank"
                     rel="noreferrer"
                  >
                     Osama Eid
                  </a>
               </p>
            </div>
         </footer>
         <button className="back-top-btn" ref={backTopBtn} onClick={toTop}>
            <i className="fa fa-chevron-up"></i>
         </button>
      </div>
   );
}

export default RootLayout;