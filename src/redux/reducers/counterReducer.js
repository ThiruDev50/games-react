import * as types from '../actions/actionTypes'

const counterReducer = (state = {}, action) => {
    switch (action.type) {
        case types.COUNTER_VALUE:
            return { ...state, [types.COUNTER_VALUE]: action.value };
        default:
            return state;
    }
};

export default counterReducer;
