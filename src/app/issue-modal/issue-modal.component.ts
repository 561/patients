import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent {

  constructor(
    public dialogRef: MatDialogRef<IssueModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {issue: string} ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(false);
  }
}
