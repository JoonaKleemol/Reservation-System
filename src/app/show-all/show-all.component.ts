import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.scss']
})
export class ShowAllComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

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
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      CustomerName: [this.item.CustomerName],
      ItemName: [this.item.ItemName],
      ItemID: [this.item.ItemID],
      Reserver: [this.item.Reserver],
      ReservationDate: [this.item.ReservationDate],
      CustomerPhone: [this.item.CustomerPhone]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value) {
    value.avatar = this.item.avatar;
    value.ItemID = Number(value.ItemID);
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/home']);
        }
      )
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
