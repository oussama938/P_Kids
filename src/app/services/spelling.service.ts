import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class SpellingService {
  jsonFileName=''
  jsonData?: any[];

  constructor(private http: HttpClient) { }

  loadData(jsonFile: string): Observable<any[]> {
    this.jsonFileName=jsonFile
    return this.http.get<any[]>('../../../assets/spells/'+jsonFile);
  }

  saveDataToFile(data:any,fileName:string): void {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(jsonBlob, this.jsonFileName);
  }


}
