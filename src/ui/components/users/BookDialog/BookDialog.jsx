import React, { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, List, ListItemButton, ListItemText
} from "@mui/material";
import userRepository from "../../../../repository/userRepository.js";

const BookDialog = ({ open, onClose, user, onUpdated }) => {
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

    const handleBook = () => {
        if (!selectedId) return;
        userRepository.bookAccommodation(user.username, selectedId)
            .then(() => {
                onUpdated?.(); // refresh parent
                onClose();
            })
            .catch(err => {
                console.error("Error booking accommodation:", err);
                alert("Could not book this accommodation. It might have been booked by someone else.");
            });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Book Accommodation for {user?.username}</DialogTitle>
            <DialogContent>
                <List>
                    {reservations.map(acc => (
                        <ListItemButton
                            key={acc.id}
                            selected={selectedId === acc.id}
                            disabled={acc.booked} // disable if already booked
                            onClick={() => setSelectedId(acc.id)}
                        >
                            <ListItemText
                                primary={acc.booked ? `${acc.name} - Already booked by someone` : acc.name}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleBook}
                    disabled={!selectedId}
                    variant="contained"
                    color="primary"
                >
                    Book
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;
