import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { ChallengeComponent } from './challenge/challenge.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'challenge', component: ChallengeComponent }
  // { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
