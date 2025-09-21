import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "/src/context/AuthContext.jsx";

const pages = [
    { path: "/", name: "home" },
    { path: "/accommodations", name: "accommodations" },
    { path: "/hosts", name: "hosts" },
    { path: "/countries", name: "countries" },
    { path: "/users", name: "users" }
];

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            gap: 4 // spacing between buttons
                        }}
                    >
                        {pages.map((page) => (
                            <Link key={page.name} to={page.path} style={{ textDecoration: "none" }}>
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        fontSize: "1.1rem", // bigger font
                                        textTransform: "capitalize" // keep names clean
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {!user ? (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                            sx={{ fontSize: "1rem", ml: 4 }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 4 }}>
                            <Typography>Hi, {user.username}</Typography>
                            <Button
                                color="inherit"
                                onClick={logout}
                                sx={{ fontSize: "1rem" }}
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
