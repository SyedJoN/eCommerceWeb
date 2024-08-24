import { useEffect, useState } from 'react';

function useRandomProducts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%20one%3A%20mostLiked%20%7C%20mostViewed%20%7C%20latest%20%7C%20oldest');
                if (!response.ok) {
                    throw new Error('response not okay');
                }
                const jsonData = await response.json();
                setData(jsonData.data); // Assuming 'data' is the array of products
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return data;
}

export default useRandomProducts;
