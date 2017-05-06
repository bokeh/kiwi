"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("./iterator");
/**
* A base class for implementing array-based data structures.
*
* @class
*/
var ArrayBase = (function () {
    function ArrayBase() {
        /*
        * The internal data array.
        *
        * @protected
        */
        this._array = [];
    }
    /**
    * Returns the number of items in the array.
    */
    ArrayBase.prototype.size = function () {
        return this._array.length;
    };
    /**
    * Returns true if the array is empty.
    */
    ArrayBase.prototype.empty = function () {
        return this._array.length === 0;
    };
    /**
    * Returns the item at the given array index.
    *
    * @param index The integer index of the desired item.
    */
    ArrayBase.prototype.itemAt = function (index) {
        return this._array[index];
    };
    /**
    * Removes and returns the item at the given index.
    *
    * @param index The integer index of the desired item.
    */
    ArrayBase.prototype.takeAt = function (index) {
        return this._array.splice(index, 1)[0];
    };
    /**
    * Clear the internal contents of array.
    */
    ArrayBase.prototype.clear = function () {
        this._array = [];
    };
    /**
    * Swap this array's contents with another array.
    *
    * @param other The array base to use for the swap.
    */
    ArrayBase.prototype.swap = function (other) {
        var array = this._array;
        this._array = other._array;
        other._array = array;
    };
    /**
    * Returns an iterator over the array of items.
    */
    ArrayBase.prototype.__iter__ = function () {
        return iterator_1.iter(this._array);
    };
    /**
    * Returns a reverse iterator over the array of items.
    */
    ArrayBase.prototype.__reversed__ = function () {
        return iterator_1.reversed(this._array);
    };
    return ArrayBase;
}());
exports.ArrayBase = ArrayBase;
