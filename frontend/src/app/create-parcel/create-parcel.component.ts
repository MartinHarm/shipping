import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ParcelService } from '../services/parcel.service';
import { Parcel } from '../models/parcel.model';
import {Country} from "../models/country.model";
import {CountryService} from "../services/country.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrls: ['./create-parcel.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'et' },
    { provide: LOCALE_ID, useValue: 'et' },
    ParcelService
  ]
})
export class CreateParcelComponent {
  countries$: Observable<Country[]>;

  parcelForm: FormGroup;
  skuValidationMessage: string = '';

  constructor(
    @Inject(MAT_DATE_LOCALE) private dateLocale: string,
    private countryService: CountryService,
    private parcelService: ParcelService,
    private snackBar: MatSnackBar
  ) {
    this.countries$ = this.countryService.countries();

    this.dateLocale = 'et';

    this.parcelForm = new FormGroup({
      sku: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      streetaddress: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      countrycode: new FormControl('', Validators.required),
      deliverydate: new FormControl('', Validators.required),
    });

    this.parcelForm?.get('sku')?.valueChanges.subscribe((value) => {
      this.parcelService.validateSKU(value).subscribe((response: { valid: boolean }) => {
        if (response.valid) {
          this.skuValidationMessage = '';
          this.parcelForm.controls['sku'].setErrors(null);
        } else {
          this.skuValidationMessage = 'SKU already in use';
          this.parcelForm.controls['sku'].setErrors({ 'invalidSku': true });
        }
      });
    });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      const parcelData: Parcel = this.getCreateParcelPayload();
      this.parcelService.createParcel(parcelData).subscribe(
        () => {
          this.snackBar.open('Parcel created successfully!', 'Close', {
            duration: 3000,
            panelClass: 'successSnack'
          });
          this.parcelForm.reset();
        },
        (error: any) => {
          this.snackBar.open('Failed to create parcel. Please try again.', 'Close', {
            duration: 3000,
            panelClass: 'errorSnack'
          });
        }
      );
    }
  }

  private getCreateParcelPayload() {
    return {
      sku: this.parcelForm.get('sku')?.value,
      description: this.parcelForm.get('description')?.value,
      streetaddress: this.parcelForm.get('streetaddress')?.value,
      town: this.parcelForm.get('town')?.value,
      countrycode: this.parcelForm.get('countrycode')?.value,
      deliverydate: this.parcelForm.get('deliverydate')?.value,
    };
  }
}
