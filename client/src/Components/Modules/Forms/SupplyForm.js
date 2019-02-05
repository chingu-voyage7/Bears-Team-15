import React from 'react';
import {connect} from 'react-redux';
import './forms.scss';
import {unvolunteerSupply,volunteerSupply, getEventById} from '../../../util/graphQLQuery';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {graphql, compose} from 'react-apollo';
import {withApollo} from 'react-apollo';
import {userHandleAttendAction} from '../../../reduxes/actions/attendEvent.action';

const SupplyForm = ({ client, currentUser, data, closeModal}) => {
    let form = {
        eventId: data.eventId,
        supplyId: data.supply.id,
        volunteerId: currentUser.id,
        quantity: '',
    };

    console.log(data);
    const onChange = (event) => {
        form[event.target.name] = event.target.value;

        // set fields
    };
    const exists = data.supply.volunteers.filter(function(item) {
        return item.volunteer.id === currentUser.id;
    });
    const volunteerRemove=(event)=>{
        event.preventDefault();
        const {eventId,supplyId}= form;
        console.log('idlist:   ',data);
        client.mutate({
            mutation: unvolunteerSupply,
            variables:{
                eventId,
                supplyId,
                donationId: exists[0].idG
            },
            refetchQueries:[
                {
                    query: getEventById,
                    variables:{id: data.eventId}
                }
            ]
        }).then(()=>closeModal());
    }
    const volunteerSubmit = (event) => {
        form.quantity = parseInt(form.quantity);

        event.preventDefault();

        client
            .mutate({
                mutation: volunteerSupply,
                variables: form,
                refetchQueries: [
                    {
                        query: getEventById,
                        variables: {id: data.eventId},
                    },
                ],
            })
            .then(() => closeModal());
    };



    const formButton = () => {
        if (exists.length > 0) {
            return <button
            onClick={(event)=>{
                volunteerRemove(event);
            }}
            >Remove Item</button>;
        } else {
            return (
                <button
                    onClick={(event) => {
                        volunteerSubmit(event);
                    }}>
                    Bring Item
                </button>
            );
        }
    };
    const fulfilled = data.supply.volunteers.reduce((a, b) => {
        return a + b.quantity;
    }, 0);

    if (currentUser.id) {
        return (
            <div className="modal-form">
                <div className="modal-form-supply">
                    <h2>{data.supply.name}</h2>
                    <p>{data.supply.description}</p>
                    <p>Quantity Needed: {data.supply.quantity - fulfilled}</p>
                    <p>Fulfilled:{fulfilled}</p>
                </div>
                <form className="modal-event">
                    <p>Donate Supplies</p>
                    <div className="modal-event-field">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            onChange={onChange}
                            required
                        />
                    </div>
                    {formButton()}
                </form>
            </div>
        );
    } else {
        return (
            <div className="modal-form">
                <div className="modal-event">
                    <h2>{data.supply.name}</h2>
                    <p>{data.supply.description}</p>
                    <p>Quantity Needed: {data.supply.quantity}</p>
                    <p>Login To Start Helping</p>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    data: state.modal.data,
});
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
        // replace with edit user
    ),
    graphql(getEventById, {
        name: 'getEventById',
    })
)(withApollo(SupplyForm));
