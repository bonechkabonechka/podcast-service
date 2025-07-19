import js from '@eslint/js';
import { useState, useEffect } from 'react';

export const usePodcastsData = (filters) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setErorr] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    const { languageId, categoryId, availableId, page } = filters;

    const available = availableId ? `&available=${availableId}` : '';
    const category = categoryId ? `&category=${categoryId}` : '';

    useEffect(() => {
        setIsLoading(true);
        setErorr(null);
        // fetch(`https://68629af796f0cc4e34ba5d13.mockapi.io/v1/photos?language=${languageId}&page=${page}&limit=9${available}${category}`)
        fetch(
            `http://localhost:8000/v1/podcasts?language=${languageId}&page=${page}&limit=9${available}${category}`,
        )
            .then((result) => result.json())
            .then((json) => {
                if (json) {
                    setItems(json.items || []);
                    setTotalPages(json.pages || 1);
                } else {
                    setItems([]);
                }
            })
            .catch((error) => {
                console.warn(json);
                setErorr(error);
                setItems([]);
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, availableId, languageId, page]);

    return { items, isLoading, error, totalPages };
};
