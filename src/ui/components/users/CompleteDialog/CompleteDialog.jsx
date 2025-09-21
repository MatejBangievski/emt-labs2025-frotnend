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

const CompleteDialog = ({ open, onClose, user, onUpdated }) => {
    const [bookings, setBookings] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (open && user) {
            userRepository.findAllBookings(user.username)
                .then(res => setBookings(res.data || []))
                .catch(err => console.error("Error fetching bookings:", err));
            setSelectedId(null); // reset selection
        }
    }, [open, user]);

    const handleComplete = () => {
        if (!selectedId) return;
        userRepository.completeStay(selectedId)
            .then(() => {
                onUpdated?.(); // refresh parent
                onClose();
            })
            .catch(err => console.error("Error completing stay:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Complete Stay for {user?.username}</DialogTitle>
            <DialogContent>
                {bookings.length === 0 ? (
                    <Typography color="text.secondary">No bookings to complete</Typography>
                ) : (
                    <List>
                        {bookings.map(acc => (
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
                    onClick={handleComplete}
                    disabled={!selectedId}
                    variant="contained"
                    color="success"
                >
                    Complete Stay
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CompleteDialog;
