import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePodcastsData } from '../components/hooks/usePodcastsData';
import { useFilters } from '../components/hooks/useFilters';
import { useSearch } from '../components/hooks/useSearch';
import Filter from '../components/Filter';
import PodcastsList from '../components/PodcastsList';
import Pagination from '../components/Pagination';
import AudioPlayer from '../components/AudioPlayer';

export default function Podcasts() {
    const { language } = useParams();
    const navigate = useNavigate();

    const { setters, filters } = useFilters(language);
    const { items, isLoading, error, totalPages } = usePodcastsData(filters);
    const filteredItems = useSearch(items, filters.searchValue);

    const [audioPlayer, setAudioPlayer] = useState({
        isOpen: false,
        audioSrc: '',
        title: '',
        description: '',
        image: '',
        currentId: null,
    });

    const languageChange = (e) => {
        const newLanguage = e.target.value;
        setters.setLanguageId(newLanguage);
        navigate(`/podcasts/${newLanguage}`);
    };

    const handlePlayClick = (podcastData) => {
        setAudioPlayer({
            isOpen: true,
            audioSrc: podcastData.audioSrc,
            title: podcastData.title,
            description: podcastData.description,
            image: podcastData.image,
            currentId: podcastData.id,
        });
    };

    const handleClosePlayer = () => {
        setAudioPlayer((prev) => ({
            ...prev,
            isOpen: false,
        }));
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
                    onPlayClick={handlePlayClick}
                />
                <Pagination
                    page={filters.page}
                    setPage={setters.setPage}
                    totalPages={totalPages}
                />
            </div>

            <AudioPlayer
                isOpen={audioPlayer.isOpen}
                onClose={handleClosePlayer}
                audioSrc={audioPlayer.audioSrc}
                title={audioPlayer.title}
                description={audioPlayer.description}
                image={audioPlayer.image}
            />
        </section>
    );
}
