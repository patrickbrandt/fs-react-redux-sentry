import { doError } from '../actions/error';

const crashReporter = store => next => action => {
  // we got a thunk
  if (typeof action === 'function') {
    const wrapAction = fn => async (dispatch, getState, extraArgument) => {
      try {
        await fn(dispatch, getState, extraArgument);
      } catch (e) {
        console.log(`in wrapped action: ${e}`);
        dispatch(doError(e));
      }
    }
    return next(wrapAction(action));
  }
  
  return next(action);
};

export default crashReporter;