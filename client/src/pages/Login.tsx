import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/authSlice";

function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.data);
    const error = useAppSelector((state) => state.auth.error);

    console.log(error)

    const handleChange = (e: any) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = await dispatch(login(inputs))
        
        if (data.payload && 'token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
            navigate('/')
        }

        
    }

    if (user && window.localStorage.getItem('token')) {
        return <Navigate to='/' />   
    }

    return (
        <div className="container-lg my-5">
            <div className="text-center align-items-center align-content-center">
                <div className="d-flex justify-content-center">
                    <form className="border p-5" onSubmit={handleSubmit}>
                        <h4 className="text-secondary fw-bold fs-3 mb-5">Login</h4>

                        <div className="mb-3">
                            <input type="email" placeholder="Email Address" className="form-control" name="email" value={inputs.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <input type="password" placeholder="Password" className="form-control" name="password" value={inputs.password} onChange={handleChange} required />
                        </div>
                        
                        {
                            error && typeof error === 'string' && (
                                <div className="alert alert-danger">{error}</div>
                            )
                        }

                        <div className="mb-4">
                            <p>Not a Member? <Link to="/register">Sign Up</Link></p>
                        </div>

                        <button type="submit" className="btn btn-info">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login