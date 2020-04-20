import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router"
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import {  PipeModule } from '../pipes/pipe.module';

import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ArticlesComponent } from './articles/articles.component';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';
import { MenuArchiveComponent } from './menu-archive/menu-archive.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MaterialModule } from '../modules/material.module';
import { ListCommentComponent } from './list-comment/list-comment.component';


@NgModule({
  declarations: [
    MenuCategoryComponent,
    PageTitleComponent,
    ArticlesComponent,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    AddCommentComponent,
    ListCommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    MaterialModule,
    PipeModule
  ],
  exports: [
    MenuCategoryComponent,
    PageTitleComponent,
    ArticlesComponent,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    AddCommentComponent,
    ListCommentComponent
  ]
})
export class ComponentsModule { }
