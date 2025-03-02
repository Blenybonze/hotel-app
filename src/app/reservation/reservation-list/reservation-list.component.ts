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

  guestNameFilter: string = '';
  roomNumberFilter: string = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
    this.filterReservations = this.reservations;
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }

  goToCreate() {
    this.router.navigate(['/new'])
  }


  applyFilter() {
    let filteredReservations = [...this.reservations]; // Inicia com todas as reservas

    // Aplica o filtro de guestName se o valor estiver preenchido
    if (this.guestNameFilter && this.guestNameFilter.length > 0) {
      filteredReservations = filteredReservations.filter(res =>
        res.guestName.toLowerCase().includes(this.guestNameFilter.toLowerCase())
      );
    }

    // Aplica o filtro de roomNumber se o valor estiver preenchido
    if (this.roomNumberFilter && this.roomNumberFilter.length > 0) {
      filteredReservations = filteredReservations.filter(res =>
        res.roomNumber.toString().toLowerCase().includes(this.roomNumberFilter.toLowerCase())
      );
    }

    // Atualiza a lista filtrada com base nos filtros aplicados
    this.filterReservations = filteredReservations;
  }

}
