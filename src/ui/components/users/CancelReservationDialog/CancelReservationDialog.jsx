import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import userRepository from "../../../../repository/userRepository.js";

const CancelReservationDialog = ({ open, onClose, user, onUpdated }) => {
    const [reservations, setReservations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (open && user) {
            userRepository.findAllReservations(user.username)
                .then(res => setReservations(res.data || []))
                .catch(err => console.error("Error fetching reservations:", err));
            setSelectedId(null); // reset selection
        }
    }, [open, user]);

    const handleCancel = () => {
        if (!selectedId) return;
        userRepository.cancelAccommodation(user.username, selectedId)
            .then(() => {
                onUpdated?.(); // refresh parent (UserCard)
                onClose();
            })
            .catch(err => console.error("Error canceling reservation:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Cancel Reservation for {user?.username}</DialogTitle>
            <DialogContent>
                {reservations.length === 0 ? (
                    <Typography color="text.secondary">No reservations to cancel</Typography>
                ) : (
                    <List>
                        {reservations.map(acc => (
                            <ListItemButton
                                key={acc.id}
                                selected={selectedId === acc.id}
                                onClick={() => setSelectedId(acc.id)}
                            >
                                <ListItemText primary={acc.name} />
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button
                    onClick={handleCancel}
                    disabled={!selectedId}
                    variant="contained"
                    color="error"
                >
                    Cancel Reservation
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelReservationDialog;
