import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';


function SignUp(){

    const [submitStatus, setSubmitStatus] = useState(false);

    const [isValidUserName, setIsValidUserName] = useState(false);

    const [dataValidation, setDataValidation] = useState({
        'shopName': false,
        'userName': false,
        'email': false,
        'contact': false,
        'password': false,
        'confirmPassword': false
    });

    const [data, setData] = useState({
        'shopName': '',
        'userName': '',
        'email': '',
        'contact': '',
        'password': '',
        'confirmPassword': '',
    });

    const navigate = useNavigate();

    let updateChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value.trim()
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

        if( data.password != data.confirmPassword ){
            setSubmitStatus(true);
            return;
        }
        else{
            setSubmitStatus(false);
        }

        fetch(`${apiBaseUrl}/user`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.text())
        .then((res) => {
            // console.log(res);
            if(res === 'Username is unavailable'){
                setIsValidUserName(true);
                return;
            }
            navigate(`/`);
        });
    }


    return(
        <>
            {/* <!-- Username input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" > Username </label> 
                <label className="form-label ms-4 text-danger" > { dataValidation.userName ? "Enter Username" : ( isValidUserName ? "Username is unavailable" : "" ) } </label>

                <input type="username" className="form-control form-control-lg" placeholder="Enter Username"
                   name="userName" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            {/* <!-- Email input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" >Email address</label>
                <label className="form-label ms-4 text-danger" > { dataValidation.email && "Enter Email" } </label>

                <input name="email" type="email" className="form-control form-control-lg"
                    onChange={ (e) => { updateChange(e) } } placeholder="Enter a valid email address" />
            </div>

            {/* <!-- Shopname input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" > Shopname </label> 
                <label className="form-label ms-4 text-danger" > { dataValidation.shopName && "Enter Shopname" } </label>

                <input type="name" className="form-control form-control-lg" placeholder="Enter Shopname"
                   name="shopName" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            {/* <!-- Contact Number input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" > Contact Number </label> 
                <label className="form-label ms-4 text-danger" > { dataValidation.contact && "Enter Contact Number" } </label>

                <input type="number" className="form-control form-control-lg" placeholder="Enter Contact Number"
                   name="contact" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            {/* <!-- Password input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" >Password</label>
                <label className="form-label ms-4 text-danger" > { dataValidation.password && "Enter Password" } </label>

                <input name="password" type="password" className="form-control form-control-lg"
                    onChange={ (e) => { updateChange(e) } } placeholder="Enter password" />
            </div>

            {/* <!-- Check Password input --> */}
            <div data-mdb-input-init className="form-outline mb-2">
                <label className="form-label" >Confirm Password</label>
                <label className="form-label ms-4 text-danger" > { dataValidation.confirmPassword && "Enter Password" } </label>

                <input name="confirmPassword" type="password" className="form-control form-control-lg"
                    onChange={ (e) => { updateChange(e) } } placeholder="Enter password again" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Status --> */}
                <label className="text-danger">
                    { submitStatus && "Passwords do not match" }
                </label>
            </div>

            {/* <!-- Buttons --> */}
            <div className="text-center text-lg-center mt-4 pt-2">
                <button  
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={ e => submit(e) }
                    style={{ paddingLeft: "5rem",  paddingRight: "5rem" }}
                >SignUp</button>

                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <Link to={"/"}
                    className="link-danger">Login</Link></p>
            </div>
        </>
    );
}

export default SignUp;