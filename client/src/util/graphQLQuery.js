import { gql } from 'apollo-boost';

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
            title
            image
            description
            location
            date
            organizer {
                firstName
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
    $title: String 
    $address: String 
    $city: String 
    $state: String 
    $zip: Int 
    $category: String){
    addNewEvent(
        organizer: $organizer 
        organization: $organization 
        title: $title 
        location:{
            address: $address 
            city: $city 
            state: $state
            zip: $zip
         }
         category: $category
         ){
        title
        location{
            address
            city
            
        }
    }
}
`
    ;
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
};
