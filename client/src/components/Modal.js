import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
               <div className="header">Delete Stream</div>
               <div className="content">
                   Are you sure you want to delete this stream?
               </div>
               <div className="actions">
                   <button className="ui primary button">Delete</button>
                   <button className="ui button">Cancel</button>
               </div>
            </div>
        </div>, //seconde argument createPortal
        document.querySelector('#modal') //every time we render Modal component, rather than showing it as a direct child of the parent cmp, it will be rendered into the div with an id:modal
    );
};

export default Modal;
