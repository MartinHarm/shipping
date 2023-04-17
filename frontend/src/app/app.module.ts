import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateParcelComponent } from "./create-parcel/create-parcel.component";
import { ParcelListComponent } from "./parcel-list/parcel-list.component";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { InternalErrorComponent } from './errors/internal-error/internal-error.component';
import { ParcelService } from './services/parcel.service';
import { CountryService } from './services/country.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/parcel-list', pathMatch: 'full' },
  { path: 'create-parcel', component: CreateParcelComponent },
  { path: 'parcel-list', component: ParcelListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'internal-error', component: InternalErrorComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateParcelComponent,
    ParcelListComponent,
    NotFoundComponent,
    InternalErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ParcelService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
