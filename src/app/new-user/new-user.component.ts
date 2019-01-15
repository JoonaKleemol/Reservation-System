import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "https://nyoobserver.files.wordpress.com/2014/11/sleep.png?w=256";

  validation_messages = {
   'CustomerName': [
     { type: 'required', message: 'Customer Name is required.' }
   ],
   'ItemName': [
     { type: 'required', message: 'Item Name is required.' }
   ],
   'ItemID': [
     { type: 'required', message: 'Item ID is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      CustomerName: ['', Validators.required ],
      ItemName: ['', Validators.required ],
      ItemID: ['', Validators.required ]
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
    this.avatarLink = "https://nyoobserver.files.wordpress.com/2014/11/sleep.png?w=256";
    this.exampleForm = this.fb.group({
      CustomerName: ['', Validators.required],
      ItemName: ['', Validators.required],
      ItemID: ['', Validators.required]
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
