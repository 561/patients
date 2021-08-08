import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { IssueModalComponent } from "../issue-modal/issue-modal.component";
import { takeUntil } from "rxjs/operators";
import { Patient } from "../interfaces";
import { Genders, PatientService } from "../patient.service";
import { Subject } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  patientForm: FormGroup;
  patient: Patient;
  issues: string[] = [''];
  destroy$ = new Subject<void>();
  id: string;

  constructor(
    private service: PatientService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
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
    this.patientForm = new FormGroup({
      name: new FormControl(this.patient?.name || '', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.patient?.lastName || '', Validators.required),
      secondName: new FormControl(this.patient?.secondName || ''),
      age: new FormControl(this.patient?.age || '', Validators.required),
      sex: new FormControl(this.patient?.sex || 0),
      date: new FormControl(this.patient?.date || '', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  editIssue(issue: string, idx: number): void {
    const dialogRef = this.matDialog.open(IssueModalComponent, {
      width: '500px',
      data: {issue: issue}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        this.issues.splice(idx, 1)
      } else {
        this.issues[idx] = result;
      }
    })
  }


  addIssue(): void {
    this.issues.push('');
  }

  submit(): void {
    console.log(this.patientForm)
    const newData = {
      id: +this.id,
      name: this.patientForm.controls['name'].value,
      lastName: this.patientForm.controls['lastName'].value,
      secondName: this.patientForm.controls['secondName'].value,
      age: this.patientForm.controls['age'].value,
      sex: this.patientForm.controls['sex'].value,
      date: this.patientForm.controls['date'].value,
      issues: this.issues
    }
    this.service.setPatient(this.id, newData)
  }

}
