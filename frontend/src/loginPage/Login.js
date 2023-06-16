import React, { useContext } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import StateContext from '../StateContext';

const Login = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(StateContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = (e) => {
            e.preventDefault();
        axios.post("http://localhost:5000/login", user)
            .then(res => {
                alert(res.data.message)
                setUser(res.data.user)
                if (res.data.user.email === "hr") {
                    navigate("/HrDashboard ")
                }
                else if (res.data.user.email === "oo") {
                    navigate("/RepOfficerDashboard")
                }
                else {
                    navigate("/EmployeeDashboard")
                }
            })
    }
    return (
        <div className="containerLogin">
            <div className="image-container">
                <img src="data:image/png;base64,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" alt="Logo" />
            </div>
            <h2>Login your Account</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" />
                </div>
                <div className="form-group">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <div className="form-group">
                    <button onClick={login}>Login</button>
                </div>
            </form>
            <div className="forgot-password">
                <a href="/">Forgot password?</a>
            </div>
        </div>
    )
}

export default Login

