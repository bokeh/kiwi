import { Pair, ICompare } from "./pair";
import { ArrayBase } from "./array_base";
import { IIterable } from "./iterator";
/**
* A mapping container build on a sorted array.
*
* @class
*/
export declare class AssociativeArray<T, U> extends ArrayBase<Pair<T, U>> {
    /**
    * Construct a new AssociativeArray.
    *
    * @param compare The key comparison function.
    */
    constructor(compare: ICompare<T, T>);
    /**
    * Returns the key comparison function used by this array.
    */
    comparitor(): ICompare<T, T>;
    /**
    * Return the array index of the given key, or -1.
    *
    * @param key The key to locate in the array.
    */
    indexOf(key: T): number;
    /**
    * Returns true if the key is in the array, false otherwise.
    *
    * @param key The key to locate in the array.
    */
    contains(key: T): boolean;
    /**
    * Returns the pair associated with the given key, or undefined.
    *
    * @param key The key to locate in the array.
    */
    find(key: T): Pair<T, U> | undefined;
    /**
    * Returns the pair associated with the key if it exists.
    *
    * If the key does not exist, a new pair will be created and
    * inserted using the value created by the given factory.
    *
    * @param key The key to locate in the array.
    * @param factory The function which creates the default value.
    */
    setDefault(key: T, factory: () => U): Pair<T, U>;
    /**
    * Insert the pair into the array and return the pair.
    *
    * This will overwrite any existing entry in the array.
    *
    * @param key The key portion of the pair.
    * @param value The value portion of the pair.
    */
    insert(key: T, value: U): Pair<T, U>;
    update(object: AssociativeArray<T, U> | IIterable<Pair<T, U>> | Pair<T, U>[]): void;
    /**
    * Removes and returns the pair for the given key, or undefined.
    *
    * @param key The key to remove from the map.
    */
    erase(key: T): Pair<T, U> | undefined;
    /**
    * Create a copy of this associative array.
    */
    copy(): AssociativeArray<T, U>;
    private _wrapped;
    private _compare;
}
