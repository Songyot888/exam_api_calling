import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../../services/api/trip';
import {
  TripGetResponse,
  DestinationZone,
} from '../../../model/trip_get_response';
import { timer } from 'rxjs';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insert.html',
  styleUrl: './insert.scss',
})
export class Insert {
  trip_map: TripGetResponse[] = [];

  filteredCountries: string[] = [];

  name = '';
  destinationId: number | null = null;
  country: string | null = null;
  cover = '';
  detail = '';
  price = 0;
  duration = 0;

  saved = false;

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

  onZoneChange(zid: number | null) {
    this.destinationId = zid;
    this.country = null;
    this.filteredCountries = zid == null ? [] : this.countriesByZone[zid] ?? [];
    this.cdr.detectChanges();
  }

  async addfrom() {
    if (!this.name.trim()) {
      alert('กรุณากรอกชื่อทริป');
      return;
    }
    if (!this.destinationId) {
      alert('กรุณาเลือกโซน');
      return;
    }
    if (!this.country) {
      alert('กรุณาเลือกประเทศ');
      return;
    }

    const body = {
      name: this.name.trim(),
      country: this.country,
      destinationid: Number(this.destinationId),
      coverimage: this.cover.trim(),
      detail: this.detail.trim(),
      price: Number(this.price) || 0,
      duration: Number(this.duration) || 0,
    };

    var ok = confirm('คุณต้องการเพิ่มข้อมูลใช่มั้ย');
    if (ok) {
      var ind = await this.tripService.postAddTrip(body);
      try {
        if (ind) {
          this.saved = true;
          setTimeout(() => (this.saved = false), 2000);
        } else {
          alert('บันทึกไม่สำเร็จ');
        }
        this.cdr.detectChanges();
      } catch (error) {
        console.error('POST failed:', error);
      }
    }
  }

  resetForm() {
    this.name = '';
    this.destinationId = null;
    this.country = null;
    this.cover = '';
    this.detail = '';
    this.price = 0;
    this.duration = 0;
    this.saved = false;
  }
}
