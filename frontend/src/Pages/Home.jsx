import { useEffect, useState } from "react";
import { fetchData } from "../Utils/api";

const Home = () => {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    fetchData("/api/hello")
      .then(data => setMessage(data.message))
      .catch(err => setMessage("Error fetching data: " + err.message));
  }, []);

  return (
    <div className="p-4">
      <h1>SkillEval.ai</h1>
      <p>Backend says: {message}</p>
    </div>
  );
};


export default Home;
