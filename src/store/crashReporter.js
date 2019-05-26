import { doError } from '../actions/error';

// NOTE: dispatching from within this middleware could cause an infinite error handling loop
// if the action handler for the error type (where Sentry and FS log errors) thrown an error as well
// a other option that I'm mulling is to simply attempt to record the error and then have the execution stop
const crashReporter = store => next => action => {
  // we got a thunk
  if (typeof action === 'function') {
    const wrapAction = fn => async (dispatch, getState, extraArgument) => {
      try {
        await fn(dispatch, getState, extraArgument);
      } catch (e) {
        dispatch(doError(e));
      }
    }
    return next(wrapAction(action));
  }
  
  try {
    return next(action);
  } catch (e) {
    store.dispatch(doError(e));
  }
};

export default crashReporter;