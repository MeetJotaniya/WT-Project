import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function Navbar( { id, shopName } ) {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ps-3 pe-3" style={navbarStyle}>
                <div className="container-fluid">
                    {/* Logo or Shop Name in the center */}
                    <div className="mx-auto navbar-brand text-center text-light fs-4">
                        {shopName || "Shop Name"}
                    </div>

                    {/* Toggler for mobile view */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links on the right */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
                        <div className="d-flex dropdown me-3"> 
                            {/* Account Icon with Dropdown */}
                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaUserCircle size={24} className="me-2 text-light" /> 
                                <span className="text-light">Account</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" to={`/user/${id}`}> Home </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={`/user/edit/${id}`}> Edit Profile </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button
                                        className="btn btn-outline-danger dropdown-item text-danger d-flex align-items-center"
                                        onClick={() => {
                                            // Logout logic here
                                            navigate('/');
                                        }}
                                    >
                                        <FaSignOutAlt className="me-2" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

const navbarStyle = {
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: '10',
    backgroundColor: '#343a40',  // dark background
};

export default Navbar;
