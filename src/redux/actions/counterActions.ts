import * as types from './actionTypes';
export function updateCounter(value:string) {
    return {
        type: types.COUNTER_VALUE,
        value: value
    }
}
