import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import ReserveDialog from "../ReserveDialog/ReserveDialog.jsx";
import BookDialog from "../BookDialog/BookDialog.jsx";
import CompleteDialog from "../CompleteDialog/CompleteDialog.jsx";
import CancelReservationDialog from "../CancelReservationDialog/CancelReservationDialog.jsx";
import userRepository from "../../../../repository/userRepository.js";
import useUserDetails from "../../../../hooks/useUserDetails.js";

const UserCard = ({ username }) => {
    const { user, reservations, bookings, isLoading, hasError, refresh } = useUserDetails(username);

    const [reserveOpen, setReserveOpen] = useState(false);
    const [bookOpen, setBookOpen] = useState(false);
    const [completeOpen, setCompleteOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);

    // Bulk actions
    const handleBulkReserve = async () => {
        try {
            await userRepository.reserveAllAccommodations(username);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const handleBulkBook = async () => {
        try {
            await userRepository.bookAllReservations(username);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const handleBulkComplete = async () => {
        try {
            await userRepository.completeAllBookings(username);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const handleBulkCancel = async () => {
        try {
            await userRepository.cancelAllReservations(username);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <Typography>Loading {username}...</Typography>;
    if (hasError) return <Typography color="error">Failed to load {username}</Typography>;
    if (!user) return null;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography>Full Name: {user.name} {user.surname}</Typography>
                <Typography variant="body2">Role: {user.role}</Typography>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>Reservations:</Typography>
                {reservations?.length ? (
                    reservations.map(r => <Typography key={r.id}>• {r.name}</Typography>)
                ) : <Typography color="text.secondary">No reservations</Typography>}

                <Typography variant="subtitle1" sx={{ mt: 2 }}>Bookings:</Typography>
                {bookings?.length ? (
                    bookings.map(b => <Typography key={b.id}>• {b.name}</Typography>)
                ) : <Typography color="text.secondary">No bookings</Typography>}

                {/* Single actions */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => setReserveOpen(true)}>Reserve</Button>
                    <Button variant="contained" color="secondary" onClick={() => setBookOpen(true)}>Book</Button>
                    <Button variant="contained" color="success" onClick={() => setCompleteOpen(true)}>Complete</Button>
                    <Button variant="contained" color="error" onClick={() => setCancelOpen(true)}>Cancel</Button>
                </Stack>

                {/* Bulk actions */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleBulkReserve}>Reserve All</Button>
                    <Button variant="outlined" color="secondary" onClick={handleBulkBook}>Book All</Button>
                    <Button variant="outlined" color="success" onClick={handleBulkComplete}>Complete All</Button>
                    <Button variant="outlined" color="error" onClick={handleBulkCancel}>Cancel All</Button>
                </Stack>

                {/* Dialogs with refresh on close */}
                <ReserveDialog
                    open={reserveOpen}
                    onClose={() => setReserveOpen(false)}
                    onUpdated={refresh}
                    user={user} />
                <BookDialog
                    open={bookOpen}
                    onClose={() =>  setBookOpen(false)}
                    onUpdated={refresh}
                    user={user} />
                <CompleteDialog
                    open={completeOpen}
                    onClose={() => setCompleteOpen(false)}
                    onUpdated={refresh}
                    user={user} />
                <CancelReservationDialog
                    open={cancelOpen}
                    onClose={() =>  setCancelOpen(false)}
                    onUpdated={refresh}
                    user={user} />
            </CardContent>
        </Card>
    );
};

export default UserCard;
