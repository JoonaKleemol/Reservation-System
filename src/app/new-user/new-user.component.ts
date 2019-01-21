import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "data:image/jpeg;base64,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";

  validation_messages = {
   'CustomerName': [
     { type: 'required', message: 'Customer Name is required.' }
   ],
   'ItemName': [
     { type: 'required', message: 'Item Name is required.' }
   ],
   'ItemID': [
     { type: 'required', message: 'Item ID is required.' },
   ],
   'Reserver': [
     { type: 'required', message: 'Reserver is required.' },
   ],
   'ReservationDate': [
     { type: 'required', message: 'Date is required.' },
   ],
   'CustomerPhone': [
     { type: 'required', message: 'Item ID is required.' },
   ],

 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      CustomerName: ['', Validators.required ],
      ItemName: ['', Validators.required],
      Reserver: ['', Validators.required],
      ReservationDate: ['', Validators.required],
      ItemID: ['', Validators.required],
      CustomerPhone: ['', Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "data:image/jpeg;base64,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";
    this.exampleForm = this.fb.group({
      CustomerName: ['', Validators.required],
      ItemName: ['', Validators.required],
      Reserver: ['', Validators.required],
      ReservationDate: ['', Validators.required],
      ItemID: ['', Validators.required],
      CustomerPhone: ['', Validators.required]
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value, this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
