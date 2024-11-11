import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import App from "../components/App";
import Products from "../pages/Products";
import Users from "../pages/Users";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
            </Route>
        </>
    )
);

export default router;