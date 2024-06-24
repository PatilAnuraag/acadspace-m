import { SET_Career, SET_Type,SET_Steam, LOGOUT, SET_Webinar,SET_Report } from "./actionTypes";
const initialState = {
  career: null,
    logout: null,
    steam: null,
    type:null,
    webinar:null,
    report:null
  };

  const careerReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_Career:
        return {
          ...state,
          career: action.payload,
        };
      case SET_Type:
        return {
          ...state,
          type: action.payload,
        };
      case SET_Steam:
        return {
          ...state,
          steam: action.payload,
        };
      case SET_Report:
        return {
          ...state,
          report: action.payload,
        };
      case SET_Webinar:
        return {
          ...state,
          webinar: action.payload,
        };
        case LOGOUT:
          return initialState;
      default:
        return state;
    }
  };
  
  export default careerReducer;