import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8081'

  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {

  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getSingleReservation(id: string): Reservation | undefined {
    return this.reservations.find(element => element.id === id);
  }
  
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): void {
    let targetIndex = this.reservations.findIndex(element => element.id === id);
    this.reservations.splice(targetIndex, 1);
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let targetIndex = this.reservations.findIndex(element => element.id === id);
    this.reservations[targetIndex] = updatedReservation;
  }
}
