import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Mic, MapPin, Calendar, X, Check, RefreshCw, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MultimodalInput = () => {
    const [activeTab, setActiveTab] = useState('camera'); // camera | audio
    const [media, setMedia] = useState({ photo: null, audio: null });
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Camera Logic
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setMedia(prev => ({ ...prev, photo: imageSrc }));
    }, [webcamRef]);

    const retake = () => setMedia(prev => ({ ...prev, photo: null }));

    // Audio Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
            }, () => {
                setLocation("Kathmandu, Nepal"); // Default fallback
            });
        } else {
            setLocation("Kathmandu, Nepal");
        }
    };

    return (
        <div className="glass-panel" style={{ borderRadius: '1.5rem', overflow: 'hidden', margin: '1rem' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
                <button
                    onClick={() => setActiveTab('camera')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        background: activeTab === 'camera' ? 'rgba(255,255,255,0.1)' : 'transparent',
                        border: 'none',
                        color: activeTab === 'camera' ? 'var(--color-accent-primary)' : 'var(--color-text-muted)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    <Camera size={20} style={{ display: 'inline', marginRight: '8px' }} /> Photo
                </button>
                <button
                    onClick={() => setActiveTab('audio')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        background: activeTab === 'audio' ? 'rgba(255,255,255,0.1)' : 'transparent',
                        border: 'none',
                        color: activeTab === 'audio' ? 'var(--color-accent-secondary)' : 'var(--color-text-muted)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    <Mic size={20} style={{ display: 'inline', marginRight: '8px' }} /> Audio Story
                </button>
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'camera' ? (
                        <motion.div
                            key="camera"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            {media.photo ? (
                                <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
                                    <img src={media.photo} alt="Captured" style={{ width: '100%', objectFit: 'cover' }} />
                                    <button
                                        onClick={retake}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden', background: 'black' }}>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <button
                                        onClick={capture}
                                        className="btn-primary"
                                        style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                                    >
                                        <Camera size={28} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="audio"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ width: '100%', textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    background: isRecording ? 'var(--color-heritage-red)' : 'var(--color-bg-tertiary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto',
                                    transition: 'background 0.3s'
                                }}>
                                    <Mic size={40} color="white" />
                                </div>
                                {isRecording && <p style={{ marginTop: '1rem', color: 'var(--color-heritage-red)', fontWeight: 'bold' }}>Recording...</p>}
                            </div>

                            {audioUrl && !isRecording && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <audio controls src={audioUrl} style={{ width: '100%' }} />
                                </div>
                            )}

                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className="btn-primary"
                                style={{ background: isRecording ? 'var(--color-text-muted)' : 'var(--color-accent-secondary)', color: isRecording ? 'white' : 'black' }}
                            >
                                {isRecording ? <><Square size={20} style={{ marginRight: '8px' }} /> Stop Recording</> : <><Mic size={20} style={{ marginRight: '8px' }} /> Start Recording</>}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Context Inputs */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Date</label>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-secondary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                            <Calendar size={16} style={{ marginRight: '0.5rem', color: 'var(--color-text-muted)' }} />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', width: '100%', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Location</label>
                        <button
                            onClick={handleLocation}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--color-bg-secondary)',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                color: location ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{location || "Set Location"}</span>
                            <MapPin size={16} style={{ color: 'var(--color-accent-primary)' }} />
                        </button>
                    </div>
                </div>

                <button
                    className="btn-primary"
                    disabled={!media.photo && !audioBlob}
                    style={{ width: '100%', opacity: (!media.photo && !audioBlob) ? 0.5 : 1, cursor: (!media.photo && !audioBlob) ? 'not-allowed' : 'pointer' }}
                >
                    Generate Itinerary
                </button>
            </div>
        </div>
    );
};

export default MultimodalInput;
