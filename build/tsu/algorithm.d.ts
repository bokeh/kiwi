import { ICompare } from "./pair";
import { IIterable } from "./iterator";
/**
* Perform a lower bound search on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The index of the first element in the array which
*          compares greater than or equal to the given value.
*/
export declare function lowerBound<T, U>(array: T[], value: U, compare: ICompare<T, U>): number;
/**
* Perform a binary search on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The index of the found item, or -1.
*/
export declare function binarySearch<T, U>(array: T[], value: U, compare: ICompare<T, U>): number;
/**
* Perform a binary find on a sorted array.
*
* @param array The array of sorted items to search.
* @param value The value to located in the array.
* @param compare The value comparison function.
* @returns The found item in the array, or undefined.
*/
export declare function binaryFind<T, U>(array: T[], value: U, compare: ICompare<T, U>): T | undefined;
export declare function asSet<T>(items: T[] | IIterable<T>, compare: ICompare<T, T>): T[];
/**
* Test whether a two sorted arrays sets are disjoint.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns true if the sets are disjoint, false otherwise.
*/
export declare function setIsDisjoint<T>(first: T[], second: T[], compare: ICompare<T, T>): boolean;
/**
* Test whether one sorted array set is the subset of another.
*
* @param first The potential subset.
* @param second The potential superset.
* @param compare The value comparison function.
* @returns true if the first set is a subset of the second.
*/
export declare function setIsSubset<T>(first: T[], second: T[], compare: ICompare<T, T>): boolean;
/**
* Create the set union of two sorted set arrays.
var j = 0;
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set union of the two arrays.
*/
export declare function setUnion<T>(first: T[], second: T[], compare: ICompare<T, T>): T[];
/**
* Create a set intersection of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set intersection of the two arrays.
*/
export declare function setIntersection<T>(first: T[], second: T[], compare: ICompare<T, T>): T[];
/**
* Create a set difference of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set difference of the two arrays.
*/
export declare function setDifference<T>(first: T[], second: T[], compare: ICompare<T, T>): T[];
/**
* Create a set symmetric difference of two sorted set arrays.
*
* @param first The first sorted array set.
* @param second The second sorted array set.
* @param compare The value comparison function.
* @returns The set symmetric difference of the two arrays.
*/
export declare function setSymmetricDifference<T>(first: T[], second: T[], compare: ICompare<T, T>): T[];
