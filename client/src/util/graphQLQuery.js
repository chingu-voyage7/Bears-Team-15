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
        }
    }
`;
const getEventById = gql`
    query($id: String) {
        getEventById(id: $id) {
            id
            title
            image
            description
            date
            location {
                address
                city
                state
                zip
            }
            organizer {
                firstName
                lastName
                image
            }
            attendees {
                firstName
            }
            supplies {
                name
                description
                quantity
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
        $description: String
        $title: String
        $address: String
        $city: String
        $state: String
        $zip: Int
        $category: String
        $date: date
    ) {
        addNewEvent(
            organizer: $organizer
            organization: $organization
            description: $description
            title: $title
            location: {address: $address, city: $city, state: $state, zip: $zip}
            category: $category
            date: $date
        ) {
            title
            location {
                address
                city
            }
            date
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
            location
            organizer {
                id
                firstName
            }
            attendees {
                lastName
            }
            supplies
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
            firstName
            lastName
            email
            password
            passwordTwo
            age
            phone
            address
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
};
