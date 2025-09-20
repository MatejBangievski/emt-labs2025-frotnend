import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router";
import AccommodationsPage from "./ui/pages/AccommodationsPage/AccommodationsPage.jsx";
import HostsPage from "./ui/pages/HostsPage/HostsPage.jsx";
import CountriesPage from "./ui/pages/CountriesPage/CountriesPage.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import HomePage from "./ui/pages/HomePage/HomePage.jsx";
import LoginPage from "./ui/pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./ui/pages/RegisterPage/RegisterPage.jsx";
import UsersPage from "./ui/pages/UsersPage/UsersPage.jsx";
import AccommodationDetails from "./ui/components/accommodations/AccommodationDetails/AccommodationDetails.jsx";
import HostDetails from "./ui/components/hosts/HostDetails/HostDetails.jsx";
import CountryDetails from "./ui/components/countries/CountryDetails/CountryDetails.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="accommodations" element={<AccommodationsPage/>}/>
                        <Route path="accommodations/:id" element={<AccommodationDetails/>}/>
                        <Route path="hosts" element={<HostsPage/>}/>
                        <Route path="hosts/:id" element={<HostDetails/>}/>
                        <Route path="users" element={<UsersPage/>}/>
                        <Route path="countries" element={<CountriesPage/>}/>
                        <Route path="countries/:id" element={<CountryDetails/>}/>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;