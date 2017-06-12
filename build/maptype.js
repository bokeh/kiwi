"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var tsu_1 = require("./tsu");
function createMap(compare) {
    return new tsu_1.AssociativeArray(compare);
}
exports.createMap = createMap;
