import { Component, OnInit } from '@angular/core';
import { faCheckDouble, faDoorClosed, faThList, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductImpl } from 'src/app/models/ProductImpl';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  faCheckDouble = faCheckDouble;
  faDoorClosed = faDoorClosed;
  faThList = faThList;
  faKeyboard = faKeyboard;

  entityToBeDeleted: any;
  callerType: string;

  itemPluralMapping = {
    clinic: {
      '=1': '1 Clinic',
      other: '# Clnics'
    },
    examCategory: {
      '=0': '0 Exam Categories',
      '=1': '1 Exam Category',
      other: '# Exam Categories'
    },
    typingShortcut: {
      '=0': '0 Typing Shortcuts',
      '=1': '1 Typing Shortcut',
      other: '# Typing Shortcuts'
    },
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.entityToBeDeleted != null) {
      this.determineTypeOfEntityToBeDeleted();
    }
  }

  private determineTypeOfEntityToBeDeleted() {
    switch (this.entityToBeDeleted.constructor) {
      case ProductImpl:
        this.callerType = 'Product';
        break;

    }
  }

}
