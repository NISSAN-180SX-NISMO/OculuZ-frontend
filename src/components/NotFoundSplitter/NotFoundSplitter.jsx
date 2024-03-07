import React, { useEffect, useState } from 'react';
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const NotFoundSplitter = ({ apiMethod, Component }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiMethod();

            if (response.status === 200) {
                const data = await response.json();
                setData(data);
            } else if (response.status === 404) {
                window.location.href = '/404';
            }
        };

        fetchData();
    }, [apiMethod]);

    return data ?
        <Component data={data} />
        :
        <NotFoundPage/>;
};

export default NotFoundSplitter;