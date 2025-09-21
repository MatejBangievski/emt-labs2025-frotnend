import { useEffect, useState, useCallback } from "react";
import userRepository from "../repository/userRepository.js";

const initialState = {
    user: null,
    reservations: [],
    bookings: [],
    loading: false,
    error: null
};

const useUserDetails = (username) => {
    const [state, setState] = useState(initialState);

    const fetchData = useCallback(async () => {
        if (!username) return;

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const [userRes, reservationsRes, bookingsRes] = await Promise.all([
                userRepository.findByUsername(username),
                userRepository.findAllReservations(username),
                userRepository.findAllBookings(username)
            ]);

            setState(prev => ({
                ...prev,
                user: userRes.data,
                reservations: reservationsRes.data || prev.reservations,
                bookings: bookingsRes.data || prev.bookings,
                loading: false,
                error: null
            }));
        } catch (error) {
            console.error("Error fetching user details:", error);
            setState(prev => ({
                ...prev,
                loading: false,
                error
            }));
        }
    }, [username]);

    useEffect(() => {
        if (!username) {
            setState(initialState);
            return;
        }
        fetchData();
    }, [username, fetchData]);

    return {
        ...state,
        isLoading: state.loading,
        hasError: !!state.error,
        refresh: fetchData
    };
};

export default useUserDetails;
