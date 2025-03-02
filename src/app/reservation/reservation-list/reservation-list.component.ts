import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = []
  filterReservations: Reservation[] = []

  //filter two-way data bind
  guestNameFilter: string = '';
  roomNumberFilter: string = '';

  //sort properties
  sortDirection: boolean = true;
  sortedColumn: keyof Reservation | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
    this.filterReservations = this.reservations;

    this.sort('guestName');
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }

  goToCreate() {
    this.router.navigate(['/new'])
  }


  applyFilter() {
    let filteredReservations = [...this.reservations];

    if (this.guestNameFilter && this.guestNameFilter.length > 0) {
      filteredReservations = filteredReservations.filter(res =>
        res.guestName.toLowerCase().includes(this.guestNameFilter.toLowerCase())
      );
    }

    if (this.roomNumberFilter && this.roomNumberFilter.length > 0) {
      filteredReservations = filteredReservations.filter(res =>
        res.roomNumber.toString().toLowerCase().includes(this.roomNumberFilter.toLowerCase())
      );
    }

    this.filterReservations = filteredReservations;
  }


  sort(column: keyof Reservation) {
    if (this.sortedColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortedColumn = column;
      this.sortDirection = true;
    }

    this.filterReservations = [...this.filterReservations].sort((a, b) => {
      const aValue = a[column] ? a[column].toString().toLowerCase() : '';
      const bValue = b[column] ? b[column].toString().toLowerCase() : '';

      if (this.sortDirection) {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }
}
