import { categories, availability } from "../constants/appConstants";
import { listOfLanguages } from "../constants/appConstants";

export default function Filter( {filters, setters, languageChange} ) {

    const { categoryId, availableId, searchValue, languageId } = filters
    const { setCategoryId, setAvailableId, setSearchValue, setLanguageId } = setters
    

    return (
        <div className="filter">
            <div className="filter__language">
                <label htmlFor="language">Language</label>
                <select value={languageId} onChange={languageChange} name="language" id="language">
                    {
                        listOfLanguages.map((language, index) =>
                            <option value={`${language.language}`} key={index}>
                                {language.name}
                            </option>
                    )}
                </select>
            </div>
            <div className="filter__category">
                <ul className="filter__category-list">
                    {
                        categories.map((obj, i) => 
                            <li onClick={() => setCategoryId(i)}
                            className={`filter__category-item ${categoryId == i ? 'active' : ''}`}
                            key={obj.category}
                            >
                                {obj.category}
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="filter__availability">
                <ul className="filter__availability-list">
                    {
                        availability.map((obj, i) => 
                            <li onClick={() => setAvailableId(i)}
                            className={`filter__availability-item ${availableId == i ? 'active' : ''}`}
                            key={obj.available}
                            >
                                {obj.available}
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="filter__search">
                <label htmlFor="search">
                    Search
                </label>
                <input value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="search" 
                name="search" 
                type="search"
                inputMode="search" 
                placeholder="Joe Rogan"
                />
            </div>
        </div>
    )
}