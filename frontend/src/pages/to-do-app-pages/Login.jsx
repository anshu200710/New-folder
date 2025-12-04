import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("login"); // "login" or "register"
  const isLogin = state === "login";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      // adapt to your API shape; fallback to generic message
      setError(err?.response?.data?.message || err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span> {isLogin ? "Login" : "Sign Up"}
      </p>

      {!isLogin && (
        <div className="w-full">
          <p className="text-sm text-gray-600">Name</p>
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required={!isLogin}
          />
        </div>
      )}

      <div className="w-full">
        <p className="text-sm text-gray-600">Email</p>
        <input
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p className="text-sm text-gray-600">Password</p>
        <input
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          minLength={6}
          required
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

      <div className="w-full text-sm">
        {isLogin ? (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-indigo-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Already have account?{" "}
            <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">
              click here
            </span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white transition-all ${
          loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
        }`}
      >
        {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
      </button>
    </form>
    </div>
  );
};

export default Login;
