import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { trigger, style, state, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ItemsService } from '../../services/items.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  animations: [
    trigger('shake', [
      transition('* => *', [
        animate(150, keyframes([
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '10px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '20px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '10px' }),
          style({ 'margin-left': '10px', 'margin-right': '0px' }),
          style({ 'margin-left': '0px', 'margin-right': '0px' }),
        ]))
      ])
    ])
  ]
})
export class AdminPanelComponent implements OnInit {

  smallScreen: boolean;

  addItemForm: FormGroup;

  itemNameState: boolean;
  itemImageState: boolean;

  loading: boolean;

  imageBase64: SafeUrl;

  imageButtonWasClicked: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder,
    private itemsService: ItemsService, private dialog: MatDialog, private router: Router,
    private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 768px)').subscribe((breakpointState: BreakpointState) => {
      this.smallScreen = breakpointState.matches;
    });

    this.createForm();
    this.loading = false;
    this.imageButtonWasClicked = false;
  }

  createForm() {
    this.addItemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemImage: ['', [Validators.required]],
      canBePainted: [false],
      canBeCertified: [false]
    });
  }

  itemNameError() {
    const control = this.addItemForm.get('itemName');

    if (control.hasError('required')) {
      return 'Uzupełnij nazwę przedmiotu';
    }
  }

  itemImageError() {
    const control = this.addItemForm.get('itemImage');

    if (control.hasError('required')) {
      return 'Dodaj obraz przedmiotu';
    }
  }

  onSubmit() {
    if (!this.addItemForm.valid) {
      if (!this.addItemForm.get('itemName').valid) {
        this.itemNameState = !this.itemNameState;
      }

      if (!this.addItemForm.get('itemImage').valid) {
        this.itemImageState = !this.itemImageState;
      }
    } else {
      this.loading = true;

      this.itemsService.addItem(
        {
          canBeCertified: this.addItemForm.get('canBeCertified').value,
          canBePainted: this.addItemForm.get('canBePainted').value,
          itemImage: this.addItemForm.get('itemImage').value,
          itemName: this.addItemForm.get('itemName').value
        }
      ).subscribe(data => {
        console.log(data);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  itemChanged(event) {
    event.preventDefault();
    const files = event.target.files;
    console.log(event);
    if (files) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = this.handleReaderOnLoad.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }

  handleReaderOnLoad(event) {
    const binaryString = event.target.result;
    const base64 = btoa(binaryString);
    this.addItemForm.get('itemImage').setValue(base64);
    this.imageBase64 = this.sanitizer.bypassSecurityTrustUrl('data:Image/*;base64,' + base64);
  }

  prevent($event) {
    this.imageButtonWasClicked = true;
    $event.preventDefault();
  }
}
