import { useEffect, useState } from "react";
import userRepository from "../repository/userRepository.js";

const useUserDetails = (username) => {
    const [state, setState] = useState({
        user: null,
    });

    useEffect(() => {
        if (!username) return;

        userRepository
            .findByUsername(username)
            .then((response) => {
                setState(prevState => ({ ...prevState, user: response.data }));
            })
            .catch((error) => console.error("Error fetching user:", error));
    }, [username]);

    return state;
};

export default useUserDetails;
