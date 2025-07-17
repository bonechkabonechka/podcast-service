import { useMemo } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = (items, searchValue) => {
    const debouncedSearch = useDebounce(searchValue);
    const filteredItems = useMemo(() => {
        if (!debouncedSearch.trim()) return items;

        const query = debouncedSearch.toLowerCase();

        return items.filter(
            (obj) =>
                obj.name.toLowerCase().includes(query) ||
                obj.description.toLowerCase().includes(query),
        );
    }, [items, debouncedSearch]);
    return filteredItems;
};
