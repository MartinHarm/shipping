import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Parcel } from "../models/parcel.model";
import { MatSort } from '@angular/material/sort';

import { ParcelService } from '../services/parcel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryService} from '../services/country.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html'
})
export class ParcelListComponent implements AfterViewInit {
  countries$: Observable<Country[]>;
  selectedCountry: string = '';

  displayedColumns: string[] = [
    'rowNum',
    'sku',
    'description',
    'streetaddress',
    'town',
    'country',
    'deliverydate'
  ];

  pageIndex: number = 0;
  pageSize: number = 10;
  totalCount!: number;
  filter: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Parcel> = new MatTableDataSource<Parcel>([]);
  constructor(
    private parcelService: ParcelService,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
  ) {
    this.countries$ = this.countryService.countries();
    this.fetchParcels();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.paginator.pageIndex = this.pageIndex || 0;
      this.paginator.pageSize = this.pageSize || 10;
    });
  }

  countryFilter(): void {
    this.filter.countrycode = this.selectedCountry;

    this.parcelService.getParcels(this.filter, 'ASC', this.pageSize, this.pageIndex + 1).subscribe(data => {
      this.dataSource = new MatTableDataSource<Parcel>(data.parcels);
      this.totalCount = data.totalCount;
    });
  }
  descriptionFilter(event: Event, filterType: string): void {
    this.filter.description = (event.target as HTMLInputElement).value;

    this.parcelService.getParcels(this.filter, 'ASC', this.pageSize, this.pageIndex + 1).subscribe(data => {
      this.dataSource = new MatTableDataSource<Parcel>(data.parcels);
      this.totalCount = data.totalCount;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.parcelService.getParcels(this.filter,'ASC', this.pageSize, this.pageIndex + 1).subscribe(data => {
      this.dataSource = new MatTableDataSource<Parcel>(data.parcels);
      this.totalCount = data.totalCount;
    });
  }

  fetchParcels(): void {
    this.parcelService.getParcels({},'asc', this.pageSize, this.pageIndex + 1).subscribe(
      (response: { parcels: Parcel[], totalCount: number }) => {
        this.dataSource = new MatTableDataSource<Parcel>(response.parcels);
        this.totalCount = response.totalCount;
      },
      (error: any) => {
        this.snackBar.open('Failed to load parcels. Please try again.', 'Close', {
          duration: 3000,
          panelClass: 'errorSnack'
        });
      }
    );
  }

}
