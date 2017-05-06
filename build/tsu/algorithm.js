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
* Perform a lower bound search on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The index of the first element in the array which
*          compares greater than or equal to the given value.
*/
function lowerBound(array, value, compare) {
    var begin = 0;
    var n = array.length;
    var half;
    var middle;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (compare(array[middle], value) < 0) {
            begin = middle + 1;
            n -= half + 1;
        }
        else {
            n = half;
        }
    }
    return begin;
}
exports.lowerBound = lowerBound;
/**
* Perform a binary search on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The index of the found item, or -1.
*/
function binarySearch(array, value, compare) {
    var index = lowerBound(array, value, compare);
    if (index === array.length) {
        return -1;
    }
    var item = array[index];
    if (compare(item, value) !== 0) {
        return -1;
    }
    return index;
}
exports.binarySearch = binarySearch;
/**
* Perform a binary find on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The found item in the array, or undefined.
*/
function binaryFind(array, value, compare) {
    var index = lowerBound(array, value, compare);
    if (index === array.length) {
        return undefined;
    }
    var item = array[index];
    if (compare(item, value) !== 0) {
        return undefined;
    }
    return item;
}
exports.binaryFind = binaryFind;
function asSet(items, compare) {
    var array = iterator_1.asArray(items);
    var n = array.length;
    if (n <= 1) {
        return array;
    }
    array.sort(compare);
    var result = [array[0]];
    for (var i = 1, j = 0; i < n; ++i) {
        var item = array[i];
        if (compare(result[j], item) !== 0) {
            result.push(item);
            ++j;
        }
    }
    return result;
}
exports.asSet = asSet;
/**
* Test whether a two sorted arrays sets are disjoint.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns true if the sets are disjoint, false otherwise.
*/
function setIsDisjoint(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    while (i < len1 && j < len2) {
        var v = compare(first[i], second[j]);
        if (v < 0) {
            ++i;
        }
        else if (v > 0) {
            ++j;
        }
        else {
            return false;
        }
    }
    return true;
}
exports.setIsDisjoint = setIsDisjoint;
/**
* Test whether one sorted array set is the subset of another.
*
* @param first The potential subset.
* @param second The potential superset.
* @param compare The value comparison function.
* @returns true if the first set is a subset of the second.
*/
function setIsSubset(first, second, compare) {
    var len1 = first.length;
    var len2 = second.length;
    if (len1 > len2) {
        return false;
    }
    var i = 0, j = 0;
    while (i < len1 && j < len2) {
        var v = compare(first[i], second[j]);
        if (v < 0) {
            return false;
        }
        else if (v > 0) {
            ++j;
        }
        else {
            ++i;
            ++j;
        }
    }
    if (i < len1) {
        return false;
    }
    return true;
}
exports.setIsSubset = setIsSubset;
/**
* Create the set union of two sorted set arrays.
var j = 0;
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set union of the two arrays.
*/
function setUnion(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a, b);
        if (v < 0) {
            merged.push(a);
            ++i;
        }
        else if (v > 0) {
            merged.push(b);
            ++j;
        }
        else {
            merged.push(a);
            ++i;
            ++j;
        }
    }
    while (i < len1) {
        merged.push(first[i]);
        ++i;
    }
    while (j < len2) {
        merged.push(second[j]);
        ++j;
    }
    return merged;
}
exports.setUnion = setUnion;
/**
* Create a set intersection of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set intersection of the two arrays.
*/
function setIntersection(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a, b);
        if (v < 0) {
            ++i;
        }
        else if (v > 0) {
            ++j;
        }
        else {
            merged.push(a);
            ++i;
            ++j;
        }
    }
    return merged;
}
exports.setIntersection = setIntersection;
/**
* Create a set difference of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set difference of the two arrays.
*/
function setDifference(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a, b);
        if (v < 0) {
            merged.push(a);
            ++i;
        }
        else if (v > 0) {
            ++j;
        }
        else {
            ++i;
            ++j;
        }
    }
    while (i < len1) {
        merged.push(first[i]);
        ++i;
    }
    return merged;
}
exports.setDifference = setDifference;
/**
* Create a set symmetric difference of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set symmetric difference of the two arrays.
*/
function setSymmetricDifference(first, second, compare) {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a, b);
        if (v < 0) {
            merged.push(a);
            ++i;
        }
        else if (v > 0) {
            merged.push(b);
            ++j;
        }
        else {
            ++i;
            ++j;
        }
    }
    while (i < len1) {
        merged.push(first[i]);
        ++i;
    }
    while (j < len2) {
        merged.push(second[j]);
        ++j;
    }
    return merged;
}
exports.setSymmetricDifference = setSymmetricDifference;
