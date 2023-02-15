import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'study', component: StudyComponent }
  // { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
