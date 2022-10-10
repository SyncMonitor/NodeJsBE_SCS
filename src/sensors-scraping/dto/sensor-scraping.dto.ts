export class SensorScrapingDto{
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    state: number;
    battery: string;
    active: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.address = '';
        this.lat = 0;
        this.lng = 0;
        this.state = 0;
        this.battery = '';
        this.active = 0;
    }
}