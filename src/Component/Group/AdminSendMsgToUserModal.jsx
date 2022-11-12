import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { adminSendMsgModalAct } from "../../ReduxStore/Actions/modalActs";
import { useFormik } from "formik";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

import GroupService from "../../Services/GroupService";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
    errorStyle: {
        color: "red",
        fontSize: "20px",
    },
};




//Admin send message to user
let AdminSendMsgToUserModal = () => {

    let dispatch = useDispatch();
    let { modalReducer } = useSelector(state => state);


    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: async (values, { resetForm }) => {
       
      
            values.groupID = modalReducer.groupId;
            values.userID = modalReducer.userId;
            values.adminID = modalReducer.adminUserId
            values.communityID = modalReducer.communityId
            values.NotificationTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

            const res = await GroupService.addUserNotificationMessage(values);



            if (res.data.statusCode === 200) {
                dispatch(adminSendMsgModalAct(
                    {
                        status: false,
                        adminModalStatus: !modalReducer.adminModalStatus,
                        groupId: null,
                        userId: null,
                        adminUserId: null,
                        communityId: null,
                        userName:null
                    }
                ));
                resetForm()
                NotificationManager.success( " Send message successfully.")
            }else{
                NotificationManager.error("Error Message", res.data.message )
            }
        },
        validate: (values) => {
            let errors = {};


            if (!values.message || !values.message.trim()) {
                errors.message = "Please enter text.";
            }

            return errors;
        },
    });

    return (
        <>
            <Modal
                isOpen={modalReducer.adminModalStatus}
                style={customStyles}
                contentLabel="Example Modal"
                backdrop="static"
            >
                <div className="d-flex justify-content-center"><h3>Admin send message to user</h3></div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-body-create-grp modal-bodycstm1">
                        <div className="modal-body p-0">
                            <div className="modal-create-group-name">
                                <div className="form-group field-set-form mb-3">
                                    <h6>{modalReducer.userName !== null && modalReducer.userName}</h6>
                                    <div className="form-group mb-3">

                                        <textarea
                                            name="message"
                                            className="form-control cstm-field"
                                            rows="10"
                                            cols="40"
                                            id="comment"
                                            style={{ height: "100px" }}
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                        </textarea>
                                    </div>
                                    {formik.touched.message && formik.errors.message ? (
                                        <div style={customStyles.errorStyle}>
                                            {formik.errors.message}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(
                                    adminSendMsgModalAct({ status: false, adminModalStatus: !modalReducer.adminModalStatus })
                                );
                                formik.resetForm();
                            }
                            }
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </Modal>
            <NotificationContainer />
        </>
    )

}

export default AdminSendMsgToUserModal;