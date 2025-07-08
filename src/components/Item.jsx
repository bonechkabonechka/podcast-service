import React from "react";

export default function Items({ id, image, name, description }) {
    return (
        <div className="item">
            <div className="item__inner">
                <img src={image} alt="Item" className="item__image" />
                <div className="item__title">
                    {name}
                </div>
                <button className="item__button-fav button">
                    ❤️
                </button>
            </div>
            <div className="item__footer">
                <div className="item__description">
                    <p>{description}</p>
                </div>
                <button className="item__button-listen">Слушать ▶️</button>
            </div>
        </div>
    )
}