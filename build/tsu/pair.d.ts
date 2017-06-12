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
export declare class Pair<T, U> {
    first: T;
    second: U;
    /**
    * Construct a new Pair object.
    *
    * @param first The first item of the pair.
    * @param second The second item of the pair.
    */
    constructor(first: T, second: U);
    /**
    * Create a copy of the pair.
    */
    copy(): Pair<T, U>;
}
