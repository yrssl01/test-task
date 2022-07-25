import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Config;

  constructor(private http: HttpClient) { }

  load() {
    const JSON_FILE = '/assets/configs/runtime-environment.json';

    return this.http.get(JSON_FILE)
      .toPromise()
      .then((data) => {
        this.config = <Config>data;
        console.log('Config loaded');
        console.log(this.config);
      })
  }

  getConfig() {
    return this.config;
  }
}
