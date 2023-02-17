import { PokemonService } from './../pokemon.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FullPokemon, SimplePokemon } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  @Input()
  set pokemon(v: SimplePokemon | null) {
    this.input.next(v)
  }

  get pokemon(): SimplePokemon | null {
    return this.input.getValue()
  }

  private input = new BehaviorSubject<SimplePokemon | null>(null)
  private input$ = this.input.asObservable().pipe(filter(it => it != null))

  public details$: Observable<FullPokemon> = this.input$.pipe(
    map(poke => poke!.name),
    switchMap(name => this.pokes.pokemonDetails(name))
  )

  constructor(private pokes: PokemonService) { }

  ngOnInit() {
  }

}
