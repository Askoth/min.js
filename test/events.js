/*globals $:true*/
'use strict';

describe('events', function () {
  var spy;

  beforeEach(function () {
    spy = jasmine.createSpy();

    this.addMatchers({
        toHaveData: function(match) {
            return this.data.toBe(match);
        }
    });
  })

  afterEach(function () {
    spy.reset();
  });

  it('should assign an event to an element', function () {
    var $body = $('body');

    $body.on('click', spy);

    $body.trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should not trigger an event on a non-element', function () {
    $('.this-isnt-on-the-dom').on('event', spy);

    $('.this-isnt-on-the-dom').trigger('event');

    expect(spy).not.toHaveBeenCalled();
  });

  it('should assign an event to the internal element', function () {
    $.on('event', spy);

    $.trigger('event');

    expect(spy).toHaveBeenCalled();
  });

  it('should pass all arguments', function () {

    $.on('event', spy);

    $.trigger('event', 0, 1, 2, 3, 4);

    expect(spy.mostRecentCall.args[0].data[4]).toBe(4);

    expect(spy).toHaveBeenCalled();
  });
});
