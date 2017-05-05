/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

import {Variable} from "./variable"
import {Expression} from "./expression"
import {Strength} from "./strength"
import {IMap, createMap} from "./maptype"

/**
 * An enum defining the linear constraint operators.
 */
export enum Operator
{
    Le,  // <=
    Ge,  // >=
    Eq   // ==
}


/**
 * A linear constraint equation.
 *
 * A constraint equation is composed of an expression, an operator,
 * and a strength. The RHS of the equation is implicitly zero.
 *
 * @class
 */
export class Constraint
{
    /**
     * A static constraint comparison function.
     */
    static Compare( a: Constraint, b: Constraint ): number
    {
        return a.id - b.id;
    }

    /**
     * Construct a new Constraint.
     *
     * @param expression The constraint expression.
     * @param operator The equation operator.
     * @param strength The strength of the constraint.
     */
    constructor(
        expression: Expression,
        operator: Operator,
        strength: number = Strength.required )
    {
        this._operator = operator;
        this._expression = expression;
        this._strength = Strength.clip( strength );
    }

    /**
     * Returns the unique id number of the constraint.
     */
    get id(): number
    {
        return this._id;
    }

    /**
     * Returns the expression of the constraint.
     */
    get expression(): Expression
    {
        return this._expression;
    }

    /**
     * Returns the relational operator of the constraint.
     */
    get op(): Operator
    {
        return this._operator;
    }

    /**
     * Returns the strength of the constraint.
     */
    get strength(): number
    {
        return this._strength;
    }

    private _expression: Expression;
    private _operator: Operator;
    private _strength: number;
    private _id: number = CnId++;
}


/**
 * The internal constraint id counter.
 */
var CnId = 0;
