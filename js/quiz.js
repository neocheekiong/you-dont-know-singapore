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
    constructor(question, answerOptions, feedback, score = 1) {
        this.question = question;
        this.options = answerOptions;
        this.feedback = feedback;
        this.score = score;
    }
    checkAnswer (answer) {
        let questionScore = this.options.reduce((score, option)=>{
            if(answer === option.text) return score + this.score * option.fraction;
        }, 0);
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
    player: {
        name: 'You',
        score: 0,
    },
    questions: [],
    selectedAnswers: [],
}
