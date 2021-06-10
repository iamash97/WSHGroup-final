import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServicesListService } from '../servicelist.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-addnewservice',
  templateUrl: './addnewservice.component.html',
  styleUrls: ['./addnewservice.component.css']
})
export class AddnewserviceComponent implements OnInit{
  isLoading = false;
  imagePreview!: string;
  form!: any;
  constructor(public dataService: ServicesListService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = new FormGroup({
      ServiceName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      PricePerHour: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]})
      })
    }

    add() {
      if (this.form.invalid) {
        this.snackBar.open("Please fill in all the details","", {
          duration: environment.snackBarTime,
        });
        return;
      }
      this.isLoading = true;
        this.dataService.createService(
          this.form.value.ServiceName,
          this.form.value.PricePerHour,
          this.form.value.image
        );
      this.form.reset();
    }

    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image: file });
      this.form.get("image").updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }




