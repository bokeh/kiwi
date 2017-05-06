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
* A class which defines a generic pair object.
*/
var Pair = (function () {
    /**
    * Construct a new Pair object.
    *
    * @param first The first item of the pair.
    * @param second The second item of the pair.
    */
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    /**
    * Create a copy of the pair.
    */
    Pair.prototype.copy = function () {
        return new Pair(this.first, this.second);
    };
    return Pair;
}());
exports.Pair = Pair;
