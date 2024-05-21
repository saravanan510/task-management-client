const fileValidation = (value) => {
  const errors = {};
  if (value.file.lenght == 0) {
    errors.file = "file is required";
  }
  return errors;
};

export default fileValidation;
