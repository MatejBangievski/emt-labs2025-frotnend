import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // <-- use the context login
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const success = await login(formData.username, formData.password); // <-- call context login
        if (success) {
            navigate("/"); // redirect after login
        } else {
            setError("Invalid username or password");
        }

        setLoading(false);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h4" mb={3}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        <Button onClick={() => navigate("/register")} variant="text">
                            Don't have an account? Register
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
