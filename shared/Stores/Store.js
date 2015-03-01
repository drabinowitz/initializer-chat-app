var EventEmitter = require('eventemitter').EventEmitter;

//store constructor
var Store = function (name) {
  //store properties from EventEmitter
  EventEmitter.call(this);
  //store data as object
  this._data = {};
  //store name
  this.name = name;
  this.size = 0;
};

//inherit from EventEmitter
Store.prototype = Object.create(EventEmitter.prototype);
Store.prototype.constructor = Store;

//dehydrate our store state so we can submit it to the client
Store.prototype.dehydrate = function () {
  return [this.name, this._data];
};

//rehydrate our store state so we can receive it on the client
Store.prototype.rehydrate = function (state) {
  this._data = state[this.name];
};

//emit a change event
Store.prototype.emitChange = function () {
  this.emit('CHANGE');
};

//add a listener for the change event
Store.prototype.addChangeListener = function (callback) {
  this.addListener('CHANGE', callback);
};

//remove a listener for the change event
Store.prototype.removeChangeListener = function (callback) {
  this.removeListener('CHANGE', callback);
};

//get the value assciated with the id
Store.prototype.get = function (id) {
  return this._data[id];
};

//get all values
Store.prototype.getAll = function () {
  return this._data;
};

//add value to data and emit change
Store.prototype.create = function (value) {
  this._data[value.id] = value;
  this.size++;
  this.emitChange();
};

//read in data to store and emit change
Store.prototype.read = function (data) {
  this._data = data;
  this.size = Object.keys(data).length;
  this.emitChange();
};

//update value in data and emit change
Store.prototype.update = function (value, newValue) {
  this._data[value.id] = newValue;
  this.emitChange();
};

//remove value from data and emit change
Store.prototype.delete = function (value) {
  delete this._data[value.id];
  this.size--;
  this.emitChange();
};

module.exports = Store;
