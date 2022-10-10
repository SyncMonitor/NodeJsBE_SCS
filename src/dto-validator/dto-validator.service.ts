import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoValidatorService {
    checkDtoConsistency(dtoClass, obj): boolean{
        const propertiesDotClass = Object.getOwnPropertyNames(dtoClass);
        const propertiesObj = Object.getOwnPropertyNames(obj);

        return (propertiesDotClass.length == propertiesObj.length) && propertiesDotClass.every(function(element, index) {
            return propertiesObj.includes(element);
        });
    }

    checkDtoConsistencyArray(dtoClass, objArray: any[]): boolean{
        return objArray.every(element => {
            return this.checkDtoConsistency(dtoClass, element)
        })
    }
}
