import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import Product from './pages/Product/Product.jsx';
import {RouterProvider } from "react-router-dom";
import Slider from './components/Slider/Slider';
import ErrorBoundary from './components/ErrorBoundary';
import Success from './components/Success';



const Layout = () => {
  return (
    <div className="">
      <ErrorBoundary>

      <Navbar />
      <Outlet />
      <Footer />
      </ErrorBoundary>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "product/1",
        element: <Slider/>,
      },
      {
        path: "/success",
        element: <Success />,
      },

    ],
  },
]);

function App() {
  return (
    <div>
      

      <RouterProvider router={router} />

    </div>
  );
}

export default App;
