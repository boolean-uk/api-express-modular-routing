class MissingFieldsError extends Error {
  statusCode = 400;
  message = "Missing fields in request body";
}

class ExistingEntryError extends Error {
  statusCode = 409;
  message = "Entry already exists";
}

class IdError extends Error {
  statusCode = 404;
  message = "Provided ID not found";
}

class notFoundError extends Error {
    statusCode = 404
    message = "Not found";
}

const checkForMissingFields = (database, inputBody) => {
  const databaseCopy = { ...database[0] };
  delete databaseCopy["id"];
  const keysInDatabase = Object.keys(databaseCopy);
  const keysInInput = Object.keys(inputBody);
  const objKeysAreTheSame =
    keysInDatabase.every((item) => keysInInput.includes(item)) &&
    keysInInput.every((item) => keysInDatabase.includes(item));
  if (!objKeysAreTheSame) {
    throw new MissingFieldsError();
  }
  return !objKeysAreTheSame;
};

const checkForExistingEntry = (database, inputBody) => {
  const databaseCopy = JSON.parse(JSON.stringify(database));
  let objValuesAreTheSame = false
  databaseCopy.forEach((item) => {
    delete item.id;
    const valuesInDatabase = Object.values(item);
    const valuesInInput = Object.values(inputBody);
    const isExistingEntry =
      valuesInDatabase.every((item) => valuesInInput.includes(item)) &&
      valuesInInput.every((item) => valuesInDatabase.includes(item));
    if (isExistingEntry) {
      objValuesAreTheSame = true;
      throw new ExistingEntryError();
    }
  });
 
  return objValuesAreTheSame;
};

const findById = (database, id) => {
    const foundEntry = database.find((item) => item.id === id)
    if (!foundEntry) {
        throw new IdError()
    }
    return foundEntry
}

module.exports = { checkForMissingFields, checkForExistingEntry, findById, notFoundError };
