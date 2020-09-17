/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { LoginRequest } from '../model/loginRequest';
import { SignUpRequest } from '../model/signUpRequest';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AuthenticationControllerService {

    protected basePath = 'https://localhost:80';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * authenticateUser
     * 
     * @param loginRequest loginRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticateUserUsingPOST(loginRequest: LoginRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public authenticateUserUsingPOST(loginRequest: LoginRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public authenticateUserUsingPOST(loginRequest: LoginRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public authenticateUserUsingPOST(loginRequest: LoginRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (loginRequest === null || loginRequest === undefined) {
            throw new Error('Required parameter loginRequest was null or undefined when calling authenticateUserUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/auth/login`,
            loginRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * helloUser
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public helloUserUsingPOST(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public helloUserUsingPOST(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public helloUserUsingPOST(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public helloUserUsingPOST(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.post<any>(`${this.basePath}/auth/hello`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * signUpUser
     * 
     * @param signUpRequest signUpRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public signUpUserUsingPOST(signUpRequest: SignUpRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public signUpUserUsingPOST(signUpRequest: SignUpRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public signUpUserUsingPOST(signUpRequest: SignUpRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public signUpUserUsingPOST(signUpRequest: SignUpRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (signUpRequest === null || signUpRequest === undefined) {
            throw new Error('Required parameter signUpRequest was null or undefined when calling signUpUserUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/auth/signup`,
            signUpRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
