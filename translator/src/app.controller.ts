import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateFromEnDTO } from './dto/translate-from-en.dto';
import {TranslateFormDTO} from './dto/translate-form.dto'
import { TranslateFromEnResponse } from './models/TranslateFromEn.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  translateFromEn(@Body() translateFromEnDTO: TranslateFromEnDTO): Promise<TranslateFromEnResponse> {
    return this.appService.translateFromEn(translateFromEnDTO);
  }

  @Post("/form")
  translateForm(@Body() translateFormDTO: TranslateFormDTO): Promise<TranslateFormDTO> {
    return this.appService.translateForm(translateFormDTO);

  }

}
