import React from 'react';

function SalesList({ arrayList, openDialog }) {
    let sales = '';
    let totalSalesAmount = 0;
    let totalPurchaseAmount = 0;

    // Check if there are no sales data
    if (arrayList === undefined || arrayList.length === 0) {
        sales = (
            <div style={styles.noData}>
                <h5>No Data Available</h5>
            </div>
        );
    } else {
        sales = arrayList.map((sale, index) => {
            let isProfit = sale.salesAmount - sale.purchaseAmount >= 0;
            totalPurchaseAmount += sale.purchaseAmount;
            totalSalesAmount += sale.salesAmount;
            return (
                <div key={index} style={{ ...styles.saleRow, ...(isProfit ? styles.profit : styles.loss) }}>
                    <div style={styles.col}>{sale.date}</div>
                    <div style={styles.col}>${sale.salesAmount.toFixed(2)}</div>
                    <div style={styles.col}>${sale.purchaseAmount.toFixed(2)}</div>
                    <div style={styles.col}>${(sale.salesAmount - sale.purchaseAmount).toFixed(2)}</div>
                </div>
            );
        });
    }

    let isProfit = totalSalesAmount - totalPurchaseAmount >= 0;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.col}>Date</div>
                <div style={styles.col}>Sales Amount</div>
                <div style={styles.col}>Purchase Amount</div>
                <div style={styles.col}>Profit / Loss</div>
            </div>

            <div style={styles.salesData}>
                {sales}
            </div>

            <div style={{ ...styles.footer, ...(isProfit ? styles.bgSuccess : styles.bgDanger) }}>
                <button style={styles.addButton} onClick={openDialog}>Add</button>
                <div style={styles.totals}>
                    <div style={styles.col}>${totalSalesAmount.toFixed(2)}</div>
                    <div style={styles.col}>${totalPurchaseAmount.toFixed(2)}</div>
                    <div style={styles.col}>${(totalSalesAmount - totalPurchaseAmount).toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        borderRadius: '8px 8px 0 0',
    },
    salesData: {
        maxHeight: '300px',
        overflowY: 'scroll',
        marginBottom: '15px',
    },
    saleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #e0e0e0',
    },
    profit: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    col: {
        flex: 1,
        textAlign: 'center',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '0 0 8px 8px',
        color: 'white',
    },
    bgSuccess: {
        backgroundColor: '#28a745',
    },
    bgDanger: {
        backgroundColor: '#dc3545',
    },
    addButton: {
        backgroundColor: '#28a745',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    noData: {
        textAlign: 'center',
        marginTop: '20px',
    },
};

export default SalesList;
