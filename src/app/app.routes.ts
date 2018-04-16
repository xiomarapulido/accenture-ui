import { RouterModule, Routes } from '@angular/router'

import { ClientRegisterComponent } from './components/client-register/client-register.component'
import { CreditRegisterComponent } from './components/credit-register/credit-register.component'

const app_routes: Routes = [
    { path: 'client', component: ClientRegisterComponent },
    { path: 'credit', component: CreditRegisterComponent },
    { path: '', pathMatch: 'full', redirectTo: 'client' }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });