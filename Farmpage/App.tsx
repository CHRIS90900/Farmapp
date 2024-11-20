import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Leaderboard from "./Components/Leaderboard";
import Tasks from "./Components/Tasks";
import Invite from "./Components/Invite"; // Renamed from Friends to Invite for clarity

function App() {
  const [activeTab, setActiveTab] = useState("Home");

  // Assume user ID is fetched or provided after user login
  const userId = "12345"; // Replace with dynamic value

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Earn":
        return <Leaderboard />;
      case "Tasks":
        return <Tasks />;
      case "Invite":
        return <Invite userId={userId} />; // Pass userId as a prop
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Render the content based on active tab */}
      {renderContent()}

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <button
          onClick={() => setActiveTab("Home")}
          className={activeTab === "Home" ? "active" : ""}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("Earn")}
          className={activeTab === "Earn" ? "active" : ""}
        >
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab("Tasks")}
          className={activeTab === "Tasks" ? "active" : ""}
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveTab("Invite")}
          className={activeTab === "Invite" ? "active" : ""}
        >
          Invite
        </button>
      </footer>
    </div>
  );
}

export default App;
