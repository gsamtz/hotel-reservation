import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  getAllReservations(): Reservation[] {
    return this.reservations;
  }

  getSingleReservation(id: string): Reservation | undefined {
    return this.reservations.find(element => element.id === id);
  }
  
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let targetIndex = this.reservations.findIndex(element => element.id === id);
    this.reservations.splice(targetIndex, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(updatedReservation: Reservation): void {
    let targetIndex = this.reservations.findIndex(element => element.id === updatedReservation.id);
    this.reservations[targetIndex] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
