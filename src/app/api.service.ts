import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterModule } from './footer/footer.module';
import { FooterComponent } from './footer/footer.component';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  host = 'http://ec2-18-188-132-186.us-east-2.compute.amazonaws.com:3000';
  local = 'http://localhost:3000';
  // local = 'http://18.220.255.216:3000';

  contactUs(userId, userEmail, emailBody) {
    console.log(userId, userEmail, emailBody, 'USER AND MESSAGE INFO');
    this.http.post(`${this.local}/contactUs`, {userId: userId, userEmail: userEmail, emailBody: emailBody})
      .subscribe((data) => {
        console.log(data);
      });
  }

  userAcceptOffer() {
    console.log('accepted');
  }

  updateSettings(firstName, lastName, userEmail, userId, searchRadius, address, phoneNumber) {
    console.log(userId, 'USER ID');
    console.log(firstName, 'first name');
    // patch req to server
    this.http.patch(`${this.local}/user/settings`,
    { email: userEmail,
      userId: userId,
      radius: searchRadius,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber
    })
      .subscribe((data) => {
        console.log(data);
      });
  }

  // getBookInfoForOfferingList(isbn: string, callback) {
  //   this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`) // book info from book api
  //     .subscribe(((bookInfo: any) => {
  //       callback(bookInfo); // gets title of book
  //     }));
  // }

  getBookInfoForOfferingList(isbn: string, callback) {
    // https://www.googleapis.com/books/v1/volumes?q=isbn:9781573101370
    this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`) // book info from book api
      .subscribe(((bookInfo: any) => {
        callback(bookInfo); // gets title of book
      }));
  }

  addBookToUserOfferingList(isbnVal, bookCondition, title, userid, imageLink) {
    this.http.post(`${this.local}/user/listing`, { params: isbnVal, bookCondition, title, userid, imageLink })
      .subscribe((allListings: any) => {
        console.log(allListings, 'ALL LISTINGS IN OFFERING LIST');
        });
  }

  addBookToUserWantList(isbnVal, userid, title, imageLink) {
    this.http.post(`${this.local}/user/want`, { params: isbnVal, userid, title, imageLink })
      .subscribe((allWants: any) => {
      console.log(allWants, 'ALL WANTS FROM API SERVICE');
    });
  }

  renderWantList(callback) {
    // console.log(localStorage.userid, 'USERID');
    this.http.get(`${this.local}/user/want?${localStorage.userid}`)
    .subscribe((wantListArray) => {
      console.log(wantListArray, 'ARRAY OF WANT LIST');
      callback(wantListArray);
    });
  }

  renderListingsList(callback) {
    this.http.get(`${this.local}/user/listing?${localStorage.userid}`)
    .subscribe((listingListArray) => {
      console.log(listingListArray, 'ARRAY OF OFFERING LIST');
      callback(listingListArray);
    });
  }

  searchForBookWithIsbn(isbn) {
    this.http.get(`${this.local}/search/listing/isbn?${isbn}`)
    .subscribe((searchedListings: any) => {
      console.log(searchedListings, 'BOOKS USER HAS SEARCHED FOR');
      localStorage.setItem('searchedListings', searchedListings);
      console.log(localStorage);
    });
  }

  getPeerProfile(peerId, callback) {
    console.log(peerId, 'PEEER ID');
    this.http.get(`${this.local}/peer`, { params: {peerId} }).subscribe(data => {
      console.log(data, 'HEREERERERERE');
      callback(data);
    });
  }

  getBooks(isbn: string, callback) {
    this.http.get(`${this.local}/search/listing/isbn?${isbn}`).subscribe((searchedListings: any) => {
      console.log(searchedListings, 'SEARCHED LISTINGS');
      callback(searchedListings);
    });
  }

  sendOffer(options: any) {
    // console.log(options, 'OPTIONS');
    this.http.post(`${this.local}/offers`, { params: options }).subscribe(resp => {
      console.log(resp, 'offer created success');
    });
  }

  getOffers(callback) {
    console.log('TRYING TO GET OFFERS BUT STILL NOT WORKING');
    this.http.get(`${this.local}/offers`, { params: { id_user: localStorage.userid }}).subscribe(data => {
      console.log(data, 'DATA IN FROM GETOFFERS API CALL');
      callback(data);
    });
  }

  getProfile(username, callback) {
    this.http.get(`${this.local}/profile`, { params: { username } })
    .subscribe(data => {
      callback(data);
    });
  }

  // helper function to send user info
    userSignup({nickname, family_name, given_name, picture}) {
      // // this.http.post('http://localhost:3000/signup', {
      // // this.http.post('http://bibliobarter.com/signup', {
      this.http.post(`${this.local}/signup`, { params : {
        nickname,
        family_name,
        given_name,
        picture,
      }}).subscribe(async (response) => {

        console.log(response);
        });
    }

    getMatches(callback): any {
      // const DNS = process.env.DEVELOPMENT === 'development' ?
      console.log('IN GET MATCHES ON API SERVICE RIGHT HERE');
      this.http.get(`${this.local}/matches`).subscribe((response) => {
      callback(response);
      });
    }

    getSchools(id_user, callback) {
      this.http.get(`${this.local}/schools`, { params: { id_user } }).subscribe((response) => {
        callback(response);
        });
    }

    counterOffer(id, sender_id, recipient_id, all_listings, money) { // this takes in the offerId of the offer that the user is countering
      this.http.post(`${this.local}/counter`, { params: { id, sender_id, recipient_id, all_listings, money } }).subscribe((response) => {
        console.log(response);
        });
    }

    getUserInfo(id, callback) {
      this.http.get(`${this.local}/getUser`, { params: { id: id }})
        .subscribe((data) => {
          console.log(data, 'USER INFO');
          callback(data);
        });
    }
}

