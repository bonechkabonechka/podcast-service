import React from 'react';
import Item from './Item';
import { Skeleton } from './Skeleton';

export default function PodcastsList({ items, isLoading, error, onPlayClick }) {
    if (isLoading) {
        return (
            <div className="podcasts__items">
                {[...Array(9)].map((_, i) => (
                    <Skeleton key={i} />
                ))}
            </div>
        );
    }
    if (error) {
        return (
            <div className="podcasts__items">
                <p>Error loading podcasts: {error}</p>
            </div>
        );
    }
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="podcasts__items">
                <p>No podcasts were found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="podcasts__items">
            {items.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    duration={item.duration}
                    audio={item.audio}
                    onPlayClick={onPlayClick}
                />
            ))}
        </div>
    );
}
