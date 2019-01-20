import React from 'react';
import {connect} from 'react-redux';

import {closeModal} from '../../../reduxes/actions/modal_actions';
import LoginForm from '../../Pages/Session/LoginForm.jsx';
import SignupForm from '../../Pages/Session/SignupForm.jsx';
import './modal.css';
import SuppliesForm from '../../Modules/Forms/SuppliesForm';
import EventEdit from '../../Modules/EventEdit/EventEdit';

function Modal({modal, closeModal, data}) {
    if (!modal) {
        return null;
    }

    // case "add-Items" => itemform,case "edit-event"=> editform
    let component;
    switch (modal) {
        case 'supplies':
            component = <SuppliesForm />;
            break;
        case 'login':
            component = <LoginForm />;
            break;
        case 'signup':
            component = <SignupForm />;
            break;
        case 'eventEdit':
            component = <EventEdit eventData={data} />;
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
