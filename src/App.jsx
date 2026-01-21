import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import MultimodalInput from './features/input/MultimodalInput';
import ItineraryDisplay from './features/itinerary/ItineraryDisplay';
import HeritageViewer from './features/heritage/HeritageViewer';
import CulturalInsightCard from './features/culture/CulturalInsightCard';
import { generateItinerary } from './services/geminiService';

function App() {
  const [activeTab, setActiveTab] = useState('scan');
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = async (data) => {
    const result = await generateItinerary(data.media, { location: data.location, date: data.date });
    setItinerary(result);
    setActiveTab('itinerary');
  };

  const renderContent = () => {
    if (activeTab === 'heritage') {
      return (
        <motion.div
          key="heritage"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          style={{ height: '100%', width: '100%' }}
        >
          <HeritageViewer />
        </motion.div>
      );
    }

    if (activeTab === 'itinerary' && itinerary) {
      return (
        <motion.div
          key="itinerary"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%', overflowY: 'auto', paddingRight: '0.5rem' }}
        >
          <ItineraryDisplay data={itinerary} onBack={() => setActiveTab('scan')} onNavigate={setActiveTab} />
        </motion.div>
      );
    }

    // Default 'scan' or 'itinerary' without data
    return (
      <motion.div
        key="default"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        style={{
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          paddingBottom: '1rem'
        }}
      >
        <div style={{ textAlign: 'center', flex: '0 0 auto', paddingTop: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Welcome to Nepal</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
            Capture a moment or tell a story to generate your personalized path.
          </p>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          flex: '1 0 auto' // Allow to grow but dont force huge scroll
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CulturalInsightCard />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MultimodalInput onGenerate={handleGenerate} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </AppShell>
  );
}

export default App;
