import {useEffect, useState} from "react";
import hostRepository from "../repository/hostRepository.js";
import countryRepository from "../repository/countryRepository.js";

const useHostDetails = (id) => {
    const [state, setState] = useState({
        "host": null,
        "country": null,
    });

    useEffect(() => {
        hostRepository
            .findById(id)
            .then((response) => {
                setState(prevState => ({...prevState, "host": response.data}));
                countryRepository
                    .findById(response.data.countryId)
                    .then((response) => {
                        setState(prevState => ({...prevState, "country": response.data}));
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, [id]);

    return state;
};

export default useHostDetails;