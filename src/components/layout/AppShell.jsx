import React from 'react';
import { Camera, Map, Box } from 'lucide-react';

const AppShell = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="layout-shell" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <header className="glass-panel" style={{
                flex: '0 0 auto',
                zIndex: 100,
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--glass-border)',
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <h1 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, var(--color-heritage-red), var(--color-heritage-gold))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 0
                    }}>
                        Heritage Explorer
                    </h1>
                    <nav>
                        <button className="btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <Camera size={18} />
                            <span>Capture</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{
                flex: '1 1 auto',
                position: 'relative',
                overflow: 'hidden', /* Content handles its own scroll */
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className="container" style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '1rem',
                    paddingBottom: '1rem'
                }}>
                    {children}
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="glass-panel" style={{
                flex: '0 0 auto',
                padding: '0.75rem 1rem',
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 100,
                borderTop: '1px solid var(--glass-border)'
            }}>
                <NavButton icon={Camera} label="Scan" active={activeTab === 'scan'} onClick={() => onTabChange('scan')} />
                <NavButton icon={Map} label="Itinerary" active={activeTab === 'itinerary'} onClick={() => onTabChange('itinerary')} />
                <NavButton icon={Box} label="Heritage" active={activeTab === 'heritage'} onClick={() => onTabChange('heritage')} />
            </nav>
        </div>
    );
};

const NavButton = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} style={{
        background: 'none',
        border: 'none',
        color: active ? 'var(--color-heritage-red)' : 'var(--color-text-muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        cursor: 'pointer'
    }}>
        <Icon size={24} />
        <span style={{ fontSize: '0.75rem' }}>{label}</span>
    </button>
);

export default AppShell;
