/**
 * Questions must have the question text,
 * options, input type, total score,
 * feedback.
 */
class Question {
    /**
     * Constructs questions to ask the quiz-taker
     * 
     * @param {String} question 
     * What you are asking the quiz-taker
     * @param {Array<AnswerOption>} answerOptions 
     * Array of options you're giving the quiz-taker
     * @param {Object} feedback 
     * An object with what to say when quiz-taker is correct or wrong
     * @param {Number=1} score 
     * Total score to be given for this question
     */
    constructor(question, coordinates, answerOptions, score = 1) {
        this.question = question;
        this.coordinates = coordinates
        this.options = answerOptions;
        this.score = score;
        this.feedback = {
            correct: `That's correct! The answer is ${this.options.find((answer)=>answer.fraction===1)}`
        };
    }
    checkAnswer (answer) {
        let questionScore = this.options.reduce((score, answerOption)=>{
            console.log(`score:${score}`)
            console.log(answerOption)
            if(answer === answerOption.answerDescription) return score + this.score * answerOption.fraction;
            return score;
        }, 0);
        console.log(questionScore)
        return mapQuizApp.player.score + questionScore;
    }
}

class AnswerOption {
    /**
     * Constructs answers for questions.
     * @param {String} answerDescription 
     * @param {Object} coordinates 
     * @param {Number=0} fraction 
     */
    constructor(answerDescription, coordinates, fraction=0) {
        this.text = answerDescription;
        this.coordinates = coordinates;
        this.fraction = fraction;
    }
}

const mapQuizApp = {
    questions: [],
    selectedAnswers: [],
    player: {
        name: "Player",
        score: 0,
        currentQuestion: 0,
    },
    
    getQuestions (questions) {
        questions.forEach(question => {
            mapQuizApp.questions.push(new Question(question.question,question.coordinates, question.answerOptions))
        });
    },

    renderCurrentQuestion(){
        const currentQuestion = this.questions[this.player.currentQuestion];
        $('#questions').text(currentQuestion.question)
        this.renderAnswers();
        $('#panel').append(this.renderSubmitButton());
    },

    renderAnswers(){
        const $answerContainer = $('#answers');
        const currentQuestion = this.questions[this.player.currentQuestion];
        currentQuestion.options.forEach((answerOption)=>{
            if(answerOption.coordinates){
                L.marker([answerOption.coordinates.latitude, answerOption.coordinates.longitude]).addTo(map);
            }
            const answerDescription = answerOption.answerDescription
            const $answer = createRadioButton(answerDescription);
            const $label = createLabel(answerDescription)
            $answerContainer.append($answer, $label);
        })
    },

    renderSubmitButton(){
        return $('<button>').text('Submit').on('click', ()=>{
            const submittedAnswer = getAnswer();
            console.log(submittedAnswer);
            mapQuizApp.player.score = mapQuizApp.questions[mapQuizApp.player.currentQuestion].checkAnswer(submittedAnswer);  
        })
    }

}

function createRadioButton(value) {
    return $('<input>').attr({
        type: 'radio',
        name: 'answer',
        value: value
    })
}

function createLabel(value) {
    return $('<label>').attr({
        for: value
    }).text(value)
}

function getAnswer() {
    return $('input:radio[name=answer]:checked').val();
}

$(function () {
    mapQuizApp.getQuestions(questions);
    mapQuizApp.renderCurrentQuestion();
});