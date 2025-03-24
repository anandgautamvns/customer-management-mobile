export const displayErrorMessage = (error: any) => {
  if (error) {
    const errors: any = error.response?.data;
    let message = [];
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        if (Array.isArray(errors[field])) {
          message.push(errors[field].join(", "));
        } else {
          message.push(errors[field]);
        }
      }
    }
    message.push(error.message);
    return message.join(", ");
  }
  return "";
};
