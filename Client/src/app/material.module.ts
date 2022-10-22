import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatGridListModule,
  MatExpansionModule,
  MatDialogModule,
  MatBadgeModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule,
  MatAutocompleteModule,
  MatBadgeModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
