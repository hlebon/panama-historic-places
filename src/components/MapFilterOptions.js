import React from 'react';


const styles = {
    modal: {
        width: "400px",
        height: "auto",
        minHeight: "60px",
        padding: "5px",
        backgroundColor: "white",
        color: "white",
        position: "fixed",
        top: "10px",
        left: "40px",
        borderRadius: "7px",
        boxShadow: "0 15px 35px rgba(0,0,0,.1)"
    }
}

class MapFilterOptions extends React.Component {
    render() {
        return (
            <div style={styles.modal}>
                Texto de prueba
            </div>
        )
    }
}

export default MapFilterOptions;