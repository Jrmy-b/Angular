import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.scss'],
})
export class CommandDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<CommandDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}