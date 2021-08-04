import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPass } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginPage = () => {
    const loading = useSelector(({ui}) => ui.loading)
    console.log(loading)
    const dispatch = useDispatch();
    const [formData, handleInputChange, reset] = useForm({
        email: 'carlos7397@hotmail.com',
        password: '1234567'
    });

    const {email, password} = formData;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPass(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>
            <form 
            onSubmit={handleLogin}
            className="animate__animated animate__fadeIn animate__faster"
            >
                <input
                type="text"
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
                />
                <input
                type="password"
                placeholder="Password"
                name="password"
                className="auth__input"
                autoComplete="off"
                value={password}
                onChange={handleInputChange}
                />
                <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={loading}
                >
                    Login
                </button>
                <div className="auth__social-networks">
                    <p>LogIn with social networks</p>
                    <div 
                    className="google-btn"
                    onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register"
                className="link">
                    Create Account
                </Link>

            </form>
        </div>
    )
}
