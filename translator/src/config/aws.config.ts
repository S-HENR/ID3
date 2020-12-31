import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from 'fs';

export class AWSConfigCredentials {

    accessKeyId: string;
    secretAccessKey: string;

    constructor(prod: boolean,private configService?: ConfigService) {
        if (!prod) {
            this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
            this.secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');      
        } else {
            this.accessKeyId = fs.readFileSync('/run/secrets/AWS_ACCESS_KEY_ID', 'utf8').replace( /[\r\n]+/gm, "" );
            this.secretAccessKey = fs.readFileSync('/run/secrets/AWS_SECRET_ACCESS_KEY', 'utf8').replace( /[\r\n]+/gm, "" );
        }
    }

    
}