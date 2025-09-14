import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../../services/api/trip';

@Component({
  selector: 'app-delete',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
})
export class Delete {
  id: number | null = null;
  constructor(private tripService: Trip) {}

  async daleteTrip() {
    try {
      const ok = confirm(`ยืนยันบันทึกการแก้ไขทริป #${this.id}?`);
      if (ok) {
        await this.tripService.DaleteTrip(this.id);
        alert('ลบข้อมูลสำเร็จ');
      }
    } catch (error) {
      console.log('ลบข้อมูลไม่สำเร็จ', error);
    }
  }
}
