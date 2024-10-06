import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';

import Navbar from '../Component/Navbar';
import SalesList from './SalesList';
import Dialog from './Dialog';

function Home() {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [isDialogOpen, setDialog] = useState(false);

    // Open dialog
    const openDialog = () => {
        setDialog(true);
    };

    // Close dialog
    const closeDialog = () => {
        setDialog(false);
    };

    const apiUrl = `${apiBaseUrl}/user/${id}`;

    useEffect(() => {
        fetch(apiUrl, { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, [apiUrl]);

    return (
        <>
            <Navbar id={user._id} shopName={user.shopName} />

            <div style={styles.container}>
                <h2 style={styles.heading}>{user.shopName}'s Sales History</h2>

                <div style={styles.buttonContainer}>
                    <button 
                        style={styles.addButton}
                        onClick={openDialog}
                    >
                        Add Sales Entry
                    </button>
                </div>

                <div style={styles.salesList}>
                    {user.history && user.history.length > 0 ? (
                        user.history.map((entry) => (
                            <div style={styles.card} key={entry._id}>
                                <div style={styles.cardBody}>
                                    <h5 style={styles.cardTitle}>Date: {entry.date}</h5>
                                    <p style={styles.cardText}>Sales Amount: ${entry.salesAmount}</p>
                                    <p style={styles.cardText}>Purchase Amount: ${entry.purchaseAmount}</p>
                                    <button style={styles.editButton}>Edit</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noSalesMessage}>No sales history available.</p>
                    )}
                </div>
            </div>

            {isDialogOpen && <Dialog 
                id={id}
                closeDialog={closeDialog}
                user={user}
                setUser={setUser} 
            />}
        </>
    );
}

const styles = {
    container: {
        marginTop: '100px',
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    salesList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '30%',
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.2s',
    },
    cardBody: {
        padding: '20px',
    },
    cardTitle: {
        fontSize: '1.25em',
        marginBottom: '10px',
    },
    cardText: {
        margin: '5px 0',
    },
    editButton: {
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#007bff',
        border: '1px solid #007bff',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s',
    },
    noSalesMessage: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '1.2em',
    },
};

export default Home;
