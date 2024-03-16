import { v4 as uuidv4 } from 'uuid';

function createUniqueFileKey(fileName) {
    // Get the file extension
    const fileExtension = fileName.split('.').pop();

    // Create a unique UUID
    const uuid = uuidv4();

    // Return the UUID and append the file extension
    return uuid + '.' + fileExtension;
}

export default createUniqueFileKey;