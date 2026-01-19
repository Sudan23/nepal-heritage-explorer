import React from 'react';
import { Camera, Map, Box } from 'lucide-react';

const AppShell = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="layout-shell">
            <header className="glass-panel" style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: '1rem',
                borderBottom: '1px solid var(--glass-border)',
                marginBottom: '2rem'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, var(--color-heritage-red), var(--color-heritage-gold))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Heritage Explorer
                    </h1>
                    <nav>
                        <button className="btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Camera size={20} />
                            <span>Capture</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="container" style={{ paddingBottom: '6rem' }}>
                {children}
            </main>

            <nav className="glass-panel" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 100
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
