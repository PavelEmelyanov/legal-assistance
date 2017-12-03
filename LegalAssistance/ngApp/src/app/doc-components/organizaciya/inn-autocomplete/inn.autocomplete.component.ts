import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({  
  selector: 'la-inn-autocomplete',
  templateUrl: './inn.autocomplete.component.html',  
})
export class InnAutocompleteComponent {
    @Output() select = new EventEmitter<any>();

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

    search(keyword: string) : Observable<any> {
        let url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
        let headers = new HttpHeaders().set('Authorization', 'Token 922c36510a7e7096203e2297245cf49af1f482c9');
        
        let params = new HttpParams();
        params = params.set('query', keyword);
        params = params.set('count', '5');

        return this.http.get(url, { headers: headers, params: params })
                        .map(response => {
                            return response['suggestions'];
                        });
    }

    autocompleListFormatter = (match: any) : SafeHtml => {        
        let html = `<a>
                        ${match.value} <br/>
                        ${match.data.inn} ${match.data.address.value}
                    </a>`        
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }

    onSelect(data: any){
        this.select.emit(data);
    }
}