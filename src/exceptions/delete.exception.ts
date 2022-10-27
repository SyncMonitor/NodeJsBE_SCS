export class DeleteError extends Error{
    constructor(msg: string){
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DeleteError.prototype);
    }
}