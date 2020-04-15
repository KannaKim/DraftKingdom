import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule} from '@angular/common';
import { ReplacePipe } from './Pipes/replace.pipe';
import { TestComponent } from './Components/test/test.component';
import { DraftKingdomMainComponent } from './Components/draft-kingdom-main/draft-kingdom-main.component'
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './Components/options/options.component';
import { HomeComponent } from './Home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    ReplacePipe,
    TestComponent,
    DraftKingdomMainComponent,
    OptionsComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
