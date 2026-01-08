import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { Workflow } from './components/workflow/workflow';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  { path: 'portfolio', component: Portfolio },
  { path: 'workflow', component: Workflow },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
