function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        let nextState;
      if (typeof action === 'function') {
          let run = async () => {
              try {
                nextState = await action(dispatch, getState, extraArgument);
              } catch (e) {
                  console.log(`error ${e}`);
                  dispatch({
                      type: 'ERROR',
                      error: e,
                  })
              }
          };
          run();
      } else {
        nextState = next(action);
      }
  
      return nextState;
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;