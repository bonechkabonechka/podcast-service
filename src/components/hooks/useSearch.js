import { useMemo } from 'react'

export const useSearch = (items, searchValue) => {
    const filteredItems = useMemo(() => {
        if (!searchValue.trim()) return items
        
        return items.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [items, searchValue])
    
    return filteredItems
}