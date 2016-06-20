import moment from 'moment';

export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const INTERNAL_ERROR = 'INTERNAL_ERROR';

export function displayError(message) {
  if(!message.title && !message.suggestion) {
    return {
      type: 'INTERNAL_ERROR',
      errMsg: 'Error was dispatched to be display but no details were provided'
    };
  }

  return {
    type: DISPLAY_ERROR,
    message: {
      time: moment().format('LTS'),
      description: message.description,
      suggestion: message.suggestion,
      error: message.error
    }
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
