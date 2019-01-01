import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../../../reduxes/actions/modal_actions";
import LoginForm from "../../Pages/Session/LoginForm.jsx";
import SignupForm from "../../Pages/Session/SignupForm.jsx";
import './modal.css';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  // case "add-Items" => itemform,case "edit-event"=> editform 
  let component;
  switch (modal) {
    case "login":
      component = <LoginForm />;
      break;
    case "signup":
      component = <SignupForm />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
