// All reducers will be combined here. The resulting reducer is used in store creation.

import { combineReducers } from "redux";
import authentication from './authentication'

export default combineReducers({
    authentication,

});
