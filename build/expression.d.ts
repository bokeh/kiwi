import { Variable } from "./variable";
import { IMap } from "./maptype";
/**
 * An expression of variable terms and a constant.
 *
 * @class
 */
export declare class Expression {
    /**
     * Construct a new Expression.
     *
     * The constructor accepts an arbitrary number of parameters,
     * each of which must be one of the following types:
     *  - number
     *  - Variable
     *  - 2-tuple of [number, Variable]
     *
     * The parameters are summed. The tuples are multiplied.
     */
    constructor(...args: (number | Variable | [number, Variable])[]);
    toString(): string;
    /**
     * Returns the mapping of terms in the expression.
     *
     * This *must* be treated as const.
     */
    readonly terms: IMap<Variable, number>;
    /**
     * Returns the constant of the expression.
     */
    readonly constant: number;
    /**
     * Returns the computed value of the expression.
     */
    readonly value: number;
    private _terms;
    private _constant;
}
