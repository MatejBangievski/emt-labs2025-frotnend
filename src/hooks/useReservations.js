import { useEffect, useState } from "react";
import userRepository from "../repository/userRepository.js";

const useReservations = (username) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username) return;

        setLoading(true);

        userRepository
            .findAllReservations(username) // <-- call your userRepository method
            .then((res) => setReservations(res.data))
            .catch((err) => {
                console.error("Error fetching reservations:", err);
                setReservations([]); // reset on error
            })
            .finally(() => setLoading(false));
    }, [username]);

    return { reservations, loading };
};

export default useReservations;
