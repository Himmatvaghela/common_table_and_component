import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionComponent } from './fashion/fashion.component';

const routes: Routes = [
  { path: '', redirectTo: 'fashion', pathMatch: 'full' },
  { path: 'fashion', component: FashionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
