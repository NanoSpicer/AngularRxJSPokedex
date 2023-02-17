import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { SimplePokemon } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input()
  pokemons: Array<SimplePokemon> = []
  @Output() selected = new EventEmitter<SimplePokemon>()

  constructor() { }

  ngOnInit() {
  }

}

