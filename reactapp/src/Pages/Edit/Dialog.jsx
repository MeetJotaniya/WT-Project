import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dialog({ id, correctPassword, closeDialog, callFunction }) {

    const [data, setData] = useState({ password: '' });
    const [submitStatus, setSubmitStatus] = useState(false);
    const [dataValidation, setDataValidation] = useState({ password: false });

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

        if (data.password !== correctPassword) {
            setSubmitStatus(true);
            return;
        }

        callFunction();
        closeDialog();
    };

    return (
        <div className="modal fade-in" style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <form>

                    <div className="form-outline mb-4">
                        <label className="form-label" style={labelStyles}> Password </label> 
                        {dataValidation.password && 
                          <label className="form-label ms-4 text-danger" style={errorLabelStyles}> Enter Password </label>
                        }

                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Enter Password"
                            name="password" 
                            onChange={handleChange}
                            style={inputStyles}
                            required
                        />
                    </div>

                    {submitStatus && (
                        <label className="text-danger" style={errorLabelStyles}>
                            Invalid Password
                        </label>
                    )}

                    <div className="modal-footer">
                        <button 
                            type="submit" 
                            className="btn btn-success" 
                            onClick={handleSubmit}
                            style={submitButtonStyles}
                        >
                            Submit
                        </button>

                        <button 
                            type="button" 
                            onClick={closeDialog} 
                            className="btn btn-danger" 
                            style={closeButtonStyles}
                        >
                            Close
                        </button>
                    </div>
        
                </form>
            </div>
        </div>
    );
}

// Styles for the modal background
const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",  // Slightly darker overlay
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fade-in 0.3s ease-in-out",  // Add fade-in animation
};

// Styles for the modal content (card-like)
const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",  // Smooth rounded corners
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",  // Soft shadow effect
    width: "auto",
    maxWidth: "400px",
    animation: "scale-in 0.3s ease-in-out",  // Add scale-in animation
};

// Styles for the input fields
const inputStyles = {
    borderRadius: "8px",  // Rounded input fields
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ced4da",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for inputs
    width: "100%"
};

// Styles for labels
const labelStyles = {
    fontSize: "1.1rem",
    color: "#333",
};

// Styles for error labels
const errorLabelStyles = {
    fontSize: "0.9rem",
    color: "#e63946",
};

// Styles for the submit button
const submitButtonStyles = {
    backgroundColor: "#28a745",  // Green gradient button
    borderColor: "#28a745",
    borderRadius: "20px",  // Rounded button
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    transition: "all 0.2s ease-in-out",
};

// Styles for the close button
const closeButtonStyles = {
    backgroundColor: "#dc3545",  // Red gradient button
    borderColor: "#dc3545",
    borderRadius: "20px",  // Rounded button
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    transition: "all 0.2s ease-in-out",
};

export default Dialog;
