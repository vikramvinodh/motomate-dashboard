// Modify the convertToIso function to handle time zone offset
export default function convertStartToIso(inputDateString) {
    const inputDate = new Date(inputDateString);

    const timeZoneOffset = new Date().getTimezoneOffset();

    inputDate.setMinutes(inputDate.getMinutes() - timeZoneOffset);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(inputDate.getMilliseconds()).padStart(3, '0');

    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return formattedDateString;
}


export function convertEndToIso(inputDateString) {
    const inputDate = new Date(inputDateString);

    inputDate.setHours(23, 59, 59, 999);

    const timeZoneOffset = new Date().getTimezoneOffset();

    inputDate.setMinutes(inputDate.getMinutes() - timeZoneOffset);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(inputDate.getMilliseconds()).padStart(3, '0');

    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return formattedDateString;
}
