import { useState } from "react";
import { apiBaseUrl } from '../../apiBaseUrl';
import { useNavigate } from "react-router-dom";

function Dialog({ setUser, user, closeDialog }) {
    const [data, setData] = useState({
        salesAmount: '',
        purchaseAmount: ''
    });

    const [dataValidation, setDataValidation] = useState({
        salesAmount: false,
        purchaseAmount: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setDataValidation({
            ...dataValidation,
            [e.target.name]: false
        });
    };

    const handleSubmit = (e) => {
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

        if (isEmpty) return;

        let date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        fetch(`${apiBaseUrl}/userhistory/${user._id}`, {
            method: 'POST',
            body: JSON.stringify({
                date: formattedDate,
                salesAmount: parseFloat(data.salesAmount),
                purchaseAmount: parseFloat(data.purchaseAmount)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((res) => {
                setUser({
                    ...res
                });
            });

        closeDialog();
    };

    return (
        <div className="modal" style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <form>
                    <h3 className="text-center mb-4" style={{ color: "#333", fontWeight: "600" }}>Update Amounts</h3>
                    
                    <div className="form-group mb-3">
                        <label className="form-label">Sales Amount</label>
                        {dataValidation.salesAmount && <small className="text-danger ms-2">Enter sales amount</small>}
                        <input
                            type="number"
                            className="form-control form-control-lg rounded-pill shadow-sm"
                            placeholder="Enter sales amount"
                            name="salesAmount"
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label">Purchase Amount</label>
                        {dataValidation.purchaseAmount && <small className="text-danger ms-2">Enter purchase amount</small>}
                        <input
                            type="number"
                            className="form-control form-control-lg rounded-pill shadow-sm"
                            placeholder="Enter purchase amount"
                            name="purchaseAmount"
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg me-2 px-5 rounded-pill" onClick={handleSubmit} style={submitButtonStyles}>
                            Submit
                        </button>

                        <button type="button" onClick={closeDialog} className="btn btn-outline-danger btn-lg px-5 rounded-pill">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // Dim background for better focus
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1050,
};

const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    width: "100%",
    maxWidth: "500px", // Constrained width for better readability
    textAlign: "center"
};

const inputStyles = {
    padding: "10px 15px",
    fontSize: "1.1rem",
    borderColor: "#ddd",
    borderRadius: "30px",
    marginTop: "5px",
};

const submitButtonStyles = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

export default Dialog;
