import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItemButton, ListItemText } from "@mui/material";
import accommodationRepository from "../../../../repository/accommodationRepository.js";
import userRepository from "../../../../repository/userRepository.js";

const ReserveDialog = ({ open, onClose, user }) => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        if (open) {
            accommodationRepository.findAllNonReserved()
                .then(res => setAccommodations(res.data))
                .catch(err => console.error("Error fetching free accommodations:", err));
        }
    }, [open]);

    const handleReserve = (accommodationId) => {
        userRepository.reserveAccommodation(user.username, accommodationId)
            .then(() => {
                alert("Accommodation reserved!");
                onClose();
            })
            .catch(err => console.error("Error reserving accommodation:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Reserve Accommodation for {user?.username}</DialogTitle>
            <DialogContent>
                <List>
                    {accommodations.map(acc => (
                        <ListItemButton key={acc.id} onClick={() => handleReserve(acc.id)}>
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

export default ReserveDialog;
