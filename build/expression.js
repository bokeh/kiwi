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
var variable_1 = require("./variable");
var maptype_1 = require("./maptype");
/**
 * An expression of variable terms and a constant.
 *
 * @class
 */
var Expression = (function () {
    function Expression() {
        var parsed = parseArgs(arguments);
        this._terms = parsed.terms;
        this._constant = parsed.constant;
    }
    Expression.prototype.toString = function () {
        var terms = [];
        tsu_1.forEach(this._terms, function (pair) {
            terms.push([pair.first, pair.second]);
        });
        var first = true;
        var s = "";
        for (var _i = 0, terms_1 = terms; _i < terms_1.length; _i++) {
            var _a = terms_1[_i], v = _a[0], c_1 = _a[1];
            if (first) {
                first = false;
                if (c_1 == 1)
                    s += "" + v;
                else if (c_1 == -1)
                    s += "-" + v;
                else
                    s += c_1 + "*" + v;
            }
            else {
                if (c_1 == 1)
                    s += " + " + v;
                else if (c_1 == -1)
                    s += " - " + v;
                else if (c_1 >= 0)
                    s += " + " + c_1 + v;
                else
                    s += " - " + -c_1 + v;
            }
        }
        var c = this.constant;
        if (c < 0)
            s += " - " + -c;
        else if (c > 0)
            s += " + " + c;
        return s;
    };
    Object.defineProperty(Expression.prototype, "terms", {
        /**
         * Returns the mapping of terms in the expression.
         *
         * This *must* be treated as const.
         */
        get: function () {
            return this._terms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expression.prototype, "constant", {
        /**
         * Returns the constant of the expression.
         */
        get: function () {
            return this._constant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expression.prototype, "value", {
        /**
         * Returns the computed value of the expression.
         */
        get: function () {
            var result = this._constant;
            tsu_1.forEach(this._terms, function (pair) {
                result += pair.first.value * pair.second;
            });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return Expression;
}());
exports.Expression = Expression;
/**
 * An internal argument parsing function.
 */
function parseArgs(args) {
    var constant = 0.0;
    var factory = function () { return 0.0; };
    var terms = maptype_1.createMap(variable_1.Variable.Compare);
    for (var i = 0, n = args.length; i < n; ++i) {
        var item = args[i];
        if (typeof item === "number") {
            constant += item;
        }
        else if (item instanceof variable_1.Variable) {
            terms.setDefault(item, factory).second += 1.0;
        }
        else if (item instanceof Array) {
            if (item.length !== 2) {
                throw new Error("array must have length 2");
            }
            var value = item[0];
            var variable = item[1];
            if (typeof value !== "number") {
                throw new Error("array item 0 must be a number");
            }
            if (!(variable instanceof variable_1.Variable)) {
                throw new Error("array item 1 must be a variable");
            }
            terms.setDefault(variable, factory).second += value;
        }
        else {
            throw new Error("invalid Expression argument: " + JSON.stringify(item));
        }
    }
    return { terms: terms, constant: constant };
}
