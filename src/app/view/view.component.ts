import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient } from "../interfaces";
import { Subject } from "rxjs";
import { PatientService } from "../patient.service";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  patient: Patient;
  id: string;
  issues: string[] = [''];
  destroy$ = new Subject<void>();
  gender: string;

  constructor(
    private service: PatientService,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }});
  }

  ngOnInit(): void {
    this.service.getPatients().pipe(
      takeUntil(this.destroy$)).subscribe(
      (res: Patient[]) => {
        const patient = res.find((item) => item.id.toString() == this.id);
        if (patient) {
          this.patient = patient
        }
        this.issues = res.find((item) => item.id.toString() == this.id)?.issues || ['']
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }


}
