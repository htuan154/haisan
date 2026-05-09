function validateRequiredFields(payload, requiredFields = []) {
  const missingFields = requiredFields.filter((field) => payload[field] === undefined || payload[field] === null);
  return {
    ok: missingFields.length === 0,
    missingFields,
  };
}

function validateEnumFields(payload, enumFields = {}) {
  const invalidFields = [];

  for (const [field, allowedValues] of Object.entries(enumFields)) {
    if (payload[field] !== undefined && payload[field] !== null && !allowedValues.includes(payload[field])) {
      invalidFields.push({ field, value: payload[field], allowedValues });
    }
  }

  return {
    ok: invalidFields.length === 0,
    invalidFields,
  };
}

module.exports = {
  validateRequiredFields,
  validateEnumFields,
};
