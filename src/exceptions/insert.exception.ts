export class InsertError extends Error{
    constructor(msg: string){
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InsertError.prototype);
    }
}