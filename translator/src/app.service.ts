import { Injectable } from '@nestjs/common';

import {Translate, TranslateTextRequest, TranslateClientConfig} from '@aws-sdk/client-translate';
import { ConfigService } from '@nestjs/config';
import { TranslateFromEnDTO } from './dto/translate-from-en.dto';
import { AWSConfigCredentials } from './config/aws.config';
import { TranslateFromEnResponse } from './models/TranslateFromEn.response';
import { TranslateFormDTO } from './dto/translate-form.dto';
import { QuestionAnswersForm } from './models/question-answers-form.model';
import { sleep } from './utils/sleep';

@Injectable()
export class AppService {
  private prod = (process.env.NODE_ENV === "production");

  constructor(private configService: ConfigService){}

  async translateFromEn(translateFromEn: TranslateFromEnDTO): Promise<TranslateFromEnResponse>  {


    var conf = new AWSConfigCredentials(this.prod,this.configService);

    const cli = new Translate(
      {
        apiVersion: '2017-07-01',
        region:"eu-north-1",
        credentials: {accessKeyId: conf.accessKeyId ,secretAccessKey: conf.secretAccessKey}
      });

    const req:TranslateTextRequest = {
      Text: translateFromEn.text,
      SourceLanguageCode: "en",
      TargetLanguageCode: translateFromEn.targetLanguage
    };
  
    

    const resFinal: TranslateFromEnResponse = {
      target: translateFromEn.targetLanguage,
      source: 'EN',
      translatedText: (await cli.translateText(req)).TranslatedText,
      originalText: translateFromEn.text
    }

    return resFinal
  }



  async translateForm(req: TranslateFormDTO): Promise<TranslateFormDTO> {

    const res = await Promise.all(req.questionsAnswers.map(async (o: QuestionAnswersForm) => {

      const resQ = (await this.translateFromEn({text: o.question, targetLanguage: req.targetLanguage})).translatedText;
      await sleep(2000)
      const resA = await Promise.all(o.answers.map(async (a: string) => {
        await sleep(2000)
        return (await this.translateFromEn({text: a, targetLanguage: req.targetLanguage})).translatedText
      }));
      

      const resF: QuestionAnswersForm = {
        id: o.id,
        question: resQ,
        answers: resA
      }
      await sleep(1000)
      return resF
    }))

    return {
      targetLanguage: req.targetLanguage,
      questionsAnswers: res
    }

      

  }

}
