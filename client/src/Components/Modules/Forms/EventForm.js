import React, {Component} from 'react';
import {connect} from 'react-redux';
import './forms.scss';
import {addNewEvent, updateEvent} from '../../../util/graphQLQuery';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {graphql, compose} from 'react-apollo';
import {getUser, getEventById} from '../../../util/graphQLQuery';
import {withApollo} from 'react-apollo';
import Calendar from 'react-calendar';

class EventForm extends Component {
    constructor(props, {currentUser}) {
        super(props, {currentUser});
        this.state = {
            form: {
                title: '',
                // organizer: '',
                organization: '',
                description: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                category: '',
                time: '',
                date: new Date(),
            },
            mutation: '',
            refetchQueries: [],
            headerName: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {refetchQueries, form, mutation} = this.state;
        const {client, closeModal, eventData, currentUser} = this.props;
        let time = form.time.split(':');
        form.date.setHours(time[0], time[1]);

        closeModal();
        client.mutate({
            mutation,
            variables: {
                eventId: eventData.id,
                title: form.title,
                organizer: currentUser.id,
                organization: form.organization,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                zip: parseInt(form.zip),
                category: form.category,
                date: form.date,
            },
            refetchQueries,
        });
    };

    onChange = (event) => {
        //cloning state instead of directly changing value
        const clonedState = {...this.state.form};
        const {name, value} = event.target;
        clonedState[name] = value;
        this.setState({
            form: clonedState,
        });
    };

    //should run before rendering
    componentWillMount = () => {
        const {currentUser, page, eventData} = this.props;

        switch (page) {
            case 'PROFILE':
                this.setState({
                    headerName: 'NEW EVENT',
                    mutation: addNewEvent,
                    refetchQueries: [
                        {
                            query: getUser,
                            variables: {id: currentUser.id},
                        },
                    ],
                });
                break;
            case 'EVENT':
                this.setState({
                    headerName: 'UPDATE EVENT',
                    mutation: updateEvent,
                    refetchQueries: [
                        {
                            query: getEventById,
                            variables: {id: eventData.id},
                        },
                    ],
                });
                break;
            default:
                return null;
        }
    };

    render() {
        const {form, headerName} = this.state;
        return (
            <div className="modal-form">
                <h2 className="text-center">{headerName}</h2>
                <form
                    className="modal-event-split"
                    id="newEvent"
                    onSubmit={this.onSubmit}>
                    <div className="modal-event">
                        <div className="modal-event-field">
                            <label>Title</label>
                            <input
                                name="title"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>Organization(optional)</label>
                            <input
                                name="organization"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>Description</label>
                            <input
                                name="description"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>Address</label>
                            <input
                                name="address"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>City</label>
                            <input
                                name="city"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>State</label>
                            <input
                                name="state"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>Zip</label>
                            <input
                                name="zip"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field">
                            <label>Category</label>
                            <input
                                name="category"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="modal-event-field modal-event-center">
                            <label>Time</label>
                            <input
                                name="time"
                                type="time"
                                onChange={this.onChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="modal-event-calendar">
                            <label>Calendar</label>
                            <Calendar
                                onChange={(value) => {
                                    form.date = value;
                                }}
                                value={form.date}
                            />
                        </div>
                    </div>
                </form>
                <button className="text-center" type="submit" form="newEvent">
                    Submit
                </button>
            </div>
        );
    }
}

// const EventForm = ({event, client, currentUser, closeModal}) => {
//     let form = {
//         title: '',
//         organizer: currentUser.id,
//         organization: '',
//         description: '',
//         Address: '',
//         city: '',
//         state: '',
//         zip: '',
//         category: '',
//         time: '',
//         date: new Date(),
//     };

//     const onChange = (event) => {
//         form[event.target.name] = event.target.value;
//         // set fields
//     };
//     const onSubmit = (event) => {
//         let time = form.time.split(':');
//         form.date.setHours(time[0], time[1]);
//         // set the time
//         event.preventDefault();
//         closeModal();
//         client.mutate({
//             mutation: addNewEvent,
//             variables: {
//                 organizer: form.organizer,
//                 organization: form.organization,
//                 description: form.description,
//                 title: form.title,
//                 address: form.address,
//                 city: form.city,
//                 state: form.state,
//                 zip: parseInt(form.zip),
//                 category: form.category,
//                 date: form.date,
//             },
//             refetchQueries: [
//                 {
//                     query: getUser,
//                     variables: {id: currentUser.id},
//                 },
//             ],
//         });
//     };
//     return (<div className="modal-form">
//     <h2 className="text-center">New Event</h2>
//         <form className="modal-event-split" id="newEvent" onSubmit={onSubmit}>
//         <div className="modal-event">

//             <div className="modal-event-field"><label>Title</label><input name="title" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>Organization(optional)</label><input name="organization" onChange={onChange} /></div>
//             <div className="modal-event-field"><label>Description</label><input name="description" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>Address</label><input name="address" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>City</label><input name="city" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>State</label><input name="state" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>Zip</label><input name="zip" onChange={onChange} required /></div>
//             <div className="modal-event-field"><label>Category</label><input name="category" onChange={onChange} required /></div>
//             <div className="modal-event-field modal-event-center"><label>Time</label><input name="time" type="time" onChange={onChange} required /></div>

//             {/*public or private needs field */}
//         </div>
//         <div>
//             <div className="modal-event-calendar"><label>Calendar</label><Calendar onChange={(value)=>{form.date=value; console.log(form.date)}} value= {form.date}/></div>

//         </div>
//         </form>
//         <button className="text-center" type="submit" form="newEvent">Submit</button>
//     </div>);
// }

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
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
    graphql(getUser, {
        name: 'getUser',
        options: (props) => {
            console.log('graphprops', props);
            return {
                variables: {
                    id: props.currentUser.id,
                },
            };
        },
    })
)(withApollo(EventForm));
