import React from "react";
import SaveIconImage from "../../assets/images/icon_save.svg";
import "./controls.css";

const SaveIcon = props => (
    <div className="save-icon" {...props}>
        <img src={SaveIconImage} alt="save button" />
    </div>
);

export default SaveIcon;
