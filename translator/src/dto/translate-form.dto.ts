import {IsNotEmpty} from 'class-validator';
import {QuestionAnswersForm} from "../models/question-answers-form.model";

export class TranslateFormDTO {
    @IsNotEmpty()
    targetLanguage: string;

    @IsNotEmpty()
    questionsAnswers: QuestionAnswersForm[];
}