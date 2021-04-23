import {
    DateTime
} from "./luxon.js";

export function dateTimeDiff(firstISO, secondISO, precision) {
    let first = DateTime.fromISO(firstISO);
    let second = DateTime.fromISO(secondISO);
    if (first > second) {
        const buffer = second;
        second = first;
        first = buffer;
    }
    return second.diff(first, precision);
}