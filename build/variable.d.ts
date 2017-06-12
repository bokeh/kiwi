/**
 * The primary user constraint variable.
 *
 * @class
 */
export declare class Variable {
    /**
     * A static variable comparison function.
     */
    static Compare(a: Variable, b: Variable): number;
    toString(): string;
    /**
     * Construct a new Variable
     *
     * @param [name] The name to associated with the variable.
     */
    constructor(name?: string);
    /**
     * Returns the unique id number of the variable.
     */
    readonly id: number;
    /**
     * Returns the name of the variable.
     */
    readonly name: string;
    /**
     * Set the name of the variable.
     */
    setName(name: string): void;
    /**
     * Returns the user context object of the variable.
     */
    readonly context: any;
    /**
     * Set the user context object of the variable.
     */
    setContext(context: any): void;
    /**
     * Returns the value of the variable.
     */
    readonly value: number;
    /**
     * Set the value of the variable.
     */
    setValue(value: number): void;
    private _name;
    private _value;
    private _context;
    private _id;
}
