import { SET_USER_ROLE, SET_USER_ID, SET_USER_NAME, SET_JWTTOKEN ,SET_O_PHOTO, SET_STUDENT, SET_PHONE, SET_SPACE_BUCKS , SET_NEW_REGISTER ,LOGOUT } from "./actionTypes";

const initialState = {
    userRole: null,
    userId:null,
    userName:null,
    jwtToken:null,
    o_photo:null,
    student:null,
    phone:null,
    spaceBucks:null,
    newRegister:null,
    logout: null
  };

  const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_ROLE:
        return {
          ...state,
          userRole: action.payload,
        };

        case SET_USER_ID:
            return {
              ...state,
              userId: action.payload,
            };
    
            case SET_USER_NAME:
              return {
                ...state,
                userName: action.payload,
              };
      
              case SET_JWTTOKEN:
                return {
                  ...state,
                  jwtToken: action.payload,
                };
      
              case SET_O_PHOTO:
                return {
                  ...state,
                  o_photo: action.payload,
                };
              case SET_STUDENT:
                return {
                  ...state,
                  student: action.payload,
                };
              case SET_PHONE:
                return {
                  ...state,
                  phone: action.payload,
                };
              case SET_SPACE_BUCKS:
                return {
                  ...state,
                  spaceBucks: action.payload,
                };
              case SET_NEW_REGISTER:
                return {
                  ...state,
                  newRegister: action.payload,
                };
                case LOGOUT:
                  return initialState;
      default:
        return state;
    }
  };
  
  export default roleReducer;