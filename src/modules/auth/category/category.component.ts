import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../_services/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('mymodal') model: ElementRef;

  public categoryList = [];
  public categoryForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    private authService: UserService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.resetCategoryForm();
  }

  resetCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  get categoryFormControls() { return this.categoryForm.controls; }

  async getCategoryList() {
    // const categoryList = await this.authService.getCategory();
    const categoryList = [{ id: "1", name: "Test - 1" }, { id: "2", name: "Test - 2" }];
    this.categoryList = categoryList;
  }

  logout() {
    localStorage.clear();
    this.categoryList = [];
    this.router.navigate(['/login']);
  }

  async deleteCategory(ID: string) {
    // const deleProduct = await this.authService.deleteCategory(ID);
    this.getCategoryList();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     
    }, (reason) => {
      console.log("cancel")
    });
  }

  async submitCategoryForm(value) {
    try {
      this.isSubmitted = true;
      if (this.categoryForm.invalid) {
        return;
      }
        const result = await this.authService.saveCategory(value);
        if (result) {
          this.modalService.dismissAll();
          this.getCategoryList();
        }
    } catch (error) {
      console.log(error);
    }
  }

}
