import { createContext, useContext, useState, useEffect } from 'react'
import api from '../axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return setLoading(false);
        }

        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/api/auth/profile')
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                console.log("Could not fetch profile", err);
                localStorage.removeItem("token");
            }
            finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])


    const login = async (email, password) => {
        const { data } = await api.post("/api/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data;
    };


    const signup = async (name, email, password, role = "user") => {
        const { data } = await api.post("/api/auth/register", { name, email, password, role });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data;
    };


    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}