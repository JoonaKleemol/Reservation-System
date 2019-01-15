import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('reservations').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('reservations').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('reservations').doc(userKey).delete();
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
      ItemID: parseInt(value.ItemID),
      avatar: avatar
    });
  }
}
