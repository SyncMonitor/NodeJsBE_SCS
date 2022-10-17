import { Injectable } from '@nestjs/common';
import { ParkingSensor } from './entities/parking-sensor.entity';
import { ParkingSensorsRepository } from './parking-sensors.repository';
import { isEmpty } from 'underscore';

@Injectable()
export class ParkingSensorsService {
    constructor(
        private readonly parkingSensorsRepository: ParkingSensorsRepository
    ){}

    async createOrUpdateParkingSensors(parkingSensors: ParkingSensor[]){
        
        let response = this.parkingSensorsRepository.upsert(parkingSensors, {
            conflictPaths: [ 'sensor' ],
            skipUpdateIfNoValuesChanged: true,
            
        });
        let insertedOrUpdatedElementsIds = (await response).identifiers;

        /**
         * update the timestamp of all elements updated by upsert manually
         * because at this time, the upsert method doesn't trigger the
         * @UpdateDateColumn columns as save method does when it updates:
         * 
         * TODO: find a way to not update timestamp of inserted fields, 
         * now its no possible discriminate witch fields where inserted 
         * and witch where updated by upsert response
         * 
         **/

        insertedOrUpdatedElementsIds = insertedOrUpdatedElementsIds.filter(item => !isEmpty(item));
        insertedOrUpdatedElementsIds = insertedOrUpdatedElementsIds.map(item => item.id);

        if(!isEmpty(insertedOrUpdatedElementsIds))
            return this.parkingSensorsRepository.updateTimestamp(insertedOrUpdatedElementsIds);
        else    
            return []
    }
}
