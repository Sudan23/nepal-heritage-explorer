
// Mock response simulating Gemini's output
const MOCK_ITINERARY = {
    title: "Kathmandu Valley Heritage Tour",
    description: "A 2-day journey through the living history of the Malla kings and sacred Buddhist sites.",
    days: [
        {
            day: 1,
            theme: "Ancient Squares & Living Goddesses",
            activities: [
                {
                    id: 'act_1',
                    time: "10:00 AM",
                    title: "Kathmandu Durbar Square",
                    description: "Explore the Hanuman Dhoka complex. Don't miss the 'Seto Bhairav' hidden behind the wooden screen.",
                    location: "Kathmandu 44600",
                    type: "heritage",
                    coordinates: { lat: 27.7042, lng: 85.3067 },
                    geminiTip: "Look for the Kumari Ghar. If you are lucky, you might catch a glimpse of the Living Goddess."
                },
                {
                    id: 'act_2',
                    time: "01:00 PM",
                    title: "Lunch at Newari Kitchen",
                    description: "Try the 'Samay Baji', a traditional Newari set. It is a ritual dish served during festivals.",
                    location: "Freak Street",
                    type: "food",
                    coordinates: { lat: 27.7032, lng: 85.3075 },
                    geminiTip: "Wash hands before eating, as per tradition. Use your right hand for food."
                }
            ]
        },
        {
            day: 2,
            theme: "Stupas & Serenity",
            activities: [
                {
                    id: 'act_3',
                    time: "09:00 AM",
                    title: "Swayambhunath Stupa",
                    description: "The Monkey Temple provides 360-degree views of the valley.",
                    location: "Swayambhu",
                    type: "heritage",
                    coordinates: { lat: 27.7149, lng: 85.2903 },
                    geminiTip: "Walk clockwise (circumambulate) around the stupa for good karma."
                },
                {
                    id: 'act_4',
                    time: "03:00 PM",
                    title: "Patan Durbar Square",
                    description: "Famous for its intricate Krishna Mandir built entirely of stone.",
                    location: "Lalitpur",
                    type: "heritage",
                    coordinates: { lat: 27.6744, lng: 85.3249 },
                    geminiTip: "Touch the feet of the statues as a sign of respect if you see locals doing it."
                }
            ]
        }
    ]
};

export const generateItinerary = async (media, context) => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            resolve(MOCK_ITINERARY);
        }, 2500);
    });
};
