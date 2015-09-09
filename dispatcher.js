var dispatcher = {
  handlers: {},

  dispatch: function(eventName, payload) {
    // Bail out if no array of handlers exists for the chosen event
    if (!this.handlers[eventName]) {
      return;
    }

    // Isolate the appropriate array of handlers based on event name
    var handlers = this.handlers[eventName];

    // Execute all handlers in the array,
    // using the context supplied when registered
    for (var i = 0; i < handlers.length; i++) {
      var handler = handlers[i];
      handler.callback.apply(handler.context, [payload]);
    }
  },

  register: function(eventName, callback, context) {
    // If there is no array of handlers for the chosen event, create one
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    // Register the event handler by pushing it onto the handler array
    this.handlers[eventName].push({
      callback: callback,
      context: context
    });

    // Create and return a handlerID for unregistering this handler
    handlerID = {
      eventName: eventName,
      index: this.handlers[eventName].length - 1
    };

    return handlerID;
  },

  unregister: function(handlerID) {
    // Isolate the appropriate array of handlers based on event name
    var handlers = this.handlers[handlerID.eventName] || [];

    // Remove the handler at the given index
    handlers.splice(handlerID.index, 1);
  }
};

// Support module export where available: require('dispatcher')
if (typeof module != 'undefined' && module.exports) {
  module.exports = dispatcher;
}
