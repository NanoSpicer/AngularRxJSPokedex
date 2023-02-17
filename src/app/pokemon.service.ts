import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiConfig } from './api-config';
import { API_CONFIG_INJECTION_TOKEN } from './app.module';


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

  public get baseurl() : string {
    return this.apiConfig.baseurl
  }

  public get gen1() {
    return this.apiConfig.gen1
  }

  public get gen2() {
    return this.apiConfig.gen2
  }

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG_INJECTION_TOKEN)
    private apiConfig: ApiConfig) {}

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
