import axiosInstance from "../axios/axios.js";

const userRepository = {
    register: async (data) => {
        return await axiosInstance.post("/user/register", data);
    },

    login: async (data) => {
        return await axiosInstance.post("/user/login", data);
    },

    findByUsername: async (username) => {
        return await axiosInstance.get(`/user/${username}`);
    },

    findStayingAccommodation: async (username) => {
        return await axiosInstance.get(`/user/findStayingAccommodation/${username}`);
    },

    reserveAccommodation: async (username, accommodationId) => {
        return await axiosInstance.post(`/user/${username}/reserve/${accommodationId}`);
    },

    cancelAccommodation: async (username, accommodationId) => {
        return await axiosInstance.post(`/user/${username}/cancel/${accommodationId}`);
    },

    bookAccommodation: async (username, accommodationId) => {
        return await axiosInstance.post(`/user/${username}/book/${accommodationId}`);
    },

    findAllReservations: async (username) => {
        return await axiosInstance.get(`/user/${username}/reservations`);
    },

    bookAllReservations: async (username) => {
        return await axiosInstance.post(`/user/${username}/bookAll`);
    },

    getAllUsers: async () => {
        return await axiosInstance.get(`/user/all`);
    }
};

export default userRepository;
