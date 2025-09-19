import React from 'react';
import {useNavigate, useParams} from "react-router";
import useCountryDetails from "../../../../hooks/useCountryDetails.js";
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
    Share,
    Place
} from "@mui/icons-material";

const CountryDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {country} = useCountryDetails(id);

    if (!country) {
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
                        navigate("/countries");
                    }}
                >
                    Countries
                </Link>
                <Typography color="text.primary">{country.name}</Typography>
            </Breadcrumbs>

            <Paper
                   elevation={2}
                   sx={{
                       p: 4,
                       borderRadius: 4,
                       maxWidth: '70%',
                       minWidth: '70%',
                       mx: 'auto'}}
            >
                <Grid container spacing={4} sx={{alignItems: 'center'}}>
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
                            <Place
                                src={country.image || "/placeholder-country.jpg"}
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
                                {country.name}
                            </Typography>

                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                                {country.continent}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Country details.
                            </Typography>

                            <Grid item xs={12} display="flex" justifyContent="flex-start">
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate("/countries")}
                                    sx={{
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        px: 4, py: 1
                                    }}
                                >
                                    Back to Countries
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetails;