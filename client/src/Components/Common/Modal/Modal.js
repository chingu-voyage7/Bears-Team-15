import React from 'react';
import {connect} from 'react-redux';

import {closeModal} from '../../../reduxes/actions/modal_actions';
import LoginForm from '../../Pages/Session/LoginForm.jsx';
import SignupForm from '../../Pages/Session/SignupForm.jsx';
import './modal.css';
import AddSupplyForm from '../../Modules/Forms/AddSupplyForm';
import SupplyForm from '../../Modules/Forms/SupplyForm';
import EventForm from '../../Modules/Forms/EventForm.js';
import ProfileForm from '../../Modules/Forms/ProfileForm.js';
// import {navigate} from '@reach/router';
function Modal({modal, closeModal, data}) {
    if (!modal) {
        return null;
    }

    // case "add-Items" => itemform,case "edit-event"=> editform
    let component;
    console.log(modal);
    switch (modal) {
        case 'EDIT_PROFILE_FORM':
            component = <ProfileForm />;
            break;
        case 'NEW_EVENT_FORM':
            component = <EventForm />;
            break;
        case 'ADD_SUPPLY':
            component = <AddSupplyForm/>;
            break;
        case 'SUPPLY_FORM':
            component = <SupplyForm />;
            break;
        case 'LOGIN':
            component = <LoginForm />;
            break;
        case 'SIGNUP':
            component = <SignupForm />;
            break;
        case 'EVENT_EDIT':
            component = <EventForm />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        modal: state.modal.modal,
        data: state.modal.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);
