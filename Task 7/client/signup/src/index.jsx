import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    fetchCookie();
  }, []);

  const fetchCookie = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/server/auth/userVerify`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setCookieData(response.data);
        localStorage.setItem(response.data)
        alert("Successfully verified");
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error during verification");
    }
  };

  return (
    <div>
      {cookieData ? (
        <div>
          <h1>Welcome, {cookieData.name}</h1>
          <p>Email: {cookieData.email}</p>
        </div>
      ) : (
        <h1>Loading user data...</h1>
      )}
    </div>
  );
}
