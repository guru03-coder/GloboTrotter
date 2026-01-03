import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateTripPage from "./pages/CreateTripPage";
import BuildItineraryPage from "./pages/BuildItineraryPage";
import TripsPage from "./pages/TripsPage";
import ProfilePage from "./pages/ProfilePage";
import ActivitySearchPage from "./pages/ActivitySearchPage";
import ItineraryViewPage from "./pages/ItineraryViewPage";
import CommunityPage from "./pages/CommunityPage";
import CalendarViewPage from "./pages/CalendarViewPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

import { Chatbot } from "@/components/Chatbot";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Chatbot />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/places/:id" element={
              <ProtectedRoute>
                <PlaceDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/create-trip" element={
              <ProtectedRoute>
                <CreateTripPage />
              </ProtectedRoute>
            } />
            <Route path="/build-itinerary" element={
              <ProtectedRoute>
                <BuildItineraryPage />
              </ProtectedRoute>
            } />
            <Route path="/trips" element={
              <ProtectedRoute>
                <TripsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <ActivitySearchPage />
              </ProtectedRoute>
            } />
            <Route path="/itinerary-view" element={
              <ProtectedRoute>
                <ItineraryViewPage />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <CalendarViewPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanelPage />
              </ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
