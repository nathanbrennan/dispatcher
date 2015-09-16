# Dispatcher

A bare-bones solution for registering and listening to arbitrary events with JavaScript


## Installation

```shell
$ npm install dispatcher --save
```

## Usage

First thing to do is to require the module.

```javascript
var dispatcher = require('dispatcher');
```


### Register Event Handlers

Register event handlers by calling the register method. Pass the event name against which the handler is to be registered, along with the handler you wish to register.

```javascript
var myHandler = function() {
  console.log('myHandler ran!');
};

dispatcher.register('some_event', myHandler);

dispatcher.register('some_other_event', function() {
  console.log('My anonymous function ran!');
});
```


### Dispatch Event Handlers

Simply call the dispatch method, passing the name of the event you wish to dispatch.

```javascript
dispatcher.dispatch('some_event');
```


### Register an Event Handler with Context

To have a registered handler called with a particular [context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this "this - JavaScript | MDN"), simply pass the context when the handler is registered.

```javascript
var counter = {
 total: 0,
 addOne: function() {
  this.total++;
 }
};

dispatcher.register('some_event', counter.addOne, counter);
dispatcher.dispatch('some_event');

console.log(counter.total); // Outputs: 1
```


### Unregister an Event Handler

To unregister an event handler, first you need to capture the handlerID returned by the register method.
Then simply call unregister, passing the handlerID of the handler you wish to unregister.

```javascript
var handlerID = dispatcher.register('some_event', function() {
  console.log('Anonymous function ran!');
});

dispatcher.unregister(handlerID);
```


## Tests

```shell
$ npm test
```


## Release History

* 0.1.0 Initial release