import React, { useState, useEffect } from 'react';
import { Sparkles, Info, X } from 'lucide-react';
import { getDailyInsight, getEtiquetteForLocation } from '../../services/culturalService';

const CulturalInsightCard = () => {
    const [insight, setInsight] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const data = getDailyInsight();
        setInsight(data);
    }, []);

    if (!insight || !isVisible) return null;

    return (
        <div className="glass-panel" style={{
            padding: '1.25rem',
            borderLeft: '4px solid var(--color-heritage-red)',
            position: 'relative',
            background: 'linear-gradient(to right, rgba(220, 20, 60, 0.05), rgba(255, 215, 0, 0.05))'
        }}>
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer'
                }}
            >
                <X size={16} />
            </button>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                    background: 'var(--color-heritage-gold)',
                    borderRadius: '50%',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a1a'
                }}>
                    <Sparkles size={20} />
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--color-heritage-red)',
                            fontWeight: 'bold',
                            border: '1px solid var(--color-heritage-red)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '1rem'
                        }}>
                            {insight.tag}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Today's Insight</span>
                    </div>

                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem',
                        color: 'var(--color-text-primary)'
                    }}>
                        {insight.title}
                    </h3>

                    <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.4'
                    }}>
                        {insight.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CulturalInsightCard;
