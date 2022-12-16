import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Game} from "../../models/game";

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent {

  gameForm: FormGroup = this.formbuilder.group({
    title: ['', [Validators.minLength(2),
      Validators.maxLength(255),
    Validators.required]],
    subtitle: ['', [Validators.minLength(2),
      Validators.maxLength(255),
    Validators.required]],
    description: ['', [Validators.minLength(2),
      Validators.maxLength(255),
    Validators.required]],
    image: ['', [Validators.minLength(2),
      Validators.maxLength(255),
    Validators.required]],
    favorite: [false, [Validators.required]]
  });
  game: Game = {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    favorite: false,
  };
    constructor(private formbuilder: FormBuilder){}

  get title(): any{
      return this.gameForm.get('title');
  }
  get subtitle(): any{
      return this.gameForm.get('subtitle');
  }
  get description(): any{
      return this.gameForm.get('description');
  }
  get image(): any{
      return this.gameForm.get('image');
  }

  addGame() {

  }
}
