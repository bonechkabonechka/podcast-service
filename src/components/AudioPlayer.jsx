import React, { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({
    isOpen,
    onClose,
    audioSrc,
    title,
    description,
    image,
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(null);

    const audioRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (audioRef.current && audioSrc && isOpen) {
            const audio = audioRef.current;

            console.log('Loading audio from:', audioSrc);

            setIsLoading(true);
            setError(null);
            setCurrentTime(0);
            setDuration(0);
            setIsPlaying(false);

            const timeout = setTimeout(() => {
                if (isLoading) {
                    setError('Превышено время ожидания загрузки');
                    setIsLoading(false);
                }
            }, 10000);

            setLoadingTimeout(timeout);

            const handleLoadedMetadata = () => {
                if (audio.duration && audio.duration !== Infinity) {
                    setDuration(audio.duration);
                    setIsLoading(false);
                    clearTimeout(timeout);
                }
            };

            const handleLoadedData = () => {
                setIsLoading(false);
                clearTimeout(timeout);
            };

            const handleCanPlay = () => {
                setIsLoading(false);
                clearTimeout(timeout);
            };

            const handleTimeUpdate = () => {
                if (audio.currentTime !== currentTime) {
                    setCurrentTime(audio.currentTime);
                }
            };

            const handleEnded = () => {
                console.log('🎵 Audio ended');
                setIsPlaying(false);
                setCurrentTime(0);
            };

            const handleError = (e) => {
                console.error('❌ Audio error:', e);
                console.error('❌ Audio error details:', audio.error);
                clearTimeout(timeout);
                setIsLoading(false);
            };

            const handleLoadStart = () => {
                setIsLoading(true);
            };

            const handleProgress = () => {
                if (audio.buffered.length > 0) {
                    const bufferedEnd = audio.buffered.end(
                        audio.buffered.length - 1,
                    );
                    const duration = audio.duration;
                    if (duration > 0) {
                        const bufferedPercent = (bufferedEnd / duration) * 100;
                    }
                }
            };

            audio.addEventListener('loadstart', handleLoadStart);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('loadeddata', handleLoadedData);
            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);
            audio.addEventListener('progress', handleProgress);

            audio.load();

            return () => {
                clearTimeout(timeout);
                audio.removeEventListener('loadstart', handleLoadStart);
                audio.removeEventListener(
                    'loadedmetadata',
                    handleLoadedMetadata,
                );
                audio.removeEventListener('loadeddata', handleLoadedData);
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('error', handleError);
                audio.removeEventListener('progress', handleProgress);
            };
        }
    }, [audioSrc, isOpen]);

    useEffect(() => {
        if (!isOpen && audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (loadingTimeout) {
                clearTimeout(loadingTimeout);
            }
        }
    }, [isOpen, loadingTimeout]);

    const togglePlayPause = async () => {
        if (!audioRef.current || isLoading) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    await playPromise;
                    setIsPlaying(true);
                }
            }
        } catch (err) {
            console.error('❌ Playback error:', err);
        }
    };

    const skipBackward = () => {
        if (audioRef.current) {
            const newTime = Math.max(0, audioRef.current.currentTime - 15);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const skipForward = () => {
        if (audioRef.current) {
            const newTime = Math.min(
                duration,
                audioRef.current.currentTime + 15,
            );
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleSeek = (e) => {
        if (audioRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const newTime = percent * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <div className="audio-player-modal">
            <div className="audio-player-content" ref={modalRef}>
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    preload="metadata"
                    crossOrigin="anonymous"
                />

                <button
                    className="audio-player-close"
                    onClick={onClose}
                    aria-label="Закрыть плеер"
                >
                    ×
                </button>

                <div className="audio-player-info">
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="audio-player-image"
                        />
                    )}
                    <div className="audio-player-details">
                        <h3 className="audio-player-title">{title}</h3>
                        {description && (
                            <p className="audio-player-description">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {isLoading && !error && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div>Загрузка аудио...</div>
                    </div>
                )}
                <div className="audio-player-controls">
                    <div className="audio-player-progress-container">
                        <span className="audio-player-time">
                            {formatTime(currentTime)}
                        </span>
                        <div
                            className="audio-player-progress-bar"
                            onClick={handleSeek}
                        >
                            <div
                                className="audio-player-progress-fill"
                                style={{
                                    width: duration
                                        ? `${(currentTime / duration) * 100}%`
                                        : '0%',
                                }}
                            />
                        </div>
                        <span className="audio-player-time">
                            {formatTime(duration)}
                        </span>
                    </div>
                    <div className="audio-player-buttons">
                        <button
                            className="audio-player-btn"
                            onClick={skipBackward}
                            disabled={isLoading || error}
                            aria-label="Перемотать на 15 секунд назад"
                        >
                            {`< 15s`}
                        </button>

                        <button
                            className="audio-player-btn audio-player-play-btn"
                            onClick={togglePlayPause}
                            disabled={isLoading || error}
                            aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
                        >
                            {isLoading ? '⏳' : isPlaying ? '⏸' : '▶'}
                        </button>

                        <button
                            className="audio-player-btn"
                            onClick={skipForward}
                            disabled={isLoading || error}
                            aria-label="Перемотать на 15 секунд вперед"
                        >
                            {` 15s >`}
                        </button>
                    </div>
                    <div className="audio-player-volume">
                        <span className="audio-player-volume-icon">🔈</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="audio-player-volume-slider"
                            aria-label="Громкость"
                        />
                        <span className="audio-player-volume-value">
                            {Math.round(volume * 100)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
