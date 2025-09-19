import React, {useEffect, useState} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import EditAccommodationDialog from "../EditAccommodationDialog/EditAccommodationDialog.jsx";
import DeleteAccommodationDialog from "../DeleteAccommodationDialog/DeleteAccommodationDialog.jsx";
import {useNavigate} from "react-router";
import hostRepository from "../../../../repository/hostRepository.js"

const AccommodationCard = ({accommodation, onEdit, onDelete}) => {
    const navigate = useNavigate();
    const [editAccommodationDialogOpen, setEditAccommodationDialogOpen] = useState(false);
    const [deleteAccommodationDialogOpen, setDeleteAccommodationDialogOpen] = useState(false);
    const [host, setHost] = useState(null);

    useEffect(() => {
        if (accommodation.hostId) {
            hostRepository.findById(accommodation.hostId)
                .then(response => setHost(response.data))
                .catch(error => console.error("Failed to load host:", error));
        }
    }, [accommodation.hostId]);


    return (
        <>
            <Card sx={{boxShadow: 3, borderRadius: 2, p: 1}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>{accommodation.name}</Typography>
                    <Typography variant="subtitle2">
                        {host ? `Host: ${host.name} ${host.surname}` : "Loading host..."}
                    </Typography>
                    <Typography variant="subtitle3">Number of Rooms: {accommodation.numRooms}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Reserved: {accommodation.isReserved ? "✅" : "❌"}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            Booked: {accommodation.isBooked ? "✅" : "❌"}
                        </Typography>
                    </Box>

                </CardContent>
                <CardActions sx={{justifyContent: "center"}}>
                    <Button
                        size="small"
                        color="info"
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                    >
                        Info
                    </Button>
                    <Box>
                        <Button
                            size="small"
                            color="warning"
                            startIcon={<EditIcon/>}
                            onClick={() => setEditAccommodationDialogOpen(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon/>}
                            onClick={() => setDeleteAccommodationDialogOpen(true)}
                        >
                            Delete
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            <EditAccommodationDialog
                open={editAccommodationDialogOpen}
                onClose={() => setEditAccommodationDialogOpen(false)}
                accommodation={accommodation}
                onEdit={onEdit}
            />
            <DeleteAccommodationDialog
                open={deleteAccommodationDialogOpen}
                onClose={() => setDeleteAccommodationDialogOpen(false)}
                accommodation={accommodation}
                onDelete={onDelete}
            />
        </>
    );
};

export default AccommodationCard;