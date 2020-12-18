import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class AWSConfigCredentials {

    accessKeyId: string;
    secretAccessKey: string;

    constructor(prod: boolean,private configService?: ConfigService) {
        if (!prod) {
            this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
            this.secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');      
        } else {
            
        }
    }

    
}