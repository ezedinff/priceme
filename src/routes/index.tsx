import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Login";
import RequireAuth from "../components/RequireAuth";
import CalculatorPage from "../pages/Calculator";
import * as React from "react";
import PrivateLayout from "../components/PrivateLayout";
import PageNotFound from "../pages/Notfound";
import FavoritesPage from "../pages/Favorites";

const PriceMeRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateLayout />}>
                <Route
                    path="/calculator"
                    element={
                        <RequireAuth>
                            <CalculatorPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/favourites"
                    element={
                        <RequireAuth>
                            <FavoritesPage />
                        </RequireAuth>
                    }
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>)
}

export default PriceMeRoutes;
