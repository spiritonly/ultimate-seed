/*
 * client/js/setup/backbone/marionette/application.js
 */

'use strict';

var url = require('url');

var _ = require('lodash'),
    Backbone = require('backbone');

_.extend(Backbone.Marionette.Application.prototype, {
  navigate: function (route, options) {
    if (!_.isObject(options)) { options = {}; }
    route = route.replace(/#$/, '');
    Backbone.history.navigate(route, options);
  },

  getRoute: function () {
    var frag = Backbone.history.fragment;
    return (_.isEmpty(frag) ? '' : frag);
  },

  getUrl: function () {
    return url.parse(location.href);
  },

  register: function (instance, id) {
    this._registry = this._registry || {};
    this._registry[id] = instance;
  },

  unregister: function (instance, id) {
    delete this._registry[id];
  },

  resetRegistry: function () {
    var oldCount = this.getRegistrySize();
    _.each(this._registry, function (controller/*, key*/) {
      controller.region.close();
    });
    var msg = 'There were ' + oldCount + ' controllers in the registry, there are now #{@getRegistrySize()}';
    if (this.getRegistrySize() > 0) {
      console.warn(msg, this._registry);
    } else {
      console.log(msg);
    }
  },

  getRegistrySize: function () {
    return _.size(this._registry);
  }
});