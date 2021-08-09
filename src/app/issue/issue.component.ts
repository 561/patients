import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IssueModalComponent } from "../issue-modal/issue-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})



export class IssueComponent implements OnInit {
  @Input() issue: string;
  @Output() edit = new EventEmitter()


  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }


  editIssue(issue: string): void {
    const dialogRef = this.matDialog.open(IssueModalComponent, {
      width: '500px',
      data: {issue: issue}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.edit.emit(result)
    })
  }

}
