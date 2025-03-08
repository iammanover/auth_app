import { useEffect, useState } from "react";
import { IAuthForm } from "../../../utils/interface/loginForm.interface";
import "./Dashboard.css";
import { useAuthentication } from "../../../hooks/useAuthentication";

const Dashboard = () => {
  const { logout } = useAuthentication();
  // users detail
  const [user, setUser] = useState<IAuthForm | null>(null);
  // showing loading text when data is loading
  const [loading, setLoading] = useState<boolean>(true);
  // for error displaying
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // loads the user data when component mounts
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        // fetching data from our server
        const response = await fetch("http://localhost:3000/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setUser(data.data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching dashboard data.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // function used for extracting name from email id
  const getUserName = (email: string) => {
    const username = email.split("@")[0];
    return username;
  };

  // Display loading text while data is fetching
  if (loading) {
    return <div className="center">Loading...</div>;
  }

  // Show error if there is any error
  if (error) {
    return <div className="center">Error: {error}</div>;
  }

  return (
    <div className="center">
      {user && (
        <div>
          <h1>Hi, {getUserName(user.email)}.</h1>
        </div>
      )}
      <h3>welcome to Dashboard</h3>
      <button onClick={logout} className="button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
