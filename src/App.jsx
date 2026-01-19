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
      >
        <div style={{ textAlign: 'center', padding: '2rem 0 0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to Nepal</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
            Capture a moment or tell a story to generate your personalized path.
          </p>
        </div>
        <CulturalInsightCard />
        <MultimodalInput onGenerate={handleGenerate} />
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
