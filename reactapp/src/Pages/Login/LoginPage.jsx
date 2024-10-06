import { useState } from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import './Login.css';
import { apiBaseUrl } from '../../apiBaseUrl';

function LoginPage(){
    return(
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <Outlet/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    );
}


export default LoginPage;