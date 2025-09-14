// ...existing code...
import { CommonModule, Location } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../services/api/trip';
import { TripGetResponse } from '../../model/trip_get_response';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.scss'],
})
export class Details implements OnInit {
  id!: number;
  trip: TripGetResponse | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tripService: Trip,
    private location: Location,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = Number(idParam);
    try {
      const trip = await this.tripService.getTripByid(this.id);
      this.trip = trip ?? null;
      this.loading = false;
    } catch (e) {
      console.error('load trip failed', e);
      this.error = 'โหลดข้อมูลไม่สำเร็จ';
      this.trip = null;
      this.loading = true;
    }
    this.cdr.detectChanges();
  }

  back() {
    if (history.length > 1) this.location.back();
    else this.router.navigateByUrl('/');
  }
}
