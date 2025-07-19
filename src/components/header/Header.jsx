import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { listOfLanguages } from '../../constants/appConstants';

const setActive = ({ isActive }) =>
    isActive ? 'header__menu-link active-link' : 'header__menu-link';

export default function Header() {
    const location = useLocation();

    return (
        <header className="header container">
            <Link to="/" className="header__logo">
                <h3>MyPod</h3>
            </Link>
            <nav className="header__menu">
                {location.pathname.startsWith('/podcasts') ? (
                    <ul className="header__menu-list--languages">
                        {listOfLanguages.map((language) => {
                            return (
                                <li
                                    className="header__menu-item--languages"
                                    key={language.language}
                                >
                                    <NavLink
                                        className={setActive}
                                        to={`/podcasts/${language.language}`}
                                    >
                                        {language.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <ul className="header__menu-list">
                        <li className="header__menu-item">
                            <NavLink className={setActive} to="/">
                                Главная
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className={setActive} to="/help">
                                Как пользоваться
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className={setActive} to="/features">
                                Фичи
                            </NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink className={setActive} to="/podcasts">
                                Слушать
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
            <button className="telegram">
                <div>Login with</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    style={{ enableBackground: 'new 0 0 24 24' }}
                    xmlSpace="preserve"
                    width="40"
                    height="40"
                >
                    <g id="Artboard">
                        <path
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                            }}
                            d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z    M17.562,8.161c-0.18,1.897-0.962,6.502-1.359,8.627c-0.168,0.9-0.5,1.201-0.82,1.23c-0.697,0.064-1.226-0.461-1.901-0.903   c-1.056-0.692-1.653-1.123-2.678-1.799c-1.185-0.781-0.417-1.21,0.258-1.911c0.177-0.184,3.247-2.977,3.307-3.23   c0.007-0.032,0.015-0.15-0.056-0.212s-0.174-0.041-0.248-0.024c-0.106,0.024-1.793,1.139-5.062,3.345   c-0.479,0.329-0.913,0.489-1.302,0.481c-0.428-0.009-1.252-0.242-1.865-0.442c-0.751-0.244-1.349-0.374-1.297-0.788   c0.027-0.216,0.324-0.437,0.892-0.663c3.498-1.524,5.831-2.529,6.998-3.015c3.333-1.386,4.025-1.627,4.477-1.635   C17.472,7.214,17.608,7.681,17.562,8.161z"
                        />
                    </g>
                </svg>
            </button>
        </header>
    );
}
