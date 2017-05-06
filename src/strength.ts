/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

export module Strength
{

    /**
     * Create a new symbolic strength.
     */
    export function create( a: number, b: number, c: number, w: number = 1.0 )
    {
        var result: number = 0.0;
        result += Math.max( 0.0, Math.min( 1000.0, a * w ) ) * 1000000.0;
        result += Math.max( 0.0, Math.min( 1000.0, b * w ) ) * 1000.0;
        result += Math.max( 0.0, Math.min( 1000.0, c * w ) );
        return result;
    }

    /**
     * The 'required' symbolic strength.
     */
    export const required = create( 1000.0, 1000.0, 1000.0 );

    /**
     * The 'strong' symbolic strength.
     */
    export const strong = create( 1.0, 0.0, 0.0 );

    /**
     * The 'medium' symbolic strength.
     */
    export const medium = create( 0.0, 1.0, 0.0 );

    /**
     * The 'weak' symbolic strength.
     */
    export const weak = create( 0.0, 0.0, 1.0 );

    /**
     * Clip a symbolic strength to the allowed min and max.
     */
    export function clip( value: number )
    {
        return Math.max( 0.0, Math.min( required, value ) );
    }
}
