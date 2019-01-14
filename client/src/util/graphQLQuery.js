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
// const addEvent = gql`
// mutation($event: {
//     Title: String,
//     Organization: String,
//     Descritpino: String,
//     Address: String,
//     City: String,
//     State: String,
//     Zip: String,
//     Time: String,
//     Category: String
// }){
//     addEvent(event:$event){
//        title
//     }
// }
// `;
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
    query($id: String){
        getUser(id: $id){
            firstName
            email
            eventsId{
                id
                title
                
            }
        }
    }
`;
const getEventById = gql`
    query($id: String){
        getEventById(id: $id){
            title
            attendees{
                firstName
            }
            organizer{
                firstName
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
    getAllEvents,
    getEventById,
    getUser,
    queryFilterEvents,
};
