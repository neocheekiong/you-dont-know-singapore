/**
 * Questions must have the question text,
 * options, input type, total score,
 * feedback, occasionally coordinates.
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

    checkAnswer(answer) {
        let questionScore = this.options.reduce((score, answerOption) => {
            if (answer === answerOption.answerDescription) return score + this.score * answerOption.fraction;
            return score;
        }, 0);
        return MapQuizApp.player.score + questionScore;
    }
}

/**
 * Answers must have a description, occasionally coordinates, and fraction to denote score.
 */
class AnswerOption {
    /**
     * Constructs answers for questions.
     * @param {String} answerDescription 
     * @param {Object} coordinates 
     * @param {Number=0} fraction 
     */
    constructor(answerDescription, coordinates, fraction = 0) {
        this.text = answerDescription;
        this.coordinates = coordinates;
        this.fraction = fraction;
    }
}

questions = [{
        "question": "Where were the first HDB flats located?",
        "answerOptions": [{
                "answerDescription": "45-48 Stirling Road",
                "coordinates": {
                    "latitude": 1.2973869,
                    "longitude": 103.8030340
                },
                "fraction": 1
            },
            {
                "answerDescription": "1 Tiong Bahru",
                "coordinates": {
                    "latitude": 1.2861369,
                    "longitude": 103.8330279
                },
                "fraction": 0
            },
            {
                "answerDescription": "1 Changi Village",
                "coordinates": {
                    "latitude": 1.3885466,
                    "longitude": 103.9878045
                },
                "fraction": 0
            },
            {
                "answerDescription": "1 Toa Payoh Lorong 7",
                "coordinates": {
                    "latitude": 1.3394303,
                    "longitude": 103.8534428
                },
                "fraction": 0
            }
        ]
    },
    {
        "question": "From the map, you can see that there is an abandoned military facility here. What is its name?",
        "coordinates": {
            "latitude": 1.250405,
            "longitude": 103.834869,
        },
        "answerOptions": [{
                "answerDescription": "Fort Serapong",
                "fraction": 1
            },
            {
                "answerDescription": "Fort Woolwich",
                "fraction": 0
            },
            {
                "answerDescription": "Fort Sentosa",
                "fraction": 0
            },
            {
                "answerDescription": "Fort Belakang Mati",
                "fraction": 0
            }
        ]
    },
]

// Yarwood Avenue: 1.338829, 103.783408
// Mount Echo Park: 1.296144, 103.820367
// Nassim Road: 1.310942, 103.820286
// Oxley Road: 1.297957, 103.840764