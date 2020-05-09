import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor ( public http : HttpClient, public storage : StorageService) {
    
    }

    findByEmail(email: string) : Observable<ClienteDTO> {

         return this.http.get<ClienteDTO> (
             `${API_CONFIG.baseUrl}/clientes/email?value=${email}`); // passa cabeçaljo para requisição
    }

    getImageFromBucket(id : string) : Observable<any> { // buscar imagem no bucket
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg` //montando a URL
        return this.http.get(url, {responseType : 'blob'}); // requisição blob que é imagem
    }

}