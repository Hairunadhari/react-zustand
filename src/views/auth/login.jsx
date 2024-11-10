//import hook react
import React, { useState } from 'react';

//import hook useNavigate from react router dom
import { useNavigate } from "react-router-dom";

//import store
import { useStore } from '../../stores/user';

export default function Login() {

    //navigate
    const navigate = useNavigate();

    //destruct action "login" from store
    const { login } = useStore();

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();

        //call action "login" from store
        await login({ email, password })
            .then((response) => {

                //redirect to dashboard
                navigate('/dashboard');
            })
            .catch((error) => {

                //assign error to state "validation"
                setValidation(error.response.data);
            })
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                {
                    validation.message && (
                        <div className="alert alert-danger">
                            {validation.message}
                        </div>
                    )
                }
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <h4>LOGIN</h4>
                        <hr />
                        <form onSubmit={loginHandler}>
                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Email address</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                            </div>
                            {
                                validation.email && (
                                    <div className="alert alert-danger mt-2">
                                        {validation.email[0]}
                                    </div>
                                )
                            }

                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                            </div>
                            {
                                validation.password && (
                                    <div className="alert alert-danger mt-2">
                                        {validation.password[0]}
                                    </div>
                                )
                            }
                            <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}