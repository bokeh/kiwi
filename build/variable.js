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
 * The primary user constraint variable.
 *
 * @class
 */
var Variable = (function () {
    /**
     * Construct a new Variable
     *
     * @param [name] The name to associated with the variable.
     */
    function Variable(name) {
        if (name === void 0) { name = ""; }
        this._value = 0.0;
        this._context = null;
        this._id = VarId++;
        this._name = name;
    }
    /**
     * A static variable comparison function.
     */
    Variable.Compare = function (a, b) {
        return a.id - b.id;
    };
    Variable.prototype.toString = function () {
        return this._name;
    };
    Object.defineProperty(Variable.prototype, "id", {
        /**
         * Returns the unique id number of the variable.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "name", {
        /**
         * Returns the name of the variable.
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the name of the variable.
     */
    Variable.prototype.setName = function (name) {
        this._name = name;
    };
    Object.defineProperty(Variable.prototype, "context", {
        /**
         * Returns the user context object of the variable.
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the user context object of the variable.
     */
    Variable.prototype.setContext = function (context) {
        this._context = context;
    };
    Object.defineProperty(Variable.prototype, "value", {
        /**
         * Returns the value of the variable.
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the value of the variable.
     */
    Variable.prototype.setValue = function (value) {
        this._value = value;
    };
    return Variable;
}());
exports.Variable = Variable;
/**
 * The internal variable id counter.
 */
var VarId = 0;
