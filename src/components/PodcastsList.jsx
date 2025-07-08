import { categories, availability } from "../constants/appConstants";
import { listOfLanguages } from "../constants/appConstants";
import { Skeleton } from "./Skeleton";
import Item from './Item'
export default function PodcastsList( {items, isLoading, error} ) {
    if (isLoading) {
        return ( <div className="podcasts__items">
                {[...Array(9)].map((_, i) => (
                    <Skeleton key={i} />
                ))
                }
                </div>
        )
    }
    if (error) {
        return (
            <div className="podcasts__items">
                <p>Error loading podcasts: {error}</p>
            </div>
        )
    }
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="podcasts__items">
                <p>No podcasts were found matching your criteria.</p>
            </div>
        )
    }

    return (
        <div className="podcasts__items">
            {
            items.map((obj, index) => (
                // <Item key={obj.id}
                <Item key={index}
                name={obj.name}
                image={obj.image}
                description={obj.description}
                />
            ))
            }
        </div>
    )
    

    
}