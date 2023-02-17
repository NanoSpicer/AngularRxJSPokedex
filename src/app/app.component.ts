import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PokemonGeneration, PokemonService, SimplePokemon } from './pokemon.service';
import { Component, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  pokes$: Observable<Array<SimplePokemon>>

  options = [
    PokemonGeneration.gen1,
    PokemonGeneration.gen2
  ]

  selectedPokemon: SimplePokemon | null = null

  private selectedPokemonGeneration = new BehaviorSubject(PokemonGeneration.gen1)
  selectedPokemonGeneration$ = this.selectedPokemonGeneration.asObservable()

  constructor(private pokes: PokemonService) {
    this.pokes$ = this.selectedPokemonGeneration$.pipe(
      switchMap(selectedGen => pokes.pokemonGeneration(selectedGen))
    )
  }

  selectGeneration(gen: PokemonGeneration) {
    this.selectedPokemonGeneration.next(gen)
  }

}
