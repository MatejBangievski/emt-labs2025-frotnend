import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import accommodationRepository from "../../../../repository/accommodationRepository.js";
import userRepository from "../../../../repository/userRepository.js";

const ReserveDialog = ({ open, onClose, user, onUpdated }) => {
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAcc, setSelectedAcc] = useState("");

    useEffect(() => {
        if (open) {
            accommodationRepository.findAllNonReserved()
                .then(res => setAccommodations(res.data))
                .catch(err => console.error("Error fetching free accommodations:", err));
        }
    }, [open]);

    const handleConfirm = () => {
        if (!selectedAcc) return;
        userRepository.reserveAccommodation(user.username, selectedAcc)
            .then(() => {
                onUpdated(); // refresh user data
                onClose();
            })
            .catch(err => console.error("Error reserving accommodation:", err));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Reserve Accommodation for {user?.username}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Select Accommodation</InputLabel>
                    <Select value={selectedAcc} onChange={e => setSelectedAcc(e.target.value)}>
                        {accommodations.map(acc => (
                            <MenuItem key={acc.id} value={acc.id}>{acc.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>Reserve</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReserveDialog;
