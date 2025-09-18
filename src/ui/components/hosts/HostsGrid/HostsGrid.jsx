import React from 'react';
import HostsCard from "../HostsCard/HostCard.jsx";
import {Grid} from "@mui/material";

const HostsGrid = ({hosts, onEdit, onDelete}) => {
    return (
        <Grid container spacing={{xs: 2, md: 3}}>
            {hosts.map((host) => (
                <Grid key={host.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                    <HostsCard host={host} onEdit={onEdit} onDelete={onDelete}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default HostsGrid;