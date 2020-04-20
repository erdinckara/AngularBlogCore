import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyvalidationService } from 'src/app/service/myvalidation.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  commentForm: FormGroup;
  success: boolean;
  info: string;

  constructor(
    public commentService: CommentService,
    private route: ActivatedRoute,
    public myvalidationService: MyvalidationService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      name: new FormControl("", Validators.required),
      contentMain: new FormControl("", Validators.required),
      articleId: new FormControl("")
    });
  }

  get getControls() {
    return this.commentForm.controls;
  }

  onSubmit() {
    if (!this.commentForm.valid)
      return false;

    var data = this.commentForm.value;
    let id = Number(this.route.snapshot.paramMap.get("id"));

    this.commentForm.controls.articleId.setValue(id);

    this.commentService.addComment(this.commentForm.value).subscribe(data => {
      this.success = true;
      this.info = "The comment has been added";
    }, error => {
      this.success = false;
      this.info = "There was an error: " + error.message;
    });

  }

}
