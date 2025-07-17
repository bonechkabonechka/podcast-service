import Podcasts from '../../pages/Podcasts';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// import russianImg from '../../../assets/img/languages/russian/1.png'
import React, { useEffect, useRef } from 'react';

const pageVariants = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    exit: { opacity: 0.5 },
};

export default function Language() {
    const { language } = useParams();
    const audioRef = useRef(null);
    const backgroundImage = `url(/src/assets/img/languages/${language}/1.jpg)`;

    useEffect(() => {
        // Проверяем, что audioRef.current существует
        if (audioRef.current) {
            // Попытка автоматического воспроизведения
            audioRef.current.volume = 0.02;
            const playPromise = audioRef.current.play();

            // Обработка возможной ошибки автоматического воспроизведения
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log('Автовоспроизведение было запрещено:', error);
                    // Здесь можно добавить кнопку для ручного воспроизведения
                });
            }
        }
    }, [language]);

    return (
        <motion.div
            key={language}
            className={`language ${language}`}
            style={{ '--language-bg': backgroundImage }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <audio
                ref={audioRef}
                src={`/audio/${language}/2.mp3`}
                autoPlay
                loop
            ></audio>
            <div className="language-overlay"></div>
            <div className="language-content">
                <Podcasts />
            </div>
        </motion.div>
    );
}
