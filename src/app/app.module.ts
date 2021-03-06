import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { IonicApp, IonicErrorHandler } from '@ionic/angular/ngx'; // if no work, try /ngx
import { IonApp, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from './services/auth/auth.service';
import { HomePageModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';
import { ModalsModule } from './modals/modals.module';
import { SearchModalsModule } from './search_modal/search_modal.module';
import { AddListingModule } from './add_listing_modal/add_listing_modal.module';
import { ContactModalModule } from './contact_modal/contact_modal.module';
import { WantListModule } from './want_list_modal/want_list_modal.module';
import { CounterOfferModule } from './counter_offer_modal/counter_offer_modal.module';
import { SettingsService } from './services/settings/settings.service';
import { AutoCompleteService } from './services/autoComplete/auto-complete.service';
import { PeerProfilePageModule } from './profile/peerProfile/peer-profile/peer-profile.module';
import { PrivacyModule } from './privacy/privacy.module';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
// import { EmailProvider } from '../providers/email/email';
import { ChatPageModule } from './chat/chat.module';
// import { ChatPage } from './chat/chat.page';
import { ChatService } from './chat.service';
import Chatkit from '@pusher/chatkit-client';
// import { ReactiveFormsModule, FormControl } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    FooterModule,
    ModalsModule,
    SearchModalsModule,
    AddListingModule,
    ContactModalModule,
    WantListModule,
    PeerProfilePageModule,
    PrivacyModule,
    CounterOfferModule,
    // ReactiveFormsModule,
    // FormControl,
    ChatPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    SettingsService,
    AutoCompleteService,
    EmailComposer,
    BarcodeScanner,
    ChatService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
