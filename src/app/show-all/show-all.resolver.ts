import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ShowAllResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let reservationId = route.paramMap.get('id');
      this.firebaseService.getUser(reservationId)
        .subscribe(
        data => {
          resolve(data);
        }
        );
    })
  }
}
