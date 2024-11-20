import { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Define prop types for StatsItem
interface StatsItemProps {
  title: string;
  value: string | number;
  icon: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ title, value, icon }) => {
  return (
    <div className="col-lg-3 col-6">
      <div className="game-card-container mt-3">
        <div className="stats-item d-flex flex-column justify-content-center align-items-center">
          <p style={{ marginTop: "10px", color: "#d7d3d3" }}>{title}</p>
          <p
            style={{
              marginTop: "2px",
              fontSize: "1.2rem",
              color: "rgb(227, 230, 233)",
            }}
          >
            <i className={icon} style={{ color: "#d7d3d3" }}></i>
            <strong>{value}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

// FriendsList component
const FriendsList: React.FC = () => {
  return (
    <div className="stats-item d-flex flex-column justify-content-start align-items-start">
      <p>Friends List</p>
      <ol></ol>
    </div>
  );
};

// Invite Component
function Invite({ userId }: { userId: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [friendsInvited, setFriendsInvited] = useState<number>(0);
  const [pointsEarned, setPointsEarned] = useState<number>(0);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5000/api/register/trackReferral/api/register/trackReferral/api/userStats?userId=${userId}`
        );
        const { friendsInvited, pointsEarned } = response.data;

        setFriendsInvited(friendsInvited || 0);
        setPointsEarned(pointsEarned || 0);
      } catch (error) {
        console.error("Error fetching user stats: ", error);
        alert("Failed to load user statistics.");
      }
    };

    fetchData();
  }, [userId]);

  const handleCopyLink = () => {
    const inviteLink = `https://t.me/MiniBalanceAppBot/MiniBalanceApp/invite?referrer=${userId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds

        // Notify backend that the referral link was copied
        axios
          .post(
            "http://localhost:5000/api/register/trackReferral/api/trackReferral",
            { userId }
          )
          .then((response) => {
            console.log("Referral tracked: ", response.data);
          })
          .catch((err) => {
            console.error("Failed to track referral: ", err);
          });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy invite link");
      });
  };

  return (
    <div className="StatsCard">
      <h2>Invite friends and earn points to farm</h2>
      <p>You can earn up to 20,000 points just by referring your friends!</p>

      {/* Stats Section */}
      <div
        className="stats row mb-4 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <StatsItem
          title="Friends Invited"
          value={friendsInvited}
          icon="fa-solid fa-users fa-2xs"
        />
        <StatsItem
          title="Points Earned"
          value={pointsEarned}
          icon="fa-solid fa-comment-dollar fa-2xs"
        />
      </div>

      {/* Referral Button */}
      <div>
        <button onClick={handleCopyLink}>
          {isCopied ? "Invite Link Copied!" : "Copy Invite Link"}
        </button>
      </div>

      {/* Friends List Section */}
      <FriendsList />
    </div>
  );
}

export default Invite;
