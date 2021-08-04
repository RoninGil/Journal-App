import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPassName } from '../../actions/auth';

export const RegisterPage = () => {

    const dispatch = useDispatch();
    
    const {msgError} = useSelector(state => state.ui)

    const [formData, handleInputChange, reset] = useForm({
        name: 'Carlos',
        email:'carlos7397@hotmail.com',
        password: '1234567',
        confirmPassword: '1234567'
    });

    const {name, email, password, confirmPassword} = formData;

    const handleRegister = (e) =>{
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPassName(email, password, name));
        }
        
    }

    const isFormValid  = () => {

        if(name.trim().length === 0){
            dispatch(setErrorAction('Name is required'));
            return false;
        }
        else if (!validator.isEmail(email)){
            dispatch(setErrorAction('Email is invalid.'));
            return false;
        }
        else if (password !== confirmPassword || password.length < 5) {
            dispatch(setErrorAction('Password is not long enough or does not match.'));
            return false;
        }

        dispatch(removeErrorAction());
        return true;
        
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>
            <form 
            onSubmit = {handleRegister}
            className="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError &&
                    <div className="auth__errors">
                        {msgError}
                    </div>
                }
                <input
                type="text"
                placeholder="Name"
                name="name"
                className="auth__input"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                />
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
                <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                className="auth__input"
                autoComplete="off"
                value={confirmPassword}
                onChange={handleInputChange}
                />
                <button
                className="btn btn-primary btn-block mb-5"
                type="submit"
                >
                    Register
                </button>
                
                <Link to="/auth/login"
                className="link">
                    Already registered?
                </Link>

            </form>
        </div>
    )
}
