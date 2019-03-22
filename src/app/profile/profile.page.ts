import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { PopoverController } from '@ionic/angular';
import { WantListModal } from '../want_list_modal/want_list_modal.component';
import { AddListingModal } from '../add_listing_modal/add_listing_modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit{
  img: any;
  user: any;
  school: any;
  offers: any = [];
  acceptedOffers: any = [];
  wants: any = [];
  listings: any = [];
  allOffers: any = [];
  loaded: boolean = false;
  offerid: any; // need to grab correct offerid --> where do we get this

  constructor(private apiService: ApiService, public modal: ModalController, private router: Router, private http: HttpClient,) {}

  setUser(data) {
    console.log(data);
    // add userid to local storage
    localStorage.setItem('userid', data[0].id_user);

    if (data[0].length) {
      this.img = data[0].image_link;
        this.user = data[0].user_name;
        if (data[1].length) {
        this.school = data[1][0].name;
        this.loaded = true;
        }
        
    } else {
      this.user = localStorage.username;
    }
  }

  async openWantListModal()
  {
    var data = { message : 'hello world' };
    const modalPage = await this.modal.create({
      component: WantListModal, 
      componentProps:{values: data}
    });
    return await modalPage.present();
  }
  
  async openAddListingModal()
  {
    var data = { message : 'hello world' };
    const modalPage = await this.modal.create({
      component: AddListingModal, 
      componentProps:{values: data}
    });
    return await modalPage.present();
  }

  acceptOffer() {
  this.offerid = this.allOffers[1].offer.id_offer;
  // this.offerid = this.allOffers[1].offer[0].id_offer;
  // console.log(this.allOffers[1].offer, 'LOOKING FOR OFFER ID');
  const id_offer = this.offerid;
    // this.apiService.userAcceptOffer(); // for when we refactor
    console.log(this.allOffers[1], 'ALL OFFERS');
  this.http.patch('http://localhost:3000/offerlisting', { params: {status: 'accepted', offerId: id_offer} })
    .subscribe((offerData) => {
      console.log(offerData, 'OFFER DATA FROM SERVER');
    })
  }

  renderOffers(offers) {
    console.log(offers, 'OFFERS');
    this.allOffers = offers;
    let offs: any = []
    for (let offer of offers.slice(1)) {
      if (offer.offer.length) {
    let offerObj: any = {};
    offerObj.offeredTitle = offer.titleOffered.title;
    offerObj.wantedTitle = offer.titleWanted.title;
    offerObj.peer = offer.peer.user_name;
    offerObj.status = offer.offer.status;
    offerObj.email = offer.peer.email;
    offs.push(offerObj);
      }
  }
  this.offers = offs;
  console.log(this.offers, 'THIS DOT OFFERS');
}

  rejectOffer() {
    console.log('offer rejected');
    const id_offer = this.allOffers[2].offer.id_offer;
    this.http.patch('http://localhost:3000/offerlisting', { params: {status: 'rejected', offerId: id_offer} })
    .subscribe(() => {

    })
    }

  setWantList(array) {
    this.wants = array;
  }

  setListings(array) {
    this.listings = array;
  }

  ngOnInit() {
    this.setWantList = this.setWantList.bind(this);
    this.apiService.renderWantList(this.setWantList);
    this.setListings = this.setListings.bind(this);
    this.apiService.renderListingsList(this.setListings);
    this.renderOffers = this.renderOffers.bind(this);
    this.setUser = this.setUser.bind(this);
    this.apiService.getProfile(localStorage.getItem('username'), this.setUser);
    this.apiService.getOffers(this.renderOffers);
  }

}