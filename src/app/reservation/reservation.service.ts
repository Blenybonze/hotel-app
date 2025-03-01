import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private reservations: Reservation[] = []

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  deleteReservation(id: string) {
    let index = this.findIndex(id)
    this.reservations.splice(index, 1);
  }

  updateReservation(updateReservation: Reservation) {
    let index = this.findIndex(updateReservation.id);

    this.reservations[index] = updateReservation;
  }

  findIndex(id: string) {
    return this.reservations.findIndex(res => res.id === id);
  }

}
