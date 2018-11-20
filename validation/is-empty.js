// Custom function we will use to check whether a given string consists of valid input:

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;