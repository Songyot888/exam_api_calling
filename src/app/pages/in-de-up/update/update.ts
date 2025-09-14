import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../../../services/api/trip';
import { TripGetResponse } from '../../../model/trip_get_response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.html',
  styleUrl: './update.scss',
})
export class Update {
  // --- state หลัก ---
  trip_map: TripGetResponse[] = [];
  originalTrip: TripGetResponse | null = null;

  id: number | null = null;
  name = '';
  destinationId: number | null = null;
  country: string | null = null;
  cover = '';
  detail = '';
  price = 0;
  duration = 0;
  saved = false;

  filteredCountries: string[] = [];

  constructor(private tripService: Trip, private cdr: ChangeDetectorRef) {}

  zones: { value: number; name: string }[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 4, name: 'โอเชียเนีย' },
    { value: 5, name: 'ตะวันออกกลาง' },
    { value: 6, name: 'แอฟริกา' },
    { value: 7, name: 'อเมริกาเหนือ' },
    { value: 8, name: 'อเมริกาใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  countriesByZone: Record<number, string[]> = {
    1: [
      'ญี่ปุ่น',
      'จีน',
      'ไต้หวัน',
      'ฮ่องกง',
      'เกาหลีใต้',
      'อินเดีย',
      'ศรีลังกา',
      'เนปาล',
      'ภูฏาน',
      'มัลดีฟส์',
      'มองโกเลีย',
      'อุซเบกิสถาน',
    ],
    2: [
      'ไอซ์แลนด์',
      'เยอรมันนี',
      'ฝรั่งเศส',
      'สเปน',
      'อิตาลี',
      'สวิตเซอร์แลนด์',
      'เนเธอร์แลนด์',
      'ออสเตรีย',
      'เช็ก',
      'นอร์เวย์',
      'เดนมาร์ก',
      'สวีเดน',
      'ฟินแลนด์',
      'กรีซ',
      'โปรตุเกส',
    ],
    3: [
      'สิงคโปร์',
      'เวียดนาม',
      'ลาว',
      'มาเลเซีย',
      'กัมพูชา',
      'เมียนมา',
      'อินโดนีเซีย',
      'ฟิลิปปินส์',
      'บรูไน',
      'ติมอร์-เลสเต',
    ],
    4: ['ออสเตรเลีย', 'นิวซีแลนด์', 'ฟิจิ'],
    5: [
      'สหรัฐอาหรับเอมิเรตส์',
      'กาตาร์',
      'โอมาน',
      'บาห์เรน',
      'จอร์แดน',
      'อิสราเอล',
      'เลบานอน',
      'ซาอุดีอาระเบีย',
    ],
    6: [
      'โมร็อกโก',
      'อียิปต์',
      'เคนยา',
      'แทนซาเนีย',
      'แอฟริกาใต้',
      'เอธิโอเปีย',
      'เซเชลส์',
    ],
    7: ['สหรัฐอเมริกา', 'แคนาดา', 'เม็กซิโก'],
    8: ['บราซิล', 'อาร์เจนตินา', 'เปรู', 'ชิลี', 'โคลอมเบีย'],
    9: ['ประเทศไทย'],
  };

  onZoneChange() {
    this.country = null;
    const zid = this.destinationId;
    this.filteredCountries = zid == null ? [] : this.countriesByZone[zid] ?? [];
    this.cdr.detectChanges();
  }

  async fetchTripData() {
    if (!this.id) {
      alert('กรุณาใส่ ID');
      return;
    }
    try {
      const trip = await this.tripService.getTripByid(this.id);
      if (!trip) throw new Error('not found');

      this.originalTrip = trip;

      this.name = trip.name ?? '';
      this.country = trip.country ?? null;
      this.cover = trip.coverimage ?? '';
      this.detail = trip.detail ?? '';
      this.price = trip.price ?? 0;
      this.duration = trip.duration ?? 0;

      this.destinationId = this.findZoneIdByCountry(this.country);
      this.filteredCountries =
        this.destinationId == null
          ? []
          : this.countriesByZone[this.destinationId] ?? [];

      if (this.country && this.destinationId != null) {
        const list = this.countriesByZone[this.destinationId] ?? [];
        if (!list.includes(this.country)) this.country = null;
      }

      this.cdr.detectChanges();
    } catch {
      alert('ไม่พบข้อมูลสำหรับ ID นี้');
      this.resetForm();
    }
  }

  private findZoneIdByCountry(country: string | null): number | null {
    if (!country) return null;
    for (const [zoneId, counters] of Object.entries(this.countriesByZone)) {
      if (counters.includes(country)) return Number(zoneId);
    }
    return null;
  }

  async updatefrom() {
    if (!this.id) {
      alert('กรุณาใส่ ID');
      return;
    }
    if (this.destinationId == null) {
      alert('กรุณาเลือกโซน');
      return;
    }
    if (!this.country) {
      alert('กรุณาเลือกประเทศ');
      return;
    }

    const o = this.originalTrip;
    console.log(o);

    const body = {
      name: this.name?.trim() || o?.name,
      country: this.country?.trim() || o?.country || null,
      destinationid: this.destinationId,
      coverimage: this.cover?.trim() || o?.coverimage,
      detail: this.detail?.trim() || o?.detail,
      price: this.price ?? o?.price,
      duration: this.duration ?? o?.duration,
    };

    try {
      const ok = confirm(`ยืนยันบันทึกการแก้ไขทริป #${this.id}?`);
      if (ok) {
        await this.tripService.putAddTrip(this.id!, body);
        alert('แก้ไขข้อมูลสำเร็จ');
      }
    } catch {
      alert('แก้ไขข้อมูลไม่สำเร็จ');
    }
  }

  resetForm() {
    this.id = null;
    this.name = '';
    this.country = null;
    this.cover = '';
    this.detail = '';
    this.price = 0;
    this.duration = 0;
    this.destinationId = null; // ใช้ตัวนี้แทนทุกที่
    this.saved = false;
    this.filteredCountries = [];
  }
}
