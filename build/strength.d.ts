export declare module Strength {
    /**
     * Create a new symbolic strength.
     */
    function create(a: number, b: number, c: number, w?: number): number;
    /**
     * The 'required' symbolic strength.
     */
    const required: number;
    /**
     * The 'strong' symbolic strength.
     */
    const strong: number;
    /**
     * The 'medium' symbolic strength.
     */
    const medium: number;
    /**
     * The 'weak' symbolic strength.
     */
    const weak: number;
    /**
     * Clip a symbolic strength to the allowed min and max.
     */
    function clip(value: number): number;
}
