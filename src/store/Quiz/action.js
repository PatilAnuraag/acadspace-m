import { SET_Quiz_FIRST, SET_Quiz_SECOND, SET_Quiz_THIRD, SET_TEST_ID} from "./actionTypes";


export const setQuizFirst = (quiz) => ({
    type: SET_Quiz_FIRST,
    payload: quiz,
  });
export const setQuizSecond = (quiz) => ({
    type: SET_Quiz_SECOND,
    payload: quiz,
  });
export const setQuizThird = (quiz) => ({
    type: SET_Quiz_THIRD,
    payload: quiz,
  });
export const setTestID = (testID) => ({
    type: SET_TEST_ID,
    payload: testID,
  });

  
