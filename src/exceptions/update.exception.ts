export class UpdateError extends Error{
    constructor(msg: string){
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UpdateError.prototype);
    }
}