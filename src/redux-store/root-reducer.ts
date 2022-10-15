import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({sample: (state = '') => state}); //reducers to be passed here

export {rootReducer};
