// import { BrowserRouter, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/countryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./hooks/FakeAuthContext";
import { lazy, Suspense } from "react";

// import ProtectedRoute from "./pages/ProtectedRoute";
// import Product from "./pages/product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Product = lazy(() => import("./pages/product"));
const Pricing = lazy(() => import("./pages/pricing"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
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
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </CityProvider>
  );
}

export default App;
