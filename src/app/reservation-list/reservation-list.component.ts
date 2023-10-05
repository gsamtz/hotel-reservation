import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
  }

  // Load existing reservations and render them appropriately
  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  deleteReservation(id: string): void {
    // ngOnInit may or may not assign reservations to the list; however, 
    // we're at least guaranteed to work with an empty list
    this.reservationService
      .deleteReservation(id)
      .subscribe(() => {
        console.log('Delete request for ID: ' + id + ' processed.');
      });
  }
}
