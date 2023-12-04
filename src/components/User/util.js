const validateForm = (data) => {
  const errors = {};
  for (const field of Object.keys(data)) {
    if (!data[field].trim()) {
      errors[field] = `${
        field === "password1" ? "confirmation password" : field
      } is required`;
    } else if (data.password !== data.password1) {
      errors.password = "password must match";
      errors.password1 = "password must match";
    }
  }

  return isEmpty(errors) ? null : errors;
};

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0);

export default validateForm;
