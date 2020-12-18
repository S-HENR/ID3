import {IsNotEmpty} from 'class-validator';
export class TranslateFromEnDTO {
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    targetLanguage: string;
}