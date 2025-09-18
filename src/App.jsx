import React from 'react';
import AccommodationsPage from "./ui/pages/AccommodationsPage/AccommodationsPage.jsx";
import HostsPage from "./ui/pages/HostsPage/HostsPage.jsx";
import CountriesPage from "./ui/pages/CountriesPage/CountriesPage.jsx";
import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import HomePage from "./ui/pages/HomePage/HomePage.jsx";
import AccommodationDetails from "./ui/components/accommodations/AccommodationDetails/AccommodationDetails.jsx";
import HostDetails from "./ui/components/hosts/HostDetails/HostDetails.jsx";
import CountryDetails from "./ui/components/countries/CountryDetails/CountryDetails.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="accommodations" element={<AccommodationsPage/>}/>
                    <Route path="accommodations/:id" element={<AccommodationDetails/>}/>
                    <Route path="hosts" element={<HostsPage/>}/>
                    <Route path="hosts/:id" element={<HostDetails/>}/>
                    <Route path="countries" element={<CountriesPage/>}/>
                    <Route path="countries/:id" element={<CountryDetails/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;