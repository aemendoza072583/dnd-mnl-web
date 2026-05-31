import { Route, Routes } from "react-router";

import AppLayout from "@/app/layouts/inventory/AppLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFoundPage from "@/apps/inventory/pages/NotFoundPage";
import ProductList from "@/apps/inventory/pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";

export default function InventoryRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/add" element={<AddProduct />} />

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}