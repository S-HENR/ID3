import { IsNotEmpty } from "class-validator";

export class QuestionAnswersForm {
    id: string;

    @IsNotEmpty()
    question: string;

    
    answers: string[];

}