export const getCurrentDate = () => {
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