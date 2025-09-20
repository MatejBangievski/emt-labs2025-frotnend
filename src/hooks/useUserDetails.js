import { useEffect, useState } from "react";
import userRepository from "../repository/userRepository.js";

const useUserDetails = (username) => {
    const [state, setState] = useState({
        user: null,
        reservations: [],
        bookings: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));

            try {
                const [userRes, reservationsRes, bookingsRes] = await Promise.all([
                    userRepository.findByUsername(username),
                    userRepository.findAllReservations(username),
                    userRepository.findAllBookings(username)
                ]);

                setState({
                    user: userRes.data,
                    reservations: reservationsRes.data || [],
                    bookings: bookingsRes.data || [],
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
                setState(prev => ({ ...prev, loading: false, error }));
            }
        };

        fetchData();
    }, [username]);

    return state;
};

export default useUserDetails;
