import {
    dateTimeDiff
} from "./common.js";

export function timeToObject(firstTime, secondTime) {
    const timeDiff = dateTimeDiff(firstTime, secondTime, ['hours', 'minutes', 'seconds']);
    return timeDiff.toObject();
}