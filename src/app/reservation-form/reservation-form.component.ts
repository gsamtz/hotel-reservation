import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  // Inject a form builder into the reservation form component
  constructor(private formBuilder: FormBuilder) {

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
  }

  onSubmit() {
     // check if the form is valid
     if (this.reservationForm.valid) {
      console.log("valid");
     }
  }

}
