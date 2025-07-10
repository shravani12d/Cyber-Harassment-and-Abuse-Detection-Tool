import React from "react";
import "./popup.css";
function Popup({message, onClose}){
    return(
        <div className="popup">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        
    );
}
export default Popup;