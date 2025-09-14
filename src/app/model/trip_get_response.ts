export interface TripGetResponse {
    idx:              number;
    name:             string;
    country:          string;
    coverimage:       string;
    detail:           string;
    price:            number;
    duration:         number;
    destination_zone: DestinationZone;
}

export enum DestinationZone {
    ประเทศไทย = "ประเทศไทย",
    ยุโรป = "ยุโรป",
    เอเชีย = "เอเชีย",
    เอเชียตะวันออกเฉียงใต้ = "เอเชียตะวันออกเฉียงใต้",
}
