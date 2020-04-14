import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { FormGroup, FormControl, Validator, AbstractControl, Validators } from "@angular/forms";
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/Model/category';
import { MyvalidationService } from 'src/app/service/myvalidation.service';
import { Router } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  fileData: File = null;
  picture: string = null;
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];
  public Editor = DecoupledEditor;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    public myValidationService: MyvalidationService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.getCategory();

    this.articleForm = new FormGroup({
      title: new FormControl("article 1", Validators.required),
      contentSummary: new FormControl("content summary 1", Validators.required),
      contentMain: new FormControl("content 1", Validators.required),
      category: new FormControl("", Validators.required),
      picture: new FormControl(""),
    });

  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  onSubmit() {

    if (!this.articleForm.valid)
      return false;

    this.loading = true;
    this.articleService.addArticle(this.articleForm.value).subscribe(data => {
      console.log("articles has added", data);
      this.success = true;

      this.router.navigateByUrl("/admin/article/list");
    }, error => {
      this.success = false;
      this.info = "There is an error: " + error.message;
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  displayCategoryName(category) {
    return category.name;
  }

  upload(files: any) {

    this.fileData = files.target.files[0];

    let formData = new FormData();

    formData.append("picture", this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe(data => {
      this.picture = data.path;

      this.articleForm.controls.picture.setValue(data.path);

    });

  }

  get getControls() {
    return this.articleForm.controls
  }


}
