import { Route, Routes } from "react-router";
import POSPage from "../pages/POSPage";


export default function POSRoutes() {
    return (
        <Routes>
            <Route path="/" element={<POSPage />} />
        </Routes>
    );
}