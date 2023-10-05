import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  // Inject a form builder into the reservation form component
  constructor(
      private formBuilder: FormBuilder, 
      private reservationService: ReservationService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Note: form control names must match those found in the html document
    // We're creating a form group that requires all form controls to be valid
    // if the entire form is to be considered valid
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });

    // Retrieve id from current route for editing purposes later
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService
          .getSingleReservation(id)
          .subscribe(reservation => {
            if (reservation) {
              this.reservationForm.patchValue(reservation);
            }
          });
    }
  }

  onSubmit() {
     if (this.reservationForm.valid) {
      let currentReservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      // Update the reservation or add an entirely new reservation
      if (id) {
        currentReservation.id = id;
        this.reservationService
          .updateReservation(id, currentReservation)
          .subscribe(() => {
            console.log('Update reservation request processed.');
            
          });
      } else {
        this.reservationService
          .addReservation(currentReservation)
          .subscribe(() => {
            console.log('Reservation added.');
          });
      }
      this.router.navigate(['/list']);
     }
  }

}
