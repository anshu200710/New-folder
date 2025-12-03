import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


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
      navigate("/tasks"); // redirect after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Sign up"}</h2>
      <form onSubmit={submit}>
        {!isLogin && (
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required={!isLogin} style={{ width: "100%", padding: 8 }} />
          </div>
        )}


        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" required style={{ width: "100%", padding: 8 }} />
        </div>


        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" required minLength={6} style={{ width: "100%", padding: 8 }} />
        </div>


        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}


        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Create account"}
        </button>
      </form>


      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  )
}

export default Login
