import {
    dateTimeDiff
} from "./common.js";

export function dateToObject(firstDate, secondDate) {
    const dateDiff = dateTimeDiff(firstDate, secondDate, ['years', 'months', 'days']);
    return dateDiff.toObject();
}

export const diffToHtml = diff => `
    <span> 
        ${diff.years ? 'Лет: ' + diff.years : ''} 
        ${diff.months ? 'Месяцев: ' + diff.months : ''} 
        ${diff.days ? 'Дней: ' + diff.days : ''}
    </span>
`;