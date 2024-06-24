import { SET_ActiveLink, SET_DISPLAY_OFF,LOGOUT } from "./actionTypes";
const initialState = {
    activeLink: null,
    display:null,
    logout: null
  };

  const linkReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ActiveLink:
        return {
          ...state,
          activeLink: action.payload,
        };
      case SET_DISPLAY_OFF:
        return {
          ...state,
          display: action.payload,
        };
        case LOGOUT:
          return initialState;
      default:
        return state;
    }
  };
  
  export default linkReducer;