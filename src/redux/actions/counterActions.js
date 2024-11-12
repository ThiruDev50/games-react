import * as types from './actionTypes';
export function updateCounter(value) {
    return {
        type: types.COUNTER_VALUE,
        value: value
    }
}
