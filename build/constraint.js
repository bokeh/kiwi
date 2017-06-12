"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var strength_1 = require("./strength");
/**
 * An enum defining the linear constraint operators.
 */
var Operator;
(function (Operator) {
    Operator[Operator["Le"] = 0] = "Le";
    Operator[Operator["Ge"] = 1] = "Ge";
    Operator[Operator["Eq"] = 2] = "Eq"; // ==
})(Operator = exports.Operator || (exports.Operator = {}));
/**
 * A linear constraint equation.
 *
 * A constraint equation is composed of an expression, an operator,
 * and a strength. The RHS of the equation is implicitly zero.
 *
 * @class
 */
var Constraint = (function () {
    /**
     * Construct a new Constraint.
     *
     * @param expression The constraint expression.
     * @param operator The equation operator.
     * @param strength The strength of the constraint.
     */
    function Constraint(expression, operator, strength) {
        if (strength === void 0) { strength = strength_1.Strength.required; }
        this._id = CnId++;
        this._operator = operator;
        this._expression = expression;
        this._strength = strength_1.Strength.clip(strength);
    }
    /**
     * A static constraint comparison function.
     */
    Constraint.Compare = function (a, b) {
        return a.id - b.id;
    };
    Constraint.prototype.toString = function () {
        var _this = this;
        var op = function () {
            switch (_this._operator) {
                case Operator.Le: return "<=";
                case Operator.Ge: return ">=";
                case Operator.Eq: return "==";
            }
        };
        return this._expression + " " + op() + " 0";
    };
    Object.defineProperty(Constraint.prototype, "id", {
        /**
         * Returns the unique id number of the constraint.
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "expression", {
        /**
         * Returns the expression of the constraint.
         */
        get: function () {
            return this._expression;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "op", {
        /**
         * Returns the relational operator of the constraint.
         */
        get: function () {
            return this._operator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constraint.prototype, "strength", {
        /**
         * Returns the strength of the constraint.
         */
        get: function () {
            return this._strength;
        },
        enumerable: true,
        configurable: true
    });
    return Constraint;
}());
exports.Constraint = Constraint;
/**
 * The internal constraint id counter.
 */
var CnId = 0;
