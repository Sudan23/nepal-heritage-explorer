// src/services/culturalService.js

// Mock data for festivals based on months (using Gregorian for simplicity in demo)
const FESTIVAL_CALENDAR = {
    0: { name: 'Maghe Sankranti', description: 'Celebrating the end of winter', type: 'Festival' }, // Jan
    1: { name: 'Maha Shivaratri', description: 'Night of Lord Shiva', type: 'Religious' }, // Feb
    2: { name: 'Holi', description: 'Festival of Colors', type: 'Celebration' }, // Mar
    3: { name: 'Bisket Jatra', description: 'Nepali New Year', type: 'Jatra' }, // Apr
    8: { name: 'Indra Jatra', description: 'Festival of the Rain God', type: 'Jatra' }, // Sep
    9: { name: 'Dashain', description: 'Victory of Good over Evil', type: 'Major' }, // Oct
    10: { name: 'Tihar', description: 'Festival of Lights', type: 'Major' }, // Nov
};

const ETIQUETTE_TIPS = {
    temple: [
        { icon: '👟', text: 'Remove shoes before entering' },
        { icon: '📸', text: 'Ask before taking photos of idols' },
        { icon: '🤫', text: 'Speak softly in shrine areas' }
    ],
    stupa: [
        { icon: '🔄', text: 'Always walk clockwise (Kora)' },
        { icon: '🔇', text: 'Maintain silence' }
    ],
    general: [
        { icon: '🙏', text: 'Greet with "Namaste"' },
        { icon: '🤚', text: 'Use right hand for giving/receiving' }
    ]
};

export const getDailyInsight = (date = new Date()) => {
    const month = date.getMonth();
    const todayFestival = FESTIVAL_CALENDAR[month];

    if (todayFestival) {
        return {
            type: 'festival',
            title: todayFestival.name,
            description: todayFestival.description,
            tag: todayFestival.type
        };
    }

    // Fallback to general wisdom if no specific festival
    return {
        type: 'wisdom',
        title: 'Did you know?',
        description: 'Kathmandu Valley is known as the "City of Temples" with over 3000 heritage structures.',
        tag: 'Culture'
    };
};

export const getEtiquetteForLocation = (locationType = 'general') => {
    return ETIQUETTE_TIPS[locationType] || ETIQUETTE_TIPS['general'];
};
