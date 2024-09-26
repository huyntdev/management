// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./style/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./components/layouts/LayoutMain.tsx";
import { ToastContainer } from "react-toastify";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const ProductPage = lazy(() => import("./pages/product"));
const SettingPage = lazy(() => import("./pages/setting"));

const router = createBrowserRouter([
  {
    element: <LayoutMain></LayoutMain>,
    children: [
      {
        path: "/",
        element: <DashboardPage></DashboardPage>,
      },
      {
        path: "/products",
        element: <ProductPage></ProductPage>,
      },
      {
        path: "/settings",
        element: <SettingPage></SettingPage>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Suspense fallback={<p></p>}>
    <App>
      <RouterProvider router={router}></RouterProvider>
    </App>
    <ToastContainer draggablePercent={60} />
  </Suspense>
  // </StrictMode>
);
