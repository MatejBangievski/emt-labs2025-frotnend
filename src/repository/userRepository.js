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

    findAllBookings: async (username) => {
        return await axiosInstance.get(`/user/findAllBookings/${username}`);
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

    reserveAllAccommodations: async (username) => {
        return await axiosInstance.post(`/user/${username}/reserveAll`);
    },

    completeStay: async (accommodationId) => {
        return await axiosInstance.get(`/user/completeStay/${accommodationId}`);
    },

    cancelAllReservations: async (username) => {
        return await axiosInstance.get(`/user/cancelAllReservations/${username}`);
    },

    completeAllBookings: async (username) => {
        return await axiosInstance.get(`/user/completeAllBookings/${username}`);
    },

    getAllUsers: async () => {
        return await axiosInstance.get(`/user/all`);
    }
};

export default userRepository;
