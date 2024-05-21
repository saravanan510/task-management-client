const commentValidation = (value) => {
  const errors = {};
  if (value.comment.trim().length === 0) {
    errors.comment = "Please enter the comment";
  }
  return errors;
};

export default commentValidation;
