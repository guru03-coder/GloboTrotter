# GlobeTrotter 🌍

AI-Powered Travel Planning Application

GlobeTrotter is a comprehensive travel companion that leverages AI to help users discover destinations, plan detailed itineraries, and manage their trips.

## 🚀 Features

-   **Interactive Dashboard**: Explore destinations, view trip statistics, and managing bookings.
-   **AI Travel Chatbot**: Chat with an AI assistant (Gemini-powered) for personalized travel advice and destination information.
-   **Smart Itinerary Builder**: Generate custom day-wise itineraries based on your preferences using AI.
-   **Dynamic Places**: Detailed pages for various destinations with booking integration.
-   **Trip Management**: Book trips, view upcoming/ongoing/completed trips, and track expenses.
-   **Exploration Map**: Interactive map to discover key travel spots.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI
-   **AI Integration**: Google Gemini API
-   **Maps**: Leaflet (React Leaflet)
-   **State/Data**: React Query, LocalStorage (for demo persistence)
-   **Icons**: Lucide React

## 📦 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/globetrotter.git
    cd globetrotter
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 🚀 Deployment (Vercel)

1.  Push your code to GitHub.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your GitHub repository.
4.  **IMPORTANT**: In the "Environment Variables" section, add:
    -   `VITE_GEMINI_API_KEY`: Your Google Gemini API Key.
    -   `VITE_SUPABASE_URL`: Your Supabase URL.
    -   `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
5.  Click **Deploy**.

The `vercel.json` included in this repo ensures routing works correctly.

## 📝 License

This project is licensed under the MIT License.
