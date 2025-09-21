import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Stack
} from "@mui/material";
import userRepository from "../../../repository/userRepository.js";
import UserCard from "../../components/users/UserCard/UserCard.jsx";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userRepository.getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Users</Typography>
            <Stack spacing={3}>
                {users.map(user => (
                    <UserCard key={user.username} username={user.username} />
                ))}
            </Stack>
        </Box>
    );
};

export default UsersPage;
