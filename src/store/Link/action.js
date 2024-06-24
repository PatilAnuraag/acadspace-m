import { SET_ActiveLink, SET_DISPLAY_OFF, LOGOUT} from "./actionTypes";

export const setActiveLink = (quiz) => ({
    type: SET_ActiveLink,
    payload: quiz,
  });
export const setDisplayOff = (display) => ({
    type: SET_DISPLAY_OFF,
    payload: display,
  });

  export const setLogoutLink = (logout) => ({
    type: LOGOUT,
    payload: logout,
  });
  
