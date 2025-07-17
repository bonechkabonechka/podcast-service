import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePodcastsData } from '../components/hooks/usePodcastsData';
import { useFilters } from '../components/hooks/useFilters';
import { useSearch } from '../components/hooks/useSearch';
import Filter from '../components/Filter';
import PodcastsList from '../components/PodcastsList';
import Pagination from '../components/Pagination';

export default function Podcasts() {
    const { language } = useParams();
    const navigate = useNavigate();

    const { setters, filters } = useFilters(language);
    const { items, isLoading, error } = usePodcastsData(filters);
    const filteredItems = useSearch(items, filters.searchValue);

    const languageChange = (e) => {
        const newLanguage = e.target.value;
        setters.setLanguageId(newLanguage);
        navigate(`/podcasts/${newLanguage}`);
    };

    return (
        <section className="podcasts container">
            <div className="podcasts__body">
                <Filter
                    filters={filters}
                    setters={setters}
                    languageChange={languageChange}
                />
                <PodcastsList
                    items={filteredItems}
                    isLoading={isLoading}
                    error={error}
                />
                <Pagination page={filters.page} setPage={setters.setPage} />
            </div>
        </section>
    );
}
