import { NavLink, Link, useLocation } from "react-router-dom";
import { listOfLanguages } from "../../constants/appConstants";

const setActive = ({isActive}) => isActive ? 'header__menu-link active-link' : 'header__menu-link'

export default function Header() {
    const location = useLocation()

    return (
        <header className="header container">
            <Link to="/" className="header__logo">
                <h3>MyPod</h3>
            </Link>
            <nav className="header__menu">
                    {
                        location.pathname.startsWith('/podcasts') ?
                        (  
                        <ul className="header__menu-list--languages">
                            {   
                                listOfLanguages.map((language) => {
                                    return <li className="header__menu-item--languages" key={language.language}>
                                                <NavLink className={setActive} to={`/podcasts/${language.language}`}>
                                                {language.name}
                                                </NavLink>
                                            </li>
                                })   
                            }
                        </ul>
                        ) :
                        (
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <NavLink className={setActive} to="/">Главная</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className={setActive} to="/help">Как пользоваться</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className={setActive} to="/features">Фичи</NavLink>
                            </li>
                            <li className="header__menu-item">
                                <NavLink className={setActive} to="/podcasts">Слушать</NavLink>
                            </li>
                        </ul>
                        )
                        }
            </nav>
            <button className="telegram">Telegram</button>
        </header>
    );
}