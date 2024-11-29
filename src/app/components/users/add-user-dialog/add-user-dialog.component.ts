import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  isEdit: boolean = false;
  isCancelled: boolean = false; 

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required],
      role: ['User']
    });

    if (this.data) {
      this.isEdit = true;
      const maskedPassword = this.data.passwordHash ? this.data.passwordHash.substring(0, 10) + '********' : '';

      this.userForm.patchValue({
        id: this.data.id,
        username: this.data.username,
        email: this.data.email,
        passwordHash: maskedPassword,
        role: this.data.role
      });
    }
  }


  onSubmit(): void {

    if (this.isCancelled) {
      return;  
    }

    if (this.userForm.valid) {
      const user = { ...this.userForm.value };

      if (!this.isEdit) {
        delete user.id;
      }

      const userObservable = this.isEdit ? 
        this.userService.updateUser(user.id, user) : 
        this.userService.createUser(user);

      userObservable.subscribe(() => {
        this.showSuccessMessage();  
        this.dialogRef.close(true);
      });
    }
  }


  onCancel(): void {
    this.isCancelled = true;  
    this.dialogRef.close();   
  }

  showSuccessMessage(): void {
    const message = this.isEdit ? 'Usuario actualizado con éxito' : 'Usuario agregado con éxito';
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, 
      panelClass: ['success-snackbar'],
    });
  }
}
