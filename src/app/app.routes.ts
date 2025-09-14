import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { InDeUp } from './pages/in-de-up/in-de-up';
import { Insert } from './pages/in-de-up/insert/insert';
import { Delete } from './pages/in-de-up/delete/delete';
import { Update } from './pages/in-de-up/update/update';
import { Details } from './pages/details/details';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'admin',
    component: InDeUp,
    children: [
      { path: 'insert', component: Insert },
      { path: 'delete', component: Delete },
      { path: 'update', component: Update },
    ],
  },
  {
    path: 'details/:id',
    component: Details,
  },
];
