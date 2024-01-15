import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import quiz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})

export class QuizComponent {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[]      = []
  answerSelected:string = ""

  questionIndex:number    = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  result:string = ""

  constructor(){}

  ngOnInit(): void{
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex ++
    if (this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      } else{
        return current
      }
    })
    return result
  }
}
