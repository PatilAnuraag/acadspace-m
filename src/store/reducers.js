import { combineReducers } from 'redux';
import roleReducer from './Role/reducer';
import quizReducer from './Quiz/reducer';
import linkReducer from './Link/reducer';
import careerReducer from './Career/reducer';


const rootReducer = combineReducers({
    roleReducer, 
    quizReducer,
    linkReducer,
    careerReducer
});

export default rootReducer;