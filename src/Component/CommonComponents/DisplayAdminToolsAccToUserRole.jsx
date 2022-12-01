import React from "react";
import { Link } from "react-router-dom";

let DisplayAdminToolsAccToUserRole = ({ cartDetailsObj }) => {

    return (
        <div className="adm-tools-outer-box">
            {cartDetailsObj.length > 0 ?
                cartDetailsObj.map((cardData, index) => (
                    <Link
                        to={cardData.router}
                        className="adm-tools-card text-decoration-none"
                        key={index}
                    >
                        <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                                <img src={cardData.cardIcon} alt="icon" />
                            </div>
                            <h5>{cardData.cardText}</h5>
                        </div>
                    </Link>
                ))
                : "Admin Tools Not Found.."
            }
        </div>
    )
}

export default DisplayAdminToolsAccToUserRole;