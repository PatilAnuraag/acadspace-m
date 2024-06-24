import { SET_Quiz_FIRST, SET_Quiz_SECOND, SET_Quiz_THIRD, SET_TEST_ID } from "./actionTypes";

const initialState = {
    quizFirst: null,
    quizSecond:null,
    quizThird:null,
    testID:null,
  };

  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_Quiz_FIRST:
        return {
          ...state,
          quizFirst: action.payload,
        };
  
        case SET_Quiz_SECOND:
        return {
          ...state,
          quizSecond: action.payload,
        };
        
        case SET_Quiz_THIRD:
        return {
          ...state,
          quizThird: action.payload,
        };
        case SET_TEST_ID:
        return {
          ...state,
          testID: action.payload,
        };

       
      default:
        return state;
    }
  };
  
  export default quizReducer;