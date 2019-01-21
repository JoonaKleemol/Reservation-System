import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('avatar').valueChanges()
  }

  getUser(reservationsKey){
    return this.db.collection('reservations').doc(reservationsKey).snapshotChanges();
  }

  updateUser(reservationsKey, value){
    value.nameToSearch = value.CustomerName.toLowerCase();
    return this.db.collection('reservations').doc(reservationsKey).set(value);
  }

  deleteUser(reservationsKey){
    return this.db.collection('reservations').doc(reservationsKey).delete();
  }

  getUsers(){
    return this.db.collection('reservations').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('reservations',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('reservations',ref => ref.orderBy('Item_ID').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('reservations').add({
      CustomerName: value.CustomerName,
      nameToSearch: value.CustomerName.toLowerCase(),
      ItemName: value.ItemName,
      Reserver: value.Reserver,
      ReservationDate: parseInt(value.ReservationDate),
      ItemID: parseInt(value.ItemID),
      CustomerPhone: parseInt(value.CustomerPhone),
      avatar: avatar
    });
  }
}
