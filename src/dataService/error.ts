import { APIError } from "../redux/type";

export const displayErrorMessage = (error: APIError | null) => {
  if (error) {
    const errors: any = error.response?.data;
    let message = []
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        if (Array.isArray(errors[field])) {
          message.push(errors[field].join(', '))
        } else {
          message.push(errors[field])
        }
      }
    }
    message.push(error.message)
    return message.join(', ')
  }
  return ''
}