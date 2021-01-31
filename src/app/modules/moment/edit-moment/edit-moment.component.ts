import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { ValidationService } from 'src/app/core/service/validation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss']
})
export class EditMomentComponent implements OnInit {

  momentForm = null;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  momentData = null;
  momentId: string = null;
  selectedImageUrl = null;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.momentId = this.route.snapshot.paramMap.get('id');
    console.log(this.momentId)
    this.getMomentData(this.momentId);
  }
  createForm() {
    this.momentForm = this.formBuilder.group({
      title: [this.momentData ? this.momentData.title : '', [Validators.required,Validators.minLength(3),Validators.maxLength(30),ValidationService.isAlphanumericWithSpace]],
      tags: [this.momentData ? this.momentData.tags : [], [Validators.required, ValidationService.arrayValidator]],
      description: [this.momentData ? this.momentData.description : '', [Validators.required,Validators.minLength(3),Validators.maxLength(30),ValidationService.isAlphanumericWithSpace]],
      attachFiles: [this.momentData ? this.momentData.filePath : null, [Validators.required]]
    });
    this.tags = this.momentData.tags;
    this.momentForm.patchValue({
      tags: this.tags
    });

    if (this.momentData && this.momentData.filePath) {
      this.selectedImageUrl = this.momentData.filePath;
    }
  }

  getMomentData(id) {
    let serviceParams: Service = {
      dynamicUrlParams: {
        id: id
      }
    }
    this.httpService.apiGet('GET_SINGLE_MOMENTS', serviceParams).subscribe((res: any) => {
      this.momentData = res.data;
      this.createForm();

    },err=>{
      this.messageService.showError('Invalid Moment Detail');
      this.router.navigateByUrl('/moment')
    })
  }

  submit() {
    this.markFormGroupTouched(this.momentForm);
    if (this.momentForm.valid) {
      let formData = new FormData()
      formData.append('title', this.momentForm.value.title);
      formData.append('tags', JSON.stringify(this.momentForm.value.tags));
      formData.append('description', this.momentForm.value.description);

      if ( !(typeof this.momentForm.value.attachFiles === 'string' || this.momentForm.value.attachFiles instanceof String)) {
        debugger
        formData.append('attachFiles', this.momentForm.value.attachFiles);
      }
      const payload: Service = {
        requestBody: formData,
        dynamicUrlParams: { id: this.momentId }
      };


      this.httpService.apiPut('UPDATE_MOMENTS', payload).subscribe((res) => {
        this.messageService.showSuccess('Moment Updated Successfully')
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
