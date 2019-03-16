import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modals',
  templateUrl: './add_listing_modal.component.html',
  styleUrls: ['./add_listing_modal.component.scss'],
})

export class AddListingModal implements OnInit {

  isbnVal: string = '';
  bookCondition: string = '';
  title: string = '';

  constructor(public modal: ModalController, private http: HttpClient) { }

  async closeModal() {
    this.modal.dismiss();
  }

  addBook() {
    console.log(this.isbnVal);
    const bookCondition = this.bookCondition;
    const isbnVal = this.isbnVal;
    console.log(bookCondition);

    // get req to Open Library Books API for book title from isbn
    this.http.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbnVal}&format=json`)
      .subscribe(((bookInfo: any) => {
        console.log(bookInfo);
        // sends obj w url key where the end of the url is the book title separated by _
        // grab just the title out of the url and switch _ to ' '
        this.title = bookInfo[Object.keys(bookInfo)[0]].info_url
        .split('/')[bookInfo[Object.keys(bookInfo)[0]].info_url.split('/').length - 1]
        .split('_').join(' ');
      }));

    const title = this.title; // so that sending will not yield undefined

    this.http.post('http://localhost:3000/user/listing', { params: this.isbnVal, bookCondition, title })
    .subscribe((allListings: any) => {
      console.log(allListings, 'ALL LISTINGS + NEW ONE');
    })
    this.closeModal();
  }

  ngOnInit() {}

}
