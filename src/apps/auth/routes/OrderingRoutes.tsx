import { Route, Routes } from "react-router";
import OrderingPage from "../pages/OrderingPage";


export default function OrderingRoutes() {
    return (
        <Routes>
            <Route path="/" element={<OrderingPage />} />
        </Routes>
    );
}