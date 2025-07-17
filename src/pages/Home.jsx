import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/footer/Footer';
import { listOfLanguages } from '../constants/appConstants';
import {
    pageHomeVariants,
    languageSliderVariants,
    homeDescriptionVariants,
} from '../constants/motionConstants';

export default function Home() {
    const [curLangIndex, setCurLangIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurLangIndex((curLangIndex + 1) % listOfLanguages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [curLangIndex]);

    return (
        <motion.section
            className="home container"
            variants={pageHomeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, type: 'keyframes', ease: 'easeInOut' }}
        >
            <div className="home__body">
                <h1 className="home__title">
                    Listen to podcasts <br />
                    in&nbsp;
                    <AnimatePresence mode="wait">
                        <motion.span
                            className="lang"
                            key={curLangIndex}
                            variants={languageSliderVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ ease: 'linear' }}
                        >
                            {listOfLanguages[curLangIndex].name}
                        </motion.span>
                    </AnimatePresence>
                </h1>
                <div className="home__description">
                    <motion.p
                        initial={'hidden'}
                        animate={'visible'}
                        transition={{
                            delay: 0.5,
                            duration: 0.5,
                            type: 'keyframes',
                            ease: 'easeOut',
                        }}
                        variants={homeDescriptionVariants}
                    >
                        Choose the language you want to listen in
                    </motion.p>
                </div>
            </div>
            <div className="home__languages">
                <ul className="home__languages-list">
                    {listOfLanguages.map((language) => {
                        return (
                            <li
                                className="home__languages-item"
                                key={language.language}
                            >
                                <NavLink
                                    className="home__languages-link"
                                    to={`/podcasts/${language.language}`}
                                >
                                    {language.name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Footer />
        </motion.section>
    );
}
