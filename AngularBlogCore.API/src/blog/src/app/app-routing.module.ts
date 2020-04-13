import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryArticlesComponent } from './pages/category-articles/category-articles.component';
import { SearchArticleComponent } from './pages/search-article/search-article.component';
import { ArchiveComponent } from './pages/archive/archive.component';



const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "page/:page",
        component: HomeComponent
      },
      {
        path: "article/:title/:id",
        component: ArticleComponent
      },
      {
        path: "category/:name/:id",
        component: CategoryArticlesComponent
      },
      {
        path: "category/:name/:id/page:page",
        component: CategoryArticlesComponent
      },
      {
        path: "search/page/:page",
        component: SearchArticleComponent
      },
      {
        path: "archive/:year/:month",
        component: ArchiveComponent
      },
      {
        path: "archive/:year/:month/page/:page",
        component: ArchiveComponent
      },
      {
        path: "aboutme",
        component: AboutMeComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
    ]
  },
  {
    path: "Admin",
    component: AdminLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
