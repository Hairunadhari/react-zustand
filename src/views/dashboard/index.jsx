//import store
import { useStore } from '../../stores/user';

//import hook useNavigate from react router dom
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    //destruct state "user" and action "logout" from store
    const { user, logout } = useStore();

    //navigate
    const navigate = useNavigate();

    //function "logoutHandler"
    const logoutHandler = async () => {
        //call action "logout" from store
        await logout()

        //redirect to login
        navigate("/login");
    }

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">HALAMAN DASHBOARD</h1>
                <p className="col-md-8 fs-4">Selamat Datang <strong>{user.name}</strong></p>
                <hr />
                <button className="btn btn-danger btn-md border-0 shadow" onClick={logoutHandler}>LOGOUT</button>
            </div>
        </div>
    )
}