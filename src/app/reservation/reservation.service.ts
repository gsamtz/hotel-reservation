import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let persistedReservations = localStorage.getItem('reservations');
    this.reservations = persistedReservations ? JSON.parse(persistedReservations) : [];
  }

  getAllReservations(): Reservation[] {
    return this.reservations;
  }

  getSingleReservation(id: string): Reservation | undefined {
    return this.reservations.find(element => element.id === id);
  }
  
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let targetIndex = this.reservations.findIndex(element => element.id === id);
    this.reservations.splice(targetIndex, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let targetIndex = this.reservations.findIndex(element => element.id === id);
    this.reservations[targetIndex] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
