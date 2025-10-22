// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/countryList";
import City from "./components/City";
import Form from "./components/Form";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./hooks/FakeAuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/app",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Navigate replace to="cities" />,
        },
        {
          path: "cities",
          children: [
            {
              index: true,
              element: <CityList />,
            },
            {
              path: ":id",
              element: <City />,
            },
          ],
        },

        {
          path: "countries",
          element: <CountryList />,
        },
        {
          path: "form",
          element: <Form />,
        },
      ],
    },
    {
      path: "/pricing",
      element: <Pricing />,
    },
    {
      path: "/product",
      element: <Product />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/app" element={<AppLayout />}>
  //       {" "}
  //       <Route
  //         index
  //         element={<CityList isLoading={isLoading} cities={cities} />}
  //       />
  //       <Route
  //         path="cities"
  //         element={<CityList isLoading={isLoading} cities={cities} />}
  //       />
  //       <Route
  //         path="countries"
  //         element={<CountryList isLoading={isLoading} cities={cities} />}
  //       />
  //       <Route path="form" element={<p>Form</p>} />
  //     </Route>

  //     <Route path="/pricing" element={<Pricing />} />
  //     <Route path="/product" element={<Product />} />
  //     <Route path="/login" element={<Login />} />

  //     <Route path="*" element={<PageNotFound />} />
  //   </Routes>
  // </BrowserRouter>

  return (
    <CityProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CityProvider>
  );
}

export default App;
