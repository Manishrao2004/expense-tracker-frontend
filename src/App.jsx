import { useState } from "react";
import api from "./services/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("TOKEN", token);
    } catch (error) {
      console.error(error.response?.data?.error || "Login failed");
    }
  };

  const testProtected = async () => {
    const res = await api.get("/me");
    console.log(res.data);
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Expense Tracker Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <button
            onClick={testProtected}
            className="mt-4 w-full bg-green-600 text-white p-2 rounded"
          >
            Test Protected
          </button>
      </div>
    </div>
  );
}

export default App;
