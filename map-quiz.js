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
     * @param {Array} options 
     * Array of options you're giving the quiz-taker
     * @param {Object} feedback 
     * An object with what to say when quiz-taker is correct or wrong
     * @param {Number} score 
     * Total score to be given for this question
     */
    constructor(question, options, inputType, feedback, score = 1) {
        this.question = question;
        this.options = options;
        this.feedback = feedback;
        this.score = score;
    }
    answerQuestion (answer) {
        let questionScore = this.options.reduce((score, option)=>{
            if(answer === option.text) return score + this.score * option.fraction;
        }, 0);
        quizTaker.score += questionScore;
    }
}

class Option {
    /**
     * 
     * @param {String} text 
     * @param {Geolocation Object} coordinates 
     * @param {Number} fraction 
     */
    constructor(text, coordinates, fraction) {
        this.text = text;
        this.coordinates = coordinates;
        this.fraction = fraction;
    }
}

const mapQuizApp = {
    map:'',
    player
}
