import { useState } from 'react'

export const useFilters = (currentLanguage) => {
    const [categoryId, setCategoryId] = useState(0)
    const [availableId, setAvailableId] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [languageId, setLanguageId] = useState(currentLanguage)
    const [page, setPage] = useState(1)

    return {
        filters: {
            categoryId,
            availableId,
            searchValue,
            languageId,
            page,
        },
        setters: {
            setCategoryId,
            setAvailableId,
            setSearchValue,
            setLanguageId,
            setPage
        }
    }
}