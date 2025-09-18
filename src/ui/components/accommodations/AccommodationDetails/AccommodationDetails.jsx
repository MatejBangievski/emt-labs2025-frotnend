import React from 'react';
import {useNavigate, useParams} from "react-router";
import useAccommodationDetails from "../../../../hooks/useAccommodationDetails.js";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Typography,
    Paper,
    Avatar,
    Stack,
    Rating,
    Breadcrumbs,
    Link
} from "@mui/material";
import {
    ArrowBack,
    Category,
    Factory,
    Star,
    ShoppingCart,
    FavoriteBorder,
    Share
} from "@mui/icons-material";

const AccommodationDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {accommodation, host} = useAccommodationDetails(id);

    if (!accommodation || !host) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/accommodations");
                    }}
                >
                    Accommodations
                </Link>
                <Typography color="text.primary">{accommodation.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
                        }}>
                            <Avatar
                                src={accommodation.image || "/placeholder-accommodation.jpg"}
                                variant="rounded"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {accommodation.name}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Welcome to a cozy and inviting accommodation.
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Category />}
                                    label={accommodation.category}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ p: 2 }}
                                />
                                <Chip
                                    icon={<Person />}
                                    label={host.name}
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ p: 2 }}
                                />
                                <Chip
                                    icon={<Home />}
                                    label={`${accommodation.numRooms} room${accommodation.numRooms === 1 ? '' : 's'}`}
                                    variant="outlined"
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate("/accommodations")}
                        >
                            Back to Accommodations
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AccommodationDetails;