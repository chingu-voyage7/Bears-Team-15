// create a util function that checks the user authentication.
import SetGetCookie from './helper.cookie';
import {auth} from '../reduxes/actions/isAuthAction';
import {login, setCurrentUser} from '../reduxes/actions/session_actions';
import {openModal} from '../reduxes/actions/modal_actions';

const {getCookie} = new SetGetCookie('tokenizer');

/**
 * this function should check if the user is authenticated.
 * @param {BOOLEAN} bool
 */
const checkIfAuth = (bool) => (dispatch) => {
    const token = getCookie();
    // checks the token in the cookies
    if (token) {
        // pass token as argument to session action
        dispatch(login(token));
        // pass a boolean argument to set isAuth to true
        dispatch(auth(true));
    } else {
        if (bool === false) {
            dispatch(openModal('LOGIN'));
        }
        //TODO: handle error if theres no token. NEED HELP!!!
        dispatch(auth(false));
    }
};

export {checkIfAuth};
