// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider} from "react-router-dom";
// Layout 
import RootLayout from "./layout/RootLayout";
import BlogsLayout from "./layout/BlogsLayout";
// Pages 
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
// Components
import {formValidation} from "./components/FormComponent";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} /> 
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:item" element={<Order />} action={formValidation} />
        <Route path="blogs" element={<BlogsLayout />}>
            <Route index element={<Blogs />} />
            <Route path=":blogTitle" element={<BlogDetails />} />
        </Route>
        <Route path="contact" element={<Contact />} action={formValidation} />
        <Route path="reservation" element={<Reservation />} action={formValidation} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;