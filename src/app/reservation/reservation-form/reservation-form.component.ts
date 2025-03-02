import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.reservationService.getReservation(id)

      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        //update
        this.reservationService.updateReservation(id, this.reservationForm.value)
      } else {
        //new
        this.reservationService.addReservation(this.reservationForm.value)
      }

      this.router.navigate(['/list'])
    }
  }
}
