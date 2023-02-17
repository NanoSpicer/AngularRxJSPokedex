import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';


export enum PokemonGeneration {
  gen1 = 'gen1',
  gen2 = 'gen2'
}

export interface SimplePokemon {
  name: string
  url: string;
}

export interface FullPokemon {
  imageSrc: string;
  name: string;
  id: string;

}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  readonly baseurl = 'https://pokeapi.co/api/v2/pokemon'
  private readonly gen1 = {
    offset: 0,
    limit: 151
  }
  private readonly gen2 = {
    offset: 151,
    limit: 100
  }


  constructor(private http: HttpClient) { }

  pokemonGeneration(gen: PokemonGeneration): Observable<Array<SimplePokemon>> {
    const params = gen === 'gen1' ? this.gen1 : this.gen2
    return this.http.get<Array<SimplePokemon>>(this.baseurl, { params }).pipe(
      map((obj: any) => {
        return obj?.results ?? [] // just get the pokes
      }),
      delay(300)
    )
  }

  pokemonDetails(name: string): Observable<FullPokemon> {
    return this.http.get<Array<SimplePokemon>>(`${this.baseurl}/${name}`).pipe(
      tap(console.log),
      map((obj: any) => {
        return {
          id: obj.id,
          name,
          imageSrc: obj.sprites.front_default
        }
      }),
      delay(300)
    )
  }


}
