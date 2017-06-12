"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
* An iterator for an array of items.
*/
var ArrayIterator = (function () {
    /*
    * Construct a new ArrayIterator.
    *
    * @param array The array of items to iterate.
    * @param [index] The index at which to start iteration.
    */
    function ArrayIterator(array, index) {
        if (typeof index === "undefined") {
            index = 0;
        }
        this._array = array;
        this._index = Math.max(0, Math.min(index, array.length));
    }
    /**
    * Returns the next item from the iterator or undefined.
    */
    ArrayIterator.prototype.__next__ = function () {
        return this._array[this._index++];
    };
    /**
    * Returns this same iterator.
    */
    ArrayIterator.prototype.__iter__ = function () {
        return this;
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;
/**
* A reverse iterator for an array of items.
*/
var ReverseArrayIterator = (function () {
    /**
    * Construct a new ReverseArrayIterator.
    *
    * @param array The array of items to iterate.
    * @param [index] The index at which to start iteration.
    */
    function ReverseArrayIterator(array, index) {
        if (typeof index === "undefined") {
            index = array.length;
        }
        this._array = array;
        this._index = Math.max(0, Math.min(index, array.length));
    }
    /**
    * Returns the next item from the iterator or undefined.
    */
    ReverseArrayIterator.prototype.__next__ = function () {
        return this._array[--this._index];
    };
    /**
    * Returns this same iterator.
    */
    ReverseArrayIterator.prototype.__iter__ = function () {
        return this;
    };
    return ReverseArrayIterator;
}());
exports.ReverseArrayIterator = ReverseArrayIterator;
function iter(object) {
    if (object instanceof Array) {
        return new ArrayIterator(object);
    }
    return object.__iter__();
}
exports.iter = iter;
function reversed(object) {
    if (object instanceof Array) {
        return new ReverseArrayIterator(object);
    }
    return object.__reversed__();
}
exports.reversed = reversed;
/**
* Returns the next value from an iterator, or undefined.
*/
function next(iterator) {
    return iterator.__next__();
}
exports.next = next;
function asArray(object) {
    if (object instanceof Array) {
        return object.slice();
    }
    var value;
    var array = [];
    var it = object.__iter__();
    while ((value = it.__next__()) !== undefined) {
        array.push(value);
    }
    return array;
}
exports.asArray = asArray;
function forEach(object, callback) {
    if (object instanceof Array) {
        for (var i = 0, n = object.length; i < n; ++i) {
            if (callback(object[i]) === false) {
                return;
            }
        }
    }
    else {
        var value;
        var it = object.__iter__();
        while ((value = it.__next__()) !== undefined) {
            if (callback(value) === false) {
                return;
            }
        }
    }
}
exports.forEach = forEach;
function map(object, callback) {
    var result = [];
    if (object instanceof Array) {
        for (var i = 0, n = object.length; i < n; ++i) {
            result.push(callback(object[i]));
        }
    }
    else {
        var value;
        var it = object.__iter__();
        while ((value = it.__next__()) !== undefined) {
            result.push(callback(value));
        }
    }
    return result;
}
exports.map = map;
function filter(object, callback) {
    var value;
    var result = [];
    if (object instanceof Array) {
        for (var i = 0, n = object.length; i < n; ++i) {
            value = object[i];
            if (callback(value)) {
                result.push(value);
            }
        }
    }
    else {
        var it = object.__iter__();
        while ((value = it.__next__()) !== undefined) {
            if (callback(value)) {
                result.push(value);
            }
        }
    }
    return result;
}
exports.filter = filter;
