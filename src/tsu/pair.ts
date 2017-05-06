/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

/**
* An interface which defines a binary comparison function.
*
* Returns:
*   - zero if first = second
*   - negative if first < second
*   - positive if first > second.
*/
export interface ICompare<T, U> {
    (first: T, second: U): number;
}

/**
* A class which defines a generic pair object.
*/
export class Pair<T, U> {

    public first: T;
    public second: U;

    /**
    * Construct a new Pair object.
    *
    * @param first The first item of the pair.
    * @param second The second item of the pair.
    */
    constructor(first: T, second: U) {
        this.first = first;
        this.second = second;
    }
    /**
    * Create a copy of the pair.
    */
    public copy(): Pair<T, U> {
        return new Pair(this.first, this.second);
    }
}
