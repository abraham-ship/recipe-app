import { useState, useEffect } from 'react';

export const useGetUserID = () => {
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const id = window.localStorage.getItem('userID');
        if (id) {
            setUserID(id);
        }
    }, []);

    return userID;
};
