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
     * @param {Function} questionMapAction
     * Perform this map action when the question is displayed. 
     * (Flying to question Coordinates etc)
     * @param {Function} questionMapMarker
     * create this marker on the questions' coordinates
     * @param {Number=1} score 
     * Total score to be given for this question
     */
    constructor(question, coordinates, answerOptions, questionMapAction, questionMapMarker, score = 1) {
        this.question = question;
        this.coordinates = coordinates ? [coordinates.latitude, coordinates.longitude] : null;
        this.options = answerOptions;
        this.score = score;
        this.questionMapAction = questionMapAction;
        this.questionMapMarker = questionMapMarker
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
    constructor(answerDescription, coordinates, answerMapMarker, fraction = 0) {
        this.text = answerDescription;
        this.coordinates = coordinates ? [coordinates.latitude, coordinates.longitude] : null;
        this.fraction = fraction;
        this.answerMapMarker = answerMapMarker || null;
    }
}

const questions = [{
        "question": "Where were the first HDB flats located?",
        "answerOptions": [{
                "answerDescription": "45-48 Stirling Road",
                "coordinates": {
                    "latitude": 1.2973869,
                    "longitude": 103.8030340
                },
                "fraction": 1,
                answerMapMarker() {
                    return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                }
            },
            {
                "answerDescription": "1 Tiong Bahru",
                "coordinates": {
                    "latitude": 1.2861369,
                    "longitude": 103.8330279
                },
                "fraction": 0,
                answerMapMarker() {
                    return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                }
            },
            {
                "answerDescription": "1 Changi Village",
                "coordinates": {
                    "latitude": 1.3885466,
                    "longitude": 103.9878045
                },
                "fraction": 0,
                answerMapMarker() {
                    return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                }
            },
            {
                "answerDescription": "1 Toa Payoh Lorong 7",
                "coordinates": {
                    "latitude": 1.3394303,
                    "longitude": 103.8534428
                },
                "fraction": 0,
                answerMapMarker() {
                    return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                }
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
        ],
        questionMapAction() {
            map.flyTo(this.coordinates, MAX_ZOOM);
        },
        questionMapMarker() {
            return L.circle(this.coordinates, {
                radius: 200
            })
        }
    },
    {
        "question": "Here you can see that there is a high density of swimming pools within this red circle around Sentosa Cove. However, this is not the area with the highest density of swimming pools in Singapore. Which of the following areas have a higher density of swimming pools than Sentosa Cove? Zoom out to see the other candidates.",
        coordinates: {
            latitude: 1.250237,
            longitude: 103.845021
        },
        answerOptions: [{
                answerDescription: "Yarwood Avenue",
                coordinates: {
                    latitude: 1.338829,
                    longitude: 103.783408
                },
                answerMapMarker() {
                    return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                        radius: 300,
                        color: "blue",
                    });
                },
            },
            {
                answerDescription: "Mount Echo Park",
                coordinates: {
                    latitude: 1.296144,
                    longitude: 103.820367
                },
                answerMapMarker() {
                    return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                        radius: 300,
                        color: "blue",
                    });
                },
            },
            {
                answerDescription: "Nassim Road",
                coordinates: {
                    latitude: 1.310942,
                    longitude: 103.820286
                },
                answerMapMarker() {
                    return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                        radius: 300,
                        color: "blue",
                    });
                },
            },
            {
                answerDescription: "Oxley Road",
                coordinates: {
                    latitude: 1.297957,
                    longitude: 103.840764
                },
                answerMapMarker() {
                    return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                        radius: 300,
                        color: "blue",
                    });
                },
            },
        ],

        questionMapMarker() {
            return L.circle(this.coordinates, {
                radius: 300,
                color: "red"
            }).on('click', function () { 
                map.flyTo(this.coordinates, MAX_ZOOM);
             })
        },
        
        questionMapAction() {
            map.flyTo([center.x,center.y], 13);
        },
    }
]

// condom truck
// Lim Bo Seng
// Type of Rock
