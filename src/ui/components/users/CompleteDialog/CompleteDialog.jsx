import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItemButton, ListItemText } from "@mui/material";
import userRepository from "../../../../repository/userRepository.js";

const CompleteDialog = ({ open, onClose, user }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (open && user) {
            userRepository.findAllBookings(user.username)
                .then(res => setBookings(res.data))
                .catch(err => console.error("Error fetching bookings:", err));
        }
    }, [open, user]);

    const handleComplete = (accommodationId) => {
        userRepository.completeStay(accommodationId)
            .then(() => {
                alert("Stay completed!");
                onClose();
            })
            .catch(err => console.error("Error completing stay:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Complete Stay for {user?.username}</DialogTitle>
            <DialogContent>
                <List>
                    {bookings.map(acc => (
                        <ListItemButton key={acc.id} onClick={() => handleComplete(acc.id)}>
                            <ListItemText primary={acc.name} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CompleteDialog;
