import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';


function SignIn(){

    const [submitStatus, setSubmitStatus] = useState(false);

    const [dataValidation, setDataValidation] = useState({
        'username' : false,
        'password' : false
    });

    const [data, setData] = useState({
        'username' : '',
        'password' : ''
    });

    const navigate = useNavigate();

    let updateChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
        setDataValidation({
            ...dataValidation,
            [e.target.name] : false
        });
    }


    let submit = (e) => {

        e.preventDefault();

        let invalid = {};

        let isEmpty = false;

        Object.entries(data).forEach(([key, value]) => {
            if (value === '') {
                invalid[key] = true;
                isEmpty = true; 
            }
        });

        setDataValidation({
            ...dataValidation,
            ...invalid
        });

        if( isEmpty ) return;

        fetch(`${apiBaseUrl}/userLogin/${data.username}/${data.password}`)
        .then(res => res.text())
        .then((res) => {
            if(res === "NotFound" || res === null){
                setSubmitStatus(true);
            }
            else navigate(`/user/${res}`);
        });


    }

    return(
        <>

            {/* <!-- Username input --> */}
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" > Username </label> 
                <label className="form-label ms-4 text-danger" > { dataValidation.username && "Enter Username" } </label>

                <input type="username" id="form3Example3" className="form-control form-control-lg" placeholder="Enter Username"
                   name="username" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            {/* <!-- Password input --> */}
            <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" > Password </label>
                <label className="form-label ms-4 text-danger" > { dataValidation.password && "Enter Password" } </label> 

                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" 
                    name="password" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Status --> */}
                <label className="text-danger">
                    { submitStatus && "Invalid Username or Password" }
                </label>
                {/* <a href="#!" className="text-body">Forgot password?</a> */}
            </div>

            <div className="text-center text-lg-center mt-4 pt-2">

                <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "5rem",  paddingRight: "5rem" }} 
                    onClick={ (e) => submit(e) }
                > Login </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                    <Link to={"/signup"} className="link-danger"> Register </Link>
                </p>

            </div>
        </>
    );
}



export default SignIn;