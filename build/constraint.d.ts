import { Expression } from "./expression";
/**
 * An enum defining the linear constraint operators.
 */
export declare enum Operator {
    Le = 0,
    Ge = 1,
    Eq = 2,
}
/**
 * A linear constraint equation.
 *
 * A constraint equation is composed of an expression, an operator,
 * and a strength. The RHS of the equation is implicitly zero.
 *
 * @class
 */
export declare class Constraint {
    /**
     * A static constraint comparison function.
     */
    static Compare(a: Constraint, b: Constraint): number;
    /**
     * Construct a new Constraint.
     *
     * @param expression The constraint expression.
     * @param operator The equation operator.
     * @param strength The strength of the constraint.
     */
    constructor(expression: Expression, operator: Operator, strength?: number);
    toString(): string;
    /**
     * Returns the unique id number of the constraint.
     */
    readonly id: number;
    /**
     * Returns the expression of the constraint.
     */
    readonly expression: Expression;
    /**
     * Returns the relational operator of the constraint.
     */
    readonly op: Operator;
    /**
     * Returns the strength of the constraint.
     */
    readonly strength: number;
    private _expression;
    private _operator;
    private _strength;
    private _id;
}
