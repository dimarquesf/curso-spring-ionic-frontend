import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util-service";

@Injectable()
export class ClienteService {

    constructor ( 
        public http : HttpClient,
         public storage : StorageService,
         public imageUtilService: ImageUtilService) {
        }

    findByEmail(email: string)  {

        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`); // passa cabeçalho para requisição
    }

    findByID(id: string)  {

        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`); 
    }

    getImageFromBucket(id : string) : Observable<any> { // buscar imagem no bucket
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg` //montando a URL
        return this.http.get(url, {responseType : 'blob'}); // requisição blob que é imagem
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}