import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItemButton, ListItemText } from "@mui/material";
import userRepository from "../../../../repository/userRepository.js";

const CancelReservationDialog = ({ open, onClose, user }) => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (open && user) {
            userRepository.findAllReservations(user.username)
                .then(res => setReservations(res.data || []))
                .catch(err => console.error("Error fetching reservations:", err));
        }
    }, [open, user]);

    const handleCancel = (accommodationId) => {
        userRepository.cancelAccommodation(user.username, accommodationId)
            .then(() => {
                alert("Reservation canceled!");
                onClose();
            })
            .catch(err => console.error("Error canceling reservation:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Cancel Reservation for {user?.username}</DialogTitle>
            <DialogContent>
                {reservations.length === 0 ? (
                    <p>No reservations to cancel</p>
                ) : (
                    <List>
                        {reservations.map(acc => (
                            <ListItemButton key={acc.id} onClick={() => handleCancel(acc.id)}>
                                <ListItemText primary={acc.name} />
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelReservationDialog;
