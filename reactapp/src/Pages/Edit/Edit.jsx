import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';
import Navbar from '../Component/Navbar';
import Dialog from './Dialog';
import './Edit.css'; // Importing the CSS file

function Edit() {
    const [user, setUser] = useState({});
    const [shopName, setShopName] = useState('');
    const [resetData, setResetData] = useState(true);
    const [dataValidation, setDataValidation] = useState({
        'shopName': false,
        'userName': false,
        'email': false,
        'contact': false,
        'password': false
    });
    const { id } = useParams();
    const [isDialogOpen, setDialog] = useState(false);
    const [toDelete, setTODelete] = useState(false);
    const navigate = useNavigate();

    const apiUrl = `${apiBaseUrl}/user/${id}`;

    useEffect(() => {
        fetch(apiUrl, { method: "GET" })
            .then(res => res.json())
            .then((res) => {
                setUser(res);
                setShopName(res.shopName);
            });
    }, [apiUrl, resetData]);

    const updateChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        });
        setDataValidation({
            ...dataValidation,
            [e.target.name]: false
        });
    };

    const deleteAccount = () => {
        fetch(`${apiBaseUrl}/user/${id}`, { method: 'DELETE' })
            .then(res => res.text())
            .then(() => {
                navigate('/');
            });
    };

    const editAccount = () => {
        fetch(`${apiBaseUrl}/user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then((res) => {
                setUser(res);
                navigate(`/user/${user._id}`);
            });
    };

    const submit = (e) => {
        e.preventDefault();

        if (e.target.name === "delete") {
            setTODelete(true);
            setDialog(true);
            return;
        }

        let invalid = {};
        let isEmpty = false;

        Object.entries(user).forEach(([key, value]) => {
            if (value === '') {
                invalid[key] = true;
                isEmpty = true;
            }
        });

        setDataValidation({ ...dataValidation, ...invalid });
        if (isEmpty) return;

        setTODelete(false);
        setDialog(true);
    };

    return (
        <>
            <Navbar id={user._id} shopName={shopName} />

            <div className='container pt-5 mt-5' style={containerStyles}>
                <form>
                    {/* Username and Email */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={user.userName || ""} disabled />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={user.email || ""} onChange={updateChange} name="email" />
                            {dataValidation.email && <small className="text-danger">Enter a valid email</small>}
                        </div>
                    </div>

                    {/* Shop Name and Contact */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Shop Name</label>
                            <input type="text" className="form-control" value={user.shopName || ""} onChange={updateChange} name="shopName" />
                            {dataValidation.shopName && <small className="text-danger">Enter shop name</small>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" value={user.contact || ""} onChange={updateChange} name="contact" />
                            {dataValidation.contact && <small className="text-danger">Enter a valid contact number</small>}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="form-row">
                        <div className="form-group">
                            <button className="btn btn-outline-success w-100" onClick={() => setResetData(!resetData)}>Reset</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-primary w-100" onClick={submit}>Edit</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-danger w-100" onClick={submit} name="delete">Delete</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/user/${user._id}`)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Dialog Component */}
            {isDialogOpen && <Dialog id={id} correctPassword={user.password} closeDialog={() => setDialog(false)} callFunction={toDelete ? deleteAccount : editAccount} />}
        </>
    );
}

const containerStyles = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

export default Edit;
