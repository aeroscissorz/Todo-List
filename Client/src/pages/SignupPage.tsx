import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  // Helper function to validate email
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    // Validate inputs
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://todo-list-bc1t.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password, confirmpassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to sign up");
      }

      setLoading(false); // Stop loading
      navigate("/login"); // Redirect on successful signup
    } catch (err) {
      setLoading(false); // Stop loading
      setError((err as Error).message); // Display error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg font-bold mb-4">Sign Up</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded mt-4 text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;