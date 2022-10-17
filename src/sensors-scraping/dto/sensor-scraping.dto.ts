import { AutoMap } from "@automapper/classes";

export class SensorScrapingDto{
    
    id: string;

    name: string;

    address: string;

    lat: string;

    lng: string;

    state: boolean;

    battery: string;

    active: boolean;

    constructor(){
        this.id = '0';
        this.name = '';
        this.address = '';
        this.lat = '0';
        this.lng = '0';
        this.state = false;
        this.battery = '';
        this.active = false;
    }
}