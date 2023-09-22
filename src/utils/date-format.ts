export const getCurrentDateString = () => {
    // Get the current date
    const currentDate = new Date();

    // Get the day, month, and year from the current date
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const year = currentDate.getFullYear();

    // Format the date string in "DD-MM-YYYY" format
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

export const getCurrentDateTimeString = () => {
    // Get the current date
    const currentDate = new Date();

    // Get the hours and minutes from the current date
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Months are zero-based, so we add 1

    // Format the date string in "DD-MM-YYYY" format
    const formattedDate = `${getCurrentDateString()} ${hours}:${minutes}`;

    return formattedDate;
}

export const formatDayMonth = (date: Date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth()+1);

    return day.padStart(2, '0') + '-' + month.padStart(2, '0');
}