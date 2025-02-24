import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/ResgisterScreen/RegisterScreen";
import OrganizerDashboard from "./screens/Dashboard/Organizer/Organizer_dashboard";
import ParticipantDashboard from "./screens/Dashboard/Participant/Participant_Dashboard";
import ExploreEvents from "./components/ExploreEvents/ExploreEvents";
import EventDetails from "./components/EventDetails/EventDetails";
import Profile from "./components/Profile/Profile";
import EventScheduler from "./pages/eventschedule/EventSchedule";
import VenueForm from "./pages/venueform/VenueForm";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={<LoginScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route
          path="/participant-dashboard"
          element={<ParticipantDashboard />}
        />
        <Route
          path="/participant-dashboard/events"
          element={<ExploreEvents />}
        />
        <Route
          path="/participant-dashboard/event/:id"
          element={<EventDetails />}
        />
        <Route path="/participant-dashboard/profile" element={<Profile />} />
        <Route
          path="/organizer-dashboard/event-schedule"
          element={<EventScheduler />}
        />
        <Route path="/organizer-dashboard/venue-form" element={<VenueForm />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
