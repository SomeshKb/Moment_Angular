import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ValidationService } from 'src/app/core/service/validation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-moment',
  templateUrl: './create-moment.component.html',
  styleUrls: ['./create-moment.component.scss'],
})
export class CreateMomentComponent implements OnInit {
  momentForm = null;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedImageUrl = null;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.momentForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), ValidationService.isAlphanumericWithSpace]],
      tags: [[], [Validators.required, ValidationService.arrayValidator]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), ValidationService.isAlphanumericWithSpace]],
      attachFiles: [null, Validators.required]
    });
  }

  submit() {

    this.markFormGroupTouched(this.momentForm);
    if (this.momentForm.valid) {
      let formData = new FormData()

      formData.append('title', this.momentForm.value.title);
      formData.append('tags', JSON.stringify(this.momentForm.value.tags));
      formData.append('description', this.momentForm.value.description);
      formData.append('attachFiles', this.momentForm.value.attachFiles);

      let payload: Service = {
        requestBody: formData
      };

      this.httpService.apiPost('CREATE_MOMENTS', payload).subscribe((res) => {
        this.messageService.showSuccess('Moment Created Successfully')
        this.router.navigateByUrl('/moment')
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    const index = this.tags.indexOf(value);
    if (index == -1 && value) {
      this.tags.push(value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.momentForm.patchValue({
      tags: this.tags,
    });
    this.momentForm.updateValueAndValidity();
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.momentForm.patchValue({
      tags: this.tags,
    });
    this.momentForm.updateValueAndValidity();
  }

  onFileSelected(event) {
    console.log(event[0])

    this.momentForm.patchValue({
      attachFiles: event[0]
    });
    this.momentForm.updateValueAndValidity();
    let reader = new FileReader();
    reader.readAsDataURL(event[0]); // read file as data url
    reader.onload = (event) => {
      // called once readAsDataURL is completed
      this.selectedImageUrl = event.target.result;
    }


  }

  onFileDropped(event) {
    console.log(event)
    this.momentForm.patchValue({
      attachFiles: event[0],
    });
    this.momentForm.updateValueAndValidity();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsDirty();  // or 
      control.markAsTouched();
    });
  }

  removeSelectedImage() {
    this.momentForm.patchValue({
      attachFiles: null,
    });
    this.selectedImageUrl = null;
  }
}
