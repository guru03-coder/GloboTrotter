
export interface Place {
    id: string;
    name: string;
    country: string;
    image: string;
    rating: number;
    description: string;
    location: string;
    bestSeason: string;
    budget: string;
    lat?: number;
    lng?: number;
    expenses: {
        accommodation: string;
        food: string;
        transport: string;
        activities: string;
    };
}

export const places: Place[] = [
    {
        id: "kerala-backwaters",
        name: "Kerala Backwaters",
        country: "Kerala, India",
        location: "Alleppey & Kumarakom",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
        rating: 4.9,
        description: "Experience the tranquility of Kerala's famous network of interconnected canals, rivers, lakes, and inlets. A houseboat cruise here is a quintessential Indian experience, offering a glimpse into the gentle rhythm of village life.",
        bestSeason: "September to March",
        budget: "₹6,800 - ₹12,750 per day",
        lat: 9.4981,
        lng: 76.3388,
        expenses: {
            accommodation: "₹4,250 (Houseboat/Homestay)",
            food: "₹1,275 (Local cuisine)",
            transport: "₹850 (Ferry/Auto)",
            activities: "₹2,550 (Ayurveda/Canoeing)"
        }
    },
    {
        id: "manali",
        name: "Manali",
        country: "Himachal Pradesh, India",
        location: "Kullu Valley",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&q=80",
        rating: 4.8,
        description: "A high-altitude Himalayan resort town known for its backpacking culture, stunning views, and adventure sports. It serves as a gateway to skiing in the Solang Valley and trekking in Parvati Valley.",
        bestSeason: "October to June",
        budget: "₹3,400 - ₹8,500 per day",
        lat: 32.2432,
        lng: 77.1892,
        expenses: {
            accommodation: "₹2,550 (Guest house/Hotel)",
            food: "₹1,275 (Cafe hopping)",
            transport: "₹850 (Local buses/Bikes)",
            activities: "₹1,700 (Trekking/Adventure)"
        }
    },
    {
        id: "lakshadweep",
        name: "Lakshadweep",
        country: "Lakshadweep, India",
        location: "Arabian Sea",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
        rating: 4.9,
        description: "A tropical archipelago of 36 atolls and coral reefs in the Laccadive Sea, known for its sun-kissed beaches and lush green landscape. Only a few islands are open to tourists, ensuring a pristine environment.",
        bestSeason: "October to mid-May",
        budget: "₹8,500 - ₹17,000 per day",
        lat: 10.5667,
        lng: 72.6417,
        expenses: {
            accommodation: "₹6,800 (Island resorts)",
            food: "₹2,125 (Seafood)",
            transport: "₹1,700 (Inter-island boats)",
            activities: "₹3,400 (Scuba/Snorkeling)"
        }
    },
    {
        id: "jaipur",
        name: "Jaipur",
        country: "Rajasthan, India",
        location: "Pink City",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
        rating: 4.7,
        description: "The capital of India's Rajasthan state, Jaipur evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or 'Pink City' for its trademark building color.",
        bestSeason: "October to March",
        budget: "₹4,250 - ₹10,200 per day",
        lat: 26.9124,
        lng: 75.7873,
        expenses: {
            accommodation: "₹3,400 (Heritage Haveli)",
            food: "₹1,700 (Rajasthani Thali)",
            transport: "₹850 (Rickshaw/Taxi)",
            activities: "₹1,275 (Fort entry fees)"
        }
    },
    {
        id: "goa-beaches",
        name: "Goa Beaches",
        country: "Goa, India",
        location: "Konkan Coast",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&q=80",
        rating: 4.8,
        description: "Famous for its sandy shores, nightlife, and Portuguese heritage. Whether you prefer the bustling vibe of North Goa or the serene beaches of South Goa, there's something for every traveler.",
        bestSeason: "November to February",
        budget: "₹5,100 - ₹12,750 per day",
        lat: 15.2993,
        lng: 74.1240,
        expenses: {
            accommodation: "₹4,250 (Beach hut/Resort)",
            food: "₹2,125 (Seafood/Fenny)",
            transport: "₹850 (Scooter rental)",
            activities: "₹1,700 (Water sports)"
        }
    }
];
