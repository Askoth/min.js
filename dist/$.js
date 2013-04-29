/*globals Element:true, NodeList:true*/
$ = (function (document, $) {
  var element = Element.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      arrSlice = 'slice',
      trigger = 'trigger',
      each = [][forEach],
      slice = [][arrSlice],
      dummy = document.createElement();

  nodeList[forEach] = each;

  element.on = function (event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  nodeList.on = function (event, fn) {
    each.call(this, function (el) {
      el.on(event, fn);
    });
    return this;
  };

  element.trigger = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = slice.call(arguments, 1) || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList.trigger = function (event) {
    each.call(this, function (el) {
      el[trigger](arguments);
    });
    return this;
  };

  $ = function (s) {
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;
    return length == 1 ? r[0] : !length ? nodeList : r;
  };

  $.on = element.on.bind(dummy);
  $.trigger = element[trigger].bind(dummy);

  return $;
})(document);
