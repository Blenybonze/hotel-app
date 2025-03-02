import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() {
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : []
  }

  private reservations: Reservation[] = []

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);

    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  deleteReservation(id: string) {
    this.reservations.splice(this.findIndex(id), 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  updateReservation(id: string, updateReservation: Reservation) {
    updateReservation.id = id;
    this.reservations[this.findIndex(id)] = updateReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  findIndex(id: string) {
    return this.reservations.findIndex(res => res.id === id);
  }

}
