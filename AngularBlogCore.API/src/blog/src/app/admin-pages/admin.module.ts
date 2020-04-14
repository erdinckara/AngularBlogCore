import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../modules/material.module";
import { ComponentsModule } from "../components/components.module";


import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminNavComponent } from '../nav/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ArticleAddComponent } from './article/article-add/article-add.component';
import { ArticleUpdateComponent } from './article/article-update/article-update.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AdminArticleComponent } from './article/admin-article/admin-article.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminNavComponent,
    AdminHomeComponent,
    ArticleAddComponent,
    ArticleUpdateComponent,
    ArticleListComponent,
    AdminArticleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class AdminModule { }
