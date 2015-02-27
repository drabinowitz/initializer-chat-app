var EventEmitter = require('eventemitter').EventEmitter;

var Store = function (data) {
  EventEmitter.call(this);
  this._data = data;
};

Store.prototype = Object.create(EventEmitter.prototype);
Store.prototype.constructor = Store;

Store.prototype.emitChange = function () {
  this.emit('CHANGE');
};

Store.prototype.addChangeListener = function (callback) {
  this.addListener('CHANGE', callback);
};

Store.prototype.removeChangeListener = function (callback) {
  this.removeChangeListener('CHANGE', callback);
};

Store.prototype.get = function (id) {
  return this._data[id];
};

Store.prototype.getAll = function () {
  return this._data;
};

Store.prototype.create = function (value) {
  this._data[value.id] = value;
  this.emitChange();
};

Store.prototype.read = function (data) {
  this._data = data;
  this.emitChange();
};

Store.prototype.update = function (value, newValue) {
  this._data[value.id] = newValue;
  this.emitChange();
};

Store.prototype.delete = function (value) {
  delete this._data[value.id];
  this.emitChange();
};

module.exports = Store;
