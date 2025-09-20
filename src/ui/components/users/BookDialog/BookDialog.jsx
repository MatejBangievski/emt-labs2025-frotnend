import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItemButton, ListItemText } from "@mui/material";
import userRepository from "../../../../repository/userRepository.js";

const BookDialog = ({ open, onClose, user }) => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (open && user) {
            userRepository.findAllReservations(user.username)
                .then(res => setReservations(res.data))
                .catch(err => console.error("Error fetching reservations:", err));
        }
    }, [open, user]);

    const handleBook = (accommodationId) => {
        userRepository.bookAccommodation(user.username, accommodationId)
            .then(() => {
                alert("Accommodation booked!");
                onClose();
            })
            .catch(err => console.error("Error booking accommodation:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Book Accommodation for {user?.username}</DialogTitle>
            <DialogContent>
                <List>
                    {reservations.map(acc => (
                        <ListItemButton key={acc.id} onClick={() => handleBook(acc.id)}>
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

export default BookDialog;
