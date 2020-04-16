import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { FormGroup, FormControl, Validator, AbstractControl, Validators } from "@angular/forms";
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/Model/category';
import { MyvalidationService } from 'src/app/service/myvalidation.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Article } from 'src/app/Model/article';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  fileData: File = null;
  picture: string = null;
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];
  public Editor = DecoupledEditor;
  id: number;
  article: Article;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    public myValidationService: MyvalidationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  ngOnInit(): void {

    this.loading = true;
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.articleService.getArticle(this.id).subscribe(data => {
      this.picture = data.picture;

      this.getControls.title.setValue(data.title);
      this.getControls.contentMain.setValue(data.contentMain);
      this.getControls.contentSummary.setValue(data.contentSummary);
      this.getControls.category.setValue(data.category);

      this.loading = false;
    });

    this.getCategory();

    this.articleForm = new FormGroup({
      title: new FormControl("", Validators.required),
      contentSummary: new FormControl("", Validators.required),
      contentMain: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      picture: new FormControl(""),
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

  onSubmit() {

    if (!this.articleForm.valid)
      return false;

    this.loading = true;
    this.articleService.updateArticle(this.id,this.articleForm.value).subscribe(data => {
      console.log("articles has added", data);
      this.success = true;

      this.router.navigateByUrl("/admin/article/list");
    }, error => {
      this.success = false;
      this.info = "There is an error: " + error.message;
    });
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
