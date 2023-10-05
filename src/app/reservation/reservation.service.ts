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

  getSingleReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservations/id?id=' + id);
  }
  
  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/reservations', reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/reservations?id=' + id);
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    // let targetIndex = this.reservations.findIndex(element => element.id === id);
    // this.reservations[targetIndex] = updatedReservation;
    return this.http.put<void>(this.apiUrl + '/reservations', updatedReservation);
  }
}
