import React from 'react';
import AppShell from './components/layout/AppShell';
import MultimodalInput from './features/input/MultimodalInput';

function App() {
  return (
    <AppShell>
      <div style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to Nepal</h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
          Capture a moment or tell a story to generate your personalized path.
        </p>
      </div>
      <MultimodalInput />
    </AppShell>
  );
}

export default App;
