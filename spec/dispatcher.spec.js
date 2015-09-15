var dispatcher = require('../../dispatcher'),
    handler_1_HasRun = false,
    handler_2_HasRun = false,
    handler_3_HasRun = false,
    handler_4_HasRun = false,
    handlerIDs = {};

var foo = {
  handler_1: function() { handler_1_HasRun = true },
  handler_2: function() { handler_2_HasRun = true }
};

var bar = {
  handler_3: function() { handler_3_HasRun = true },
  handler_4: function() { handler_4_HasRun = true }
};

describe('Dispatcher', function () {

  it('can register multiple handlers for multiple events', function() {

    handlerIDs['handler_1'] = dispatcher.register('event_A', foo.handler_1);
    handlerIDs['handler_2'] = dispatcher.register('event_A', foo.handler_2);
    handlerIDs['handler_3'] = dispatcher.register('event_B', bar.handler_3);
    handlerIDs['handler_4'] = dispatcher.register('event_B', bar.handler_4);

    expect(dispatcher.handlers.event_A.length).toEqual(2);
    expect(dispatcher.handlers.event_B.length).toEqual(2);
  });

  it('can register an event handler with a specific context', function() {
    var counter = {
     total: 0,
     addOne: function() {
      this.total++;
     }
    };

    dispatcher.register('some_event', counter.addOne, counter);
    dispatcher.dispatch('some_event');

    expect(counter.total).toEqual(1);
  })

  describe('when multiple handlers for multiple events have been registered', function() {

    beforeEach(function() {
      handler_1_HasRun = false,
      handler_2_HasRun = false,
      handler_3_HasRun = false,
      handler_4_HasRun = false;
    });

    it('can triggers all handlers for a given event', function() {
      dispatcher.dispatch('event_A');

      expect(handler_1_HasRun).toEqual(true);
      expect(handler_2_HasRun).toEqual(true);

      expect(handler_3_HasRun).toEqual(false);
      expect(handler_4_HasRun).toEqual(false);
    });

    it('can unregister a single handler', function() {
      dispatcher.unregister(handlerIDs['handler_1']);
      dispatcher.dispatch('event_A');

      expect(handler_1_HasRun).toEqual(false);
      expect(handler_2_HasRun).toEqual(true);
    });
  });
});