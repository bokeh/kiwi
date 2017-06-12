"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pair_1 = require("./pair");
var array_base_1 = require("./array_base");
var algorithm_1 = require("./algorithm");
var iterator_1 = require("./iterator");
/**
* A mapping container build on a sorted array.
*
* @class
*/
var AssociativeArray = (function (_super) {
    __extends(AssociativeArray, _super);
    /**
    * Construct a new AssociativeArray.
    *
    * @param compare The key comparison function.
    */
    function AssociativeArray(compare) {
        var _this = _super.call(this) || this;
        _this._compare = compare;
        _this._wrapped = wrapCompare(compare);
        return _this;
    }
    /**
    * Returns the key comparison function used by this array.
    */
    AssociativeArray.prototype.comparitor = function () {
        return this._compare;
    };
    /**
    * Return the array index of the given key, or -1.
    *
    * @param key The key to locate in the array.
    */
    AssociativeArray.prototype.indexOf = function (key) {
        return algorithm_1.binarySearch(this._array, key, this._wrapped);
    };
    /**
    * Returns true if the key is in the array, false otherwise.
    *
    * @param key The key to locate in the array.
    */
    AssociativeArray.prototype.contains = function (key) {
        return algorithm_1.binarySearch(this._array, key, this._wrapped) >= 0;
    };
    /**
    * Returns the pair associated with the given key, or undefined.
    *
    * @param key The key to locate in the array.
    */
    AssociativeArray.prototype.find = function (key) {
        return algorithm_1.binaryFind(this._array, key, this._wrapped);
    };
    /**
    * Returns the pair associated with the key if it exists.
    *
    * If the key does not exist, a new pair will be created and
    * inserted using the value created by the given factory.
    *
    * @param key The key to locate in the array.
    * @param factory The function which creates the default value.
    */
    AssociativeArray.prototype.setDefault = function (key, factory) {
        var array = this._array;
        var index = algorithm_1.lowerBound(array, key, this._wrapped);
        if (index === array.length) {
            var pair = new pair_1.Pair(key, factory());
            array.push(pair);
            return pair;
        }
        var currPair = array[index];
        if (this._compare(currPair.first, key) !== 0) {
            var pair = new pair_1.Pair(key, factory());
            array.splice(index, 0, pair);
            return pair;
        }
        return currPair;
    };
    /**
    * Insert the pair into the array and return the pair.
    *
    * This will overwrite any existing entry in the array.
    *
    * @param key The key portion of the pair.
    * @param value The value portion of the pair.
    */
    AssociativeArray.prototype.insert = function (key, value) {
        var array = this._array;
        var index = algorithm_1.lowerBound(array, key, this._wrapped);
        if (index === array.length) {
            var pair = new pair_1.Pair(key, value);
            array.push(pair);
            return pair;
        }
        var currPair = array[index];
        if (this._compare(currPair.first, key) !== 0) {
            var pair = new pair_1.Pair(key, value);
            array.splice(index, 0, pair);
            return pair;
        }
        currPair.second = value;
        return currPair;
    };
    AssociativeArray.prototype.update = function (object) {
        var _this = this;
        if (object instanceof AssociativeArray) {
            this._array = merge(this._array, object._array, this._compare);
        }
        else {
            iterator_1.forEach(object, function (pair) {
                _this.insert(pair.first, pair.second);
            });
        }
    };
    /**
    * Removes and returns the pair for the given key, or undefined.
    *
    * @param key The key to remove from the map.
    */
    AssociativeArray.prototype.erase = function (key) {
        var array = this._array;
        var index = algorithm_1.binarySearch(array, key, this._wrapped);
        if (index < 0) {
            return undefined;
        }
        return array.splice(index, 1)[0];
    };
    /**
    * Create a copy of this associative array.
    */
    AssociativeArray.prototype.copy = function () {
        var theCopy = new AssociativeArray(this._compare);
        var copyArray = theCopy._array;
        var thisArray = this._array;
        for (var i = 0, n = thisArray.length; i < n; ++i) {
            copyArray.push(thisArray[i].copy());
        }
        return theCopy;
    };
    return AssociativeArray;
}(array_base_1.ArrayBase));
exports.AssociativeArray = AssociativeArray;
/**
* An internal which wraps a comparison key function.
*/
function wrapCompare(cmp) {
    return function (pair, value) {
        return cmp(pair.first, value);
    };
}
/**
* An internal function which merges two ordered pair arrays.
*/
function merge(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a.first, b.first);
        if (v < 0) {
            merged.push(a.copy());
            ++i;
        }
        else if (v > 0) {
            merged.push(b.copy());
            ++j;
        }
        else {
            merged.push(b.copy());
            ++i;
            ++j;
        }
    }
    while (i < len1) {
        merged.push(first[i].copy());
        ++i;
    }
    while (j < len2) {
        merged.push(second[j].copy());
        ++j;
    }
    return merged;
}
