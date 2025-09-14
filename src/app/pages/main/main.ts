import { TripGetResponse } from './../../model/trip_get_response';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Trip } from '../../services/api/trip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  trip_map: TripGetResponse[] = [];
  countries: { value: string; name: string }[] = [];
  zones: { value: string; name: string }[] = [];
  constructor(
    private http: HttpClient,
    private tripService: Trip,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const trip = await this.tripService.getAllTrip();
    this.countries = trip
      .filter(
        (t, index, self) =>
          index == self.findIndex((x) => x.country == t.country)
      )
      .map((t) => ({ value: t.country ?? '', name: t.country ?? '' }));

    this.zones = trip
      .filter(
        (t, index, self) =>
          index ==
          self.findIndex((x) => x.destination_zone == t.destination_zone)
      )
      .map((zone) => ({
        value: zone.destination_zone ?? '',
        name: zone.destination_zone,
      }));

    console.log(this.countries);
    console.log(this.zones);

    this.cdr.detectChanges();
  }

  async getTripById(idInput: HTMLInputElement) {
    const idx = idInput.value;
    console.log(idx);
    if (idx != '') {
      const trip = await this.tripService.getTripByid(idx);
      this.trip_map = [];
      if (trip) {
        this.trip_map.push(trip);
      }
      console.log(this.trip_map);

      idInput.value = '';
    } else {
      alert('กรุณากรอกข้อมูล');
    }

    this.cdr.detectChanges();
  }

  async getTrip() {
    const trip = await this.tripService.getAllTrip();
    this.trip_map = trip;
    console.log(this.trip_map);
    this.cdr.detectChanges();
  }

  async getSelectTrip(ctySelect: HTMLSelectElement) {
    const cty = ctySelect.value;
    console.log(cty);
    this.trip_map = await this.tripService.getAllTrip();
    this.trip_map = this.trip_map.filter((x) => x.country == cty);
    console.log(this.trip_map);

    ctySelect.value = '';
    this.cdr.detectChanges();
  }

  async getSelectZoneTrip(zoneSelect: HTMLSelectElement) {
    const zone = zoneSelect.value;
    console.log(zone);
    this.trip_map = await this.tripService.getAllTrip();

    this.trip_map = this.trip_map.filter((x) => x.destination_zone == zone);
    console.log(this.trip_map);
    zoneSelect.value = '';
    this.cdr.detectChanges();
  }

  async getTripname(nameInput: HTMLInputElement) {
    const searchTerm = nameInput.value;
    console.log(searchTerm);

    if (nameInput.value != '') {
      this.trip_map = await this.tripService.getAllTrip();
      this.trip_map = this.trip_map.filter((x) =>
        x.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(this.trip_map);
      console.log('Call Completed');
    } else {
      alert('กรุณากรอกข้อมูล');
    }
    this.cdr.detectChanges();
  }
}

interface Destination {
  value: number;
  name: string;
}
