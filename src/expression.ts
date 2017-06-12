/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

import {forEach, Pair} from "./tsu"
import {Variable} from "./variable"
import {IMap, createMap} from "./maptype"

/**
 * An expression of variable terms and a constant.
 *
 * @class
 */
export class Expression
{
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
    constructor( ...args: (number | Variable | [number, Variable])[] );
    constructor()
    {
        var parsed = parseArgs( arguments );
        this._terms = parsed.terms;
        this._constant = parsed.constant;
    }

    toString(): string {
        const terms: [Variable, number][] = []
        forEach<Pair<Variable, number>>(this._terms, (pair) => {
            terms.push([pair.first, pair.second])
        });

        let first = true
        let s = ""

        for (const [v, c] of terms) {
          if (first) {
            first = false
            if (c == 1)
              s += `${v}`
            else if (c == -1)
              s += `-${v}`
            else
              s += `${c}*${v}`
          } else {
            if (c == 1)
              s += ` + ${v}`
            else if (c == -1)
              s += ` - ${v}`
            else if (c >= 0)
              s += ` + ${c}${v}`
            else
              s += ` - ${-c}${v}`
          }
        }

        const c = this.constant
        if (c < 0)
          s += ` - ${-c}`
        else if (c > 0)
          s += ` + ${c}`

        return s
    }

    /**
     * Returns the mapping of terms in the expression.
     *
     * This *must* be treated as const.
     */
    get terms(): IMap<Variable, number>
    {
        return this._terms;
    }

    /**
     * Returns the constant of the expression.
     */
    get constant(): number
    {
        return this._constant;
    }

    /**
     * Returns the computed value of the expression.
     */
    get value(): number
    {
        var result = this._constant;
        forEach<Pair<Variable, number>>(this._terms, (pair) => {
            result += pair.first.value * pair.second;
        });
        return result;
    }

    private _terms: IMap<Variable, number>;
    private _constant: number;
}


/**
 * An internal interface for the argument parse results.
 */
interface IParseResult
{
    terms: IMap<Variable, number>;
    constant: number;
}


/**
 * An internal argument parsing function.
 */
function parseArgs( args: IArguments ): IParseResult
{
    var constant = 0.0;
    var factory = () => 0.0;
    var terms = createMap<Variable, number>( Variable.Compare );
    for( var i = 0, n = args.length; i < n; ++i )
    {
        var item = args[ i ];
        if( typeof item === "number" )
        {
            constant += item;
        }
        else if( item instanceof Variable )
        {
            terms.setDefault( item, factory ).second += 1.0;
        }
        else if( item instanceof Array )
        {
            if( item.length !== 2 )
            {
                throw new Error( "array must have length 2" );
            }
            var value: number = item[ 0 ];
            var variable: Variable = item[ 1 ];
            if( typeof value !== "number" )
            {
                throw new Error( "array item 0 must be a number" );
            }
            if( !( variable instanceof Variable ) )
            {
                throw new Error( "array item 1 must be a variable" );
            }
            terms.setDefault( variable, factory ).second += value;
        }
        else
        {
            throw new Error( "invalid Expression argument: " + JSON.stringify(item) );
        }
    }
    return { terms: terms, constant: constant };
}
