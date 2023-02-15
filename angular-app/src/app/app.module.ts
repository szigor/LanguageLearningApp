import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { StudyComponent } from './study/study.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChallengeComponent,
    DictionaryComponent,
    StudyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
