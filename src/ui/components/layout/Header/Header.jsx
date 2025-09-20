import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
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
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ mr: 3 }}>
                        ACCOMMODATION SHOP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Link key={page.name} to={page.path} style={{ textDecoration: "none" }}>
                                <Button
                                    sx={{ my: 2, color: "white", display: "block"}}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {!user ? (
                        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography>Hi, {user.username}</Typography>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
