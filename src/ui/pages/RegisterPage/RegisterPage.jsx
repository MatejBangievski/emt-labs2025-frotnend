import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";
import userRepository from "../../../repository/userRepository.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
        role: "ROLE_USER"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            // Map to backend fields
            const payload = {
                username: formData.username,
                password: formData.password,
                repeatPassword: formData.confirmPassword, // backend expects this
                name: formData.name,
                surname: formData.surname,
                role: "ROLE_USER" // default role
            };

            await userRepository.register(payload);
            navigate("/login"); // redirect to login on success
        } catch (err) {
            console.error(err);

            // Axios error handling
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        setError("Invalid input or passwords do not match");
                        break;
                    case 409:
                        setError("Username already exists");
                        break;
                    default:
                        setError("Registration failed. Please try again.");
                }
            } else {
                setError("Network error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h4" mb={3}>Register</Typography>
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
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Surname"
                            name="surname"
                            value={formData.surname}
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
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <Button onClick={() => navigate("/login")} variant="text">
                            Already have an account? Login
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
