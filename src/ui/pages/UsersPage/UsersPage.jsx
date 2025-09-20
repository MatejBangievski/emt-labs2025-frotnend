import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, CircularProgress, Stack } from "@mui/material";
import userRepository from "../../../repository/userRepository.js";
import ReserveDialog from "../../components/users/ReserveDialog/ReserveDialog.jsx";
import BookDialog from "../../components/users/BookDialog/BookDialog.jsx";
import CompleteDialog from "../../components/users/CompleteDialog/CompleteDialog.jsx";
import useUserDetails from "../../../hooks/useUserDetails.js";

const UserCard = ({ username }) => {
    const { user, reservations, bookings, loading, error } = useUserDetails(username);
    const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
    const [bookDialogOpen, setBookDialogOpen] = useState(false);
    const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

    const handleBulkReserve = () => {
        userRepository.reserveAllAccommodations(username)
            .then(() => alert("All accommodations reserved!"))
            .catch(err => console.error(err));
    };

    const handleBulkBook = () => {
        userRepository.bookAllReservations(username)
            .then(() => alert("All reservations booked!"))
            .catch(err => console.error(err));
    };

    const handleBulkComplete = () => {
        userRepository.completeAllBookings(username)
            .then(() => alert("All bookings completed!"))
            .catch(err => console.error(err));
    };

    const handleBulkCancel = () => {
        userRepository.cancelAllReservations(username)
            .then(() => alert("All reservations canceled!"))
            .catch(err => console.error(err));
    };

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Typography>Loading {username}...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent>
                    <Typography color="error">Failed to load {username}</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography>Full Name: {user.name} {user.surname}</Typography>
                <Typography variant="body2">Role: {user.role}</Typography>

                {/* Reservations */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>Reservations:</Typography>
                {reservations?.length > 0 ? (
                    reservations.map(r => (
                        <Typography key={r.id} variant="body2">• {r.name}</Typography>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">No reservations</Typography>
                )}

                {/* Bookings */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>Bookings:</Typography>
                {bookings?.length > 0 ? (
                    bookings.map(b => (
                        <Typography key={b.id} variant="body2">• {b.name}</Typography>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">No bookings</Typography>
                )}

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => setReserveDialogOpen(true)}>Reserve</Button>
                    <Button variant="contained" color="secondary" onClick={() => setBookDialogOpen(true)}>Book</Button>
                    <Button variant="contained" color="success" onClick={() => setCompleteDialogOpen(true)}>Complete</Button>
                </Stack>

                {/* Bulk operations */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleBulkReserve}>Reserve All</Button>
                    <Button variant="outlined" color="secondary" onClick={handleBulkBook}>Book All</Button>
                    <Button variant="outlined" color="success" onClick={handleBulkComplete}>Complete All</Button>
                    <Button variant="outlined" color="error" onClick={handleBulkCancel}>Cancel All</Button>
                </Stack>

                {/* Dialogs */}
                <ReserveDialog open={reserveDialogOpen} onClose={() => setReserveDialogOpen(false)} user={user} />
                <BookDialog open={bookDialogOpen} onClose={() => setBookDialogOpen(false)} user={user} />
                <CompleteDialog open={completeDialogOpen} onClose={() => setCompleteDialogOpen(false)} user={user} />
            </CardContent>
        </Card>
    );
};

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
