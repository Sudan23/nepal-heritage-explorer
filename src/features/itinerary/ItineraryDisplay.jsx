import React from 'react';
import { Clock, MapPin, Info, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ItineraryDisplay = ({ data, onBack, onNavigate }) => {
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="itinerary-container"
            style={{ paddingBottom: '6rem' }}
        >
            {/* Header */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '1rem', position: 'relative' }}>
                <button
                    onClick={onBack}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(to right, var(--color-heritage-gold), var(--color-heritage-terra))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {data.title}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{data.description}</p>
            </div>

            {/* Days Timeline */}
            {data.days.map((day) => (
                <div key={day.day} style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        color: 'var(--color-heritage-gold)',
                        fontSize: '1.1rem',
                        marginBottom: '1rem',
                        paddingLeft: '1rem',
                        borderLeft: '4px solid var(--color-heritage-red)'
                    }}>
                        Day {day.day}: {day.theme}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {day.activities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-panel"
                                style={{ padding: '1rem', borderRadius: '1rem', borderLeft: `4px solid ${activity.type === 'heritage' ? 'var(--color-heritage-red)' : 'var(--color-heritage-terra)'}` }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Clock size={14} style={{ marginRight: '4px', color: 'var(--color-text-muted)' }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginRight: 'auto' }}>{activity.time}</span>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.75rem' }}>
                                        {activity.type.toUpperCase()}
                                    </div>
                                </div>

                                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{activity.title}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <MapPin size={14} style={{ marginRight: '4px', color: 'var(--color-accent-primary)' }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{activity.location}</span>
                                </div>

                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                                    {activity.description}
                                </p>

                                {activity.type === 'heritage' && (
                                    <button
                                        onClick={() => onNavigate && onNavigate('heritage')}
                                        style={{
                                            width: '100%',
                                            marginBottom: '0.75rem',
                                            padding: '0.75rem',
                                            background: 'linear-gradient(90deg, var(--color-heritage-red), #C0392B)',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>🏛️</span> View in 3D
                                    </button>
                                )}

                                {/* Gemini Insight */}
                                <div style={{
                                    background: 'rgba(220, 20, 60, 0.1)',
                                    border: '1px solid rgba(220, 20, 60, 0.3)',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    gap: '0.75rem'
                                }}>
                                    <Info size={20} style={{ color: 'var(--color-heritage-gold)', flexShrink: 0 }} />
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-heritage-gold)', display: 'block', marginBottom: '2px' }}>GEMINI INSIGHT</span>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                            "{activity.geminiTip}"
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default ItineraryDisplay;
