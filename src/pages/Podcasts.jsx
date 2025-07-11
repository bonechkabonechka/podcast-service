import React, {useState, useEffect} from "react";
import Item from "../components/Item";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/Skeleton";
import { categories, availability } from '../constants/appConstants';


export default function Podcasts() {
    const { language } = useParams()
    const navigate = useNavigate()

    const [items, setItems] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [availbleId, setAvailbleId] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [languageId, setLanguageId] = useState(`${language}`)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)

    const languageChange = (e) => {
        const newLanguage = e.target.value
        setLanguageId(newLanguage)
        navigate(`/podcasts/${newLanguage}`)
    } 

    const availble = availbleId ? `&availble=${availbleId}` : ''
    const category = categoryId ? `&category=${categoryId}` : '' 
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://68629af796f0cc4e34ba5d13.mockapi.io/v1/photos?language=${languageId}&page=${page}&limit=9${availble}${category}`)
        .then(res => res.json())
        .then((json) => {
            if (Array.isArray(json)) {
                setItems(json);
            } else {
                setItems([]);
            }
        })
        .catch(err => {
            console.warn(err)
            alert('Error')
            setItems([])
        })
        .finally(() => setIsLoading(false))
    }, [categoryId, availbleId, languageId, page])

    

    return (
        <section className="podcasts container">
            <div className="podcasts__body">
                <div className="filter">
                    <div className="filter__language">
                        <label htmlFor="language">Language</label>
                        <select value={languageId} onChange={languageChange} name="language" id="language">
                            <option value="english">English</option>
                            <option value="russian">Русский</option>
                            <option value="chinese">中文</option>
                        </select>
                    </div>
                    <div className="filter__category">
                        <ul className="filter__category-list">
                            {
                                categories.map((obj, i) => <li onClick={() => setCategoryId(i)}
                                className={`filter__category-item ${categoryId == i ? 'active' : ''}`}
                                key={obj.category}>{obj.category}</li>)
                            }
                        </ul>
                    </div>
                    <div className="filter__availability">
                        <ul className="filter__availability-list">
                            {
                                availability.map((obj, i) => <li onClick={() => setAvailbleId(i)}
                            className={`filter__availability-item ${availbleId == i ? 'active' : ''}`}
                            key={obj.availble}>{obj.availble}</li>)
                            }
                        </ul>
                    </div>
                    <div className="filter__search">
                        <label htmlFor="search">Search</label>
                        <input value={searchValue}
                         onChange={(e) => setSearchValue(e.target.value)}
                        id="search" name="search" type="search"
                        inputMode="search" placeholder="Joe Rogan"
                        />
                    </div>
                    
                </div>
                <div className="podcasts__items">
                {
                    isLoading ?
                    [...Array(9)].map((_, i) => (
                        <Skeleton key={i}/>
                    )) 
                     : 
                    (Array.isArray(items) && items.length > 0 ? (
                    items.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()) )
                    .map((obj, index) => (
                        <Item key={index}
                        name={obj.name}
                        image={obj.image}
                        description={obj.description}/>
                    ))
                    ) :
                    <p>No podcasts were found matching your criteria.</p>
                )
                }
                </div>
                <div className="pagination">
                    <ul className="pagination-list">
                        {
                            [...Array(5)].map((_, i) => (
                                <li key={i} onClick={() => setPage(i + 1)}
                                className={`pagination-item ${page == i + 1 ? `active` : ''}`}
                                >{i + 1}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            
            
        </section>
    )
}