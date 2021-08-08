import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatientService } from "../patient.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Patient } from "../interfaces";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  destroy$ = new Subject<void>();

  constructor(private service: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.service.getPatients().pipe(
      takeUntil(this.destroy$)).subscribe(
          (res: Patient[]) => this.patients = res
    );
  }

  openView(id: number): void {
    this.router.navigate(
      ['/view', id]
    );
  }

  openEdit(id: number): void {
    this.router.navigate(
      ['/edit', id]
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
