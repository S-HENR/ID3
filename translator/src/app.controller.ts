import { Body, CacheInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateFromEnDTO as TranslateDTO } from './dto/translate-from-en.dto';
import {TranslateFormDTO} from './dto/translate-form.dto'
import { TranslateFromEnResponse } from './models/TranslateFromEn.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  translate(@Body() translateDTO: TranslateDTO): Promise<TranslateFromEnResponse> {
    return this.appService.translate(translateDTO);
  }

  @Post("/form")
  translateForm(@Body() translateFormDTO: TranslateFormDTO): Promise<TranslateFormDTO> {
    return this.appService.translateForm(translateFormDTO);
  }

}
