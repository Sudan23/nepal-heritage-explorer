import React, { useState } from 'react';
import AppShell from './components/layout/AppShell';
import MultimodalInput from './features/input/MultimodalInput';
import ItineraryDisplay from './features/itinerary/ItineraryDisplay';
import { generateItinerary } from './services/geminiService';

function App() {
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = async (data) => {
    const result = await generateItinerary(data.media, { location: data.location, date: data.date });
    setItinerary(result);
  };

  return (
    <AppShell>
      {!itinerary ? (
        <>
          <div style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to Nepal</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
              Capture a moment or tell a story to generate your personalized path.
            </p>
          </div>
          <MultimodalInput onGenerate={handleGenerate} />
        </>
      ) : (
        <ItineraryDisplay data={itinerary} onBack={() => setItinerary(null)} />
      )}
    </AppShell>
  );
}

export default App;
