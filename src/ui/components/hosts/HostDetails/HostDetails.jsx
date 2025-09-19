import React from 'react';
import {useNavigate, useParams} from "react-router";
import useHostDetails from "../../../../hooks/useHostDetails.js";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    Typography,
    Paper,
    Avatar,
    Stack,
    Breadcrumbs,
    Link,
} from "@mui/material";
import {
    ArrowBack,
    Place
} from "@mui/icons-material";

const HostDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {host, country} = useHostDetails(id);

    if (!host || !country) {
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
                        navigate("/hosts");
                    }}
                >
                    Hosts
                </Link>
                <Typography color="text.primary">{host.name} {host.surname}</Typography>
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
                            <Avatar
                                src={host.image || "/placeholder-host.jpg"}
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
                                {host.name} {host.surname}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                               Host details.
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Place/>}
                                    label={country.name}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ p: 2 }}
                                />
                            </Stack>

                            <Grid item xs={12} display="flex" justifyContent="flex-start">
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate("/hosts")}
                                    sx={{
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        px: 4, py: 1
                                    }}
                                >
                                    Back to Hosts
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default HostDetails;