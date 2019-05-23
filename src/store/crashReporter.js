/* global FS */
import * as Sentry from '@sentry/browser';

const crashReporter = store => next => action => {
  //console.log(`crash reporter loaded with action: ${JSON.stringify(action)}`);
  let nextState;
  if (typeof action === 'function') {
    let run = async () => { 
      try {
        nextState = await next(action);
      } catch (err) {
        console.log(`error in crash reporter: ${err}`);
      }
    };
    run();
  } else {
    nextState = next(action);
  }
  
  return nextState;
  /*
  try {
    return next(action);
  } catch (err) {
    console.log(`error in crash reporter: ${err}`);
    let sentryEventId;
    // Send replay URL to Sentry
    Sentry.withScope(scope => {
      // TODO: host an official FullStory package in npm so FS can be imported as a module
      if (window.FS && FS.getCurrentSessionURL) {
        scope.setExtra('fullstory', FS.getCurrentSessionURL(true));
      }      
      sentryEventId = Sentry.captureException(err);
    });

    console.log(`sentry event id: ${sentryEventId}`);

    // Send error to FullStory
    FS.event('Redux error', {
      error: {
        name: err.name,
        message: err.message,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        stack: err.stack,
        sentryEventId,
      },
      state: store.getState(), //NOTE: strip out any sensitive fields first
    });
    throw err;
  }*/
};

export default crashReporter;