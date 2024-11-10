//import hook react
import React, { useState } from "react";

//import hook useNavigate from react router dom
import { useNavigate } from "react-router-dom";

//import store
import { useStore } from '../../stores/user';

export default function Register() {
    //navigate
    const navigate = useNavigate();

    //destruct action "register" from store
    const { register } = useStore();

    //define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();

        //call action "register" from store
        await register({ name, email, password, password_confirmation: passwordConfirmation })
            .then(() => {
                //redirect to login page
                navigate("/login");
            })
            .catch((error) => {
                //assign error to state "validation"
                setValidation(error.response.data);
            });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <h4>REGISTER</h4>
                        <hr />
                        <form onSubmit={registerHandler}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Full Name</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap" />
                                    </div>
                                    {
                                        validation.name && (
                                            <div className="alert alert-danger mt-2">
                                                {validation.name[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
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
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Konfirmasi Password</label>
                                        <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">REGISTER</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}