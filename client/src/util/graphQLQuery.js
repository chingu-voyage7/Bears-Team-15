import {gql} from 'apollo-boost';

const testUserQuery = gql`
    {
        userGetAll {
            firstName
            id
        }
    }
`;

const test = gql`
    {
        testQuery {
            test
        }
    }
`;

const userLogin = gql`
    query($email: String = "", $password: String = "") {
        userLogin(email: $email, password: $password) {
            token
            statusCode
            isSuccess
            msg
        }
    }
`;

const currUser = gql`
    query($id: String = "") {
        currentUser(id: $id) {
            email
            isSuccess
        }
    }
`;
const getUser = gql`
    query($id: String) {
        getUser(id: $id) {
            firstName
            email
            image
            eventsId {
                id
                title
            }
            attendedEvent {
                id
                title
            }
        }
    }
`;
const getEventById = gql`
    query($id: String, $uID: String) {
        getEventById(id: $id) {
            id
            title
            image
            description
            location {
                address
                city
                state
                zip
            }
            organizer {
                id
                firstName
                lastName
                image
            }
            attendees {
                id
                firstName
            }
            supplies {
                name
                description
                quantity
            }
        }
        getUser(id: $uID) {
            attendedEvent {
                id
            }
        }
    }
`;

const queryFilterEvents = gql`
    query($char: String) {
        filterEvent(char: $char) {
            id
            title
            date
            image
            description
            location
            organizer {
                id
                firstName
            }
            attendees {
                lastName
            }
        }
    }
`;

const addNewEvent = gql`
    mutation addNewEvent(
        $organizer: ID
        $organization: String
        $title: String
        $address: String
        $city: String
        $state: String
        $zip: Int
        $category: String
    ) {
        addNewEvent(
            organizer: $organizer
            organization: $organization
            title: $title
            location: {address: $address, city: $city, state: $state, zip: $zip}
            category: $category
        ) {
            title
            location {
                address
                city
            }
        }
    }
`;

const getAllEvents = gql`
    {
        getAllEvents {
            id
            title
            date
            image
            description
            location {
                address
                city
                state
                country
                zip
            }
            organizer {
                id
                firstName
            }
            supplies {
                id
                name
                description
                quantity
                OwnerId
            }
            attendees {
                lastName
            }
            # supplies
        }
    }
`;

const updateEvent = gql`
    mutation addNewEvent(
        $id: ID
        $title: String
        $organization: String
        $description: String
        $address: String
        $city: String
        $state: String
        $zip: Int # $category: String
    ) {
        updateEvent(
            id: $id
            title: $title
            organization: $organization
            description: $description
            location: {address: $address, city: $city, state: $state, zip: $zip} # category: $category
        ) {
            title
            location {
                address
                city
            }
        }
    }
`;

const deleteEvent = gql`
    mutation($eventId: ID, $userId: ID) {
        deleteEvent(eventId: $eventId, userId: $userId) {
            id
        }
    }
`;

const addUser = gql`
    mutation(
        $firstName: String = ""
        $lastName: String = ""
        $email: String = ""
        $password: String = ""
        $passwordTwo: String = ""
    ) {
        addUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            passwordTwo: $passwordTwo
        ) {
            token
            statusCode
            isSuccess
            msg
        }
    }
`;

const attendEvent = gql`
    mutation($eventId: ID, $attendeeId: ID) {
        attendEvent(eventId: $eventId, attendeeId: $attendeeId) {
            id
        }
    }
`;

const unAttendEvent = gql`
    mutation($eventId: ID, $currentUserId: ID) {
        unAttendEvent(eventId: $eventId, currentUserId: $currentUserId) {
            id
        }
    }
`;

export {
    testUserQuery,
    userLogin,
    test,
    addUser,
    currUser,
    addNewEvent,
    getAllEvents,
    getEventById,
    getUser,
    queryFilterEvents,
    updateEvent,
    deleteEvent,
    attendEvent,
    unAttendEvent,
};
