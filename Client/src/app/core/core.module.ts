import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    },
    {
      provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true
    },
],
})
export class CoreModule { }
