import React from "react";

export default function Items({ id, image, name, description }) {
    return (
        <div className="item">
            <div className="item__inner">

                {image && <img src={image} alt={name} className="item__image"/>}
                <div className="item__overlay"></div>
                <div className="item__title">
                    {name}
                </div>
                <button className="item__button-fav button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" id="Filled" viewBox="0 0 24 24" width="25" height="25">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/>
                    </svg>
                </button>
            </div>
            <div className="item__footer">
                <div className="item__description">
                    <p>{description}</p>
                </div>
                <button className="item__button-listen">
                    <svg fill="#ffffff" id="Layer_1" height="50" viewBox="0 0 24 24" width="50" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                        <path d="m14.823 11.708a.325.325 0 0 1 .169.292.314.314 0 0 1 -.12.266l-5.372 2.688a.337.337 0 0 1 -.5-.293v-5.322a.327.327 0 0 1 .168-.292.314.314 0 0 1 .157-.042.462.462 0 0 1 .228.068zm9.177-6.708v14a5.006 5.006 0 0 1 -5 5h-14a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h14a5.006 5.006 0 0 1 5 5zm-7.008 7a2.332 2.332 0 0 0 -1.226-2.055l-5.278-2.635a2.337 2.337 0 0 0 -3.5 2.029v5.322a2.313 2.313 0 0 0 1.164 2.021 2.368 2.368 0 0 0 1.186.323 2.2 2.2 0 0 0 1.1-.289l5.376-2.687a2.313 2.313 0 0 0 1.178-2.029z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}