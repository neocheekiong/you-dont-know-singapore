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
     * @param {Function} questionMapAction
     * Perform this map action when the question is displayed. 
     * (Flying to question Coordinates etc)
     * @param {Function} questionMapMarker
     * create this marker on the questions' coordinates
     * @param {Number=1} score 
     * Total score to be given for this question
     */
  constructor (question, coordinates, answerOptions, questionMapAction, questionMapMarker, feedback, score = 1) {
    this.question = question;
    this.coordinates = coordinates ? [coordinates.latitude, coordinates.longitude] : null;
    this.options = answerOptions;
    this.score = score;
    this.questionMapAction = questionMapAction;
    this.questionMapMarker = questionMapMarker;
    this.feedback = feedback || {
      correct: `That's correct! The answer is ${this.options.find((answer)=>answer.fraction===1).answerDescription}.`,
      wrong: 'That\'s not right. You can try again later!'
    };
  }

  checkAnswer (answer) {
    let questionScore = this.options.reduce((score, answerOption) => {
      if (answer === answerOption.answerDescription) return score + this.score * answerOption.fraction;
      return score;
    }, 0);
    this.showFeedback(questionScore);
    return MapQuizApp.player.score + questionScore;
  }

  showFeedback (score) {
    score > 0 ? MapQuizAppView.renderFeedbackModal(this.feedback.correct) : MapQuizAppView.renderFeedbackModal(this.feedback.wrong);
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
  constructor (answerDescription, coordinates, answerMapMarker, fraction = 0) {
    this.text = answerDescription;
    this.coordinates = coordinates ? [coordinates.latitude, coordinates.longitude] : null;
    this.fraction = fraction;
    this.answerMapMarker = answerMapMarker || null;
  }
}

const questions = [{
  'question': 'Where were the first HDB flats located?',
  'answerOptions': [{
    'answerDescription': '45-48 Stirling Road',
    'coordinates': {
      'latitude': 1.2973869,
      'longitude': 103.8030340
    },
    'fraction': 1,
    answerMapMarker () {
      return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
    }
  },
                    {
                      'answerDescription': '1 Tiong Bahru',
                      'coordinates': {
                        'latitude': 1.2861369,
                        'longitude': 103.8330279
                      },
                      'fraction': 0,
                      answerMapMarker () {
                        return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                      }
                    },
                    {
                      'answerDescription': '1 Changi Village',
                      'coordinates': {
                        'latitude': 1.3885466,
                        'longitude': 103.9878045
                      },
                      'fraction': 0,
                      answerMapMarker () {
                        return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                      }                
                    },
                    {
                      'answerDescription': '1 Toa Payoh Lorong 7',
                      'coordinates': {
                        'latitude': 1.3394303,
                        'longitude': 103.8534428
                      },
                      'fraction': 0,
                      answerMapMarker () {
                        return L.marker([this.coordinates.latitude, this.coordinates.longitude]);
                      }
                    }
  ],
  feedback: {
    correct: 'Yes! Many of the first residents here moved in after the Great Fire of Bukit Ho Swee.',
    wrong: 'These are some of the oldest flats in Singapore. It\'s easy to get confused.'
  }
},
                   {
                     'question': 'From the map, you can see that there is an abandoned military facility here. What is its name?',
                     'coordinates': {
                       'latitude': 1.250405,
                       'longitude': 103.834869,
                     },
                     'answerOptions': [{
                       'answerDescription': 'Fort Serapong',
                       'fraction': 1
                     },
                                       {
                                         'answerDescription': 'Fort Woolwich',
                                         'fraction': 0
                                       },
                                       {
                                         'answerDescription': 'Fort Sentosa',
                                         'fraction': 0
                                       },
                                       {
                                         'answerDescription': 'Fort Belakang Mati',
                                         'fraction': 0
                                       }
                     ],
                     questionMapAction () {
                       map.flyTo(this.coordinates, MAX_ZOOM);
                     },
                     questionMapMarker () {
                       return L.circle(this.coordinates, {
                         radius: 200
                       });
                     },

                     feedback: {
                       correct: 'Yes! Fort Serapong is the camp here. It was said that Serapong was named after the dripping sounds that go pong-pong-pong.',
                       wrong: 'There is a golf course named after the hill this fort is on.'
                     }
                   },
                   {
                     'question': 'Here you can see that there is a high density of swimming pools within this red circle around Sentosa Cove. However, this is not the area with the highest density of swimming pools in Singapore. Which of the following areas have a higher density of swimming pools than Sentosa Cove? Click on the blue zones to find out.',
                     coordinates: {
                       latitude: 1.250237,
                       longitude: 103.845021
                     },
                     answerOptions: [{
                       answerDescription: 'Yarwood Avenue',
                       fraction: 0,
                       coordinates: {
                         latitude: 1.338829,
                         longitude: 103.783408
                       },
                       answerMapMarker () {
                         return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                           radius: 300,
                           color: 'blue',
                         }).on('click', function (event) {
                           map.flyTo(event.latlng, MAX_ZOOM);
                         });
                       },
                     },
                                     {
                                       answerDescription: 'Mount Echo Park',
                                       fraction: 1,
                                       coordinates: {
                                         latitude: 1.296144,
                                         longitude: 103.820367
                                       },
                                       answerMapMarker () {
                                         return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                                           radius: 300,
                                           color: 'blue',
                                         }).on('click', function (event) {
                                           map.flyTo(event.latlng, MAX_ZOOM);
                                         });
                                       },
                                     },
                                     {
                                       answerDescription: 'Nassim Road',
                                       fraction: 0,
                                       coordinates: {
                                         latitude: 1.310942,
                                         longitude: 103.820286
                                       },
                                       answerMapMarker () {
                                         return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                                           radius: 300,
                                           color: 'blue',
                                         }).on('click', function (event) {
                                           map.flyTo(event.latlng, MAX_ZOOM);
                                         });
                                       },
                                     },
                                     {
                                       answerDescription: 'Oxley Road',
                                       fraction: 0,
                                       coordinates: {
                                         latitude: 1.297957,
                                         longitude: 103.840764
                                       },
                                       answerMapMarker () {
                                         return L.circle([this.coordinates.latitude, this.coordinates.longitude], {
                                           radius: 300,
                                           color: 'blue',
                                         }).on('click', function (event) {
                                           map.flyTo(event.latlng, MAX_ZOOM);
                                         });
                                       },
                                     },
                     ],

                     questionMapMarker () {
                       return L.circle(this.coordinates, {
                         radius: 300,
                         color: 'red'
                       }).on('click', function (event) {
                         map.flyTo(event.latlng, MAX_ZOOM);
                       });
                     },

                     questionMapAction () {
                       map.flyTo(this.coordinates, MAX_ZOOM);
                       map.on('moveend', function flyAndReturn () {
                         setTimeout(function () {
                           map.flyTo([1.296769, 103.821970], 13);
                           map.on('moveend', function () {
                             map.off('moveend');
                           });
                         }, 1000);
                       });
                     },

                     feedback: {
                       correct: 'It is a testament of the wealth in Singapore that almost every house in this area has a swimming pool.',
                       wrong: 'That\'s not the right answer. Look carefully!'
                     }
                   },
                   {
                     question: 'At MacRitchie Reservoir Park, there is a grave and a memorial of a significant person. What did he do to deserve such a memorial?',
                     coordinates: {
                       latitude: 1.342139,
                       longitude: 103.830761
                     },
                     answerOptions: [{
                       answerDescription: 'He was responsible for building up the healthcare systems in Singapore',
                       fraction: 0
                     }, {
                       answerDescription: 'He was responsible for building trade relations between Singapore and China.',
                       fraction: 0
                     },
                                     {
                                       answerDescription: 'He was a war hero.',
                                       fraction: 1
                                     },
                                     {
                                       answerDescription: 'He was responsible for developing MacRitchie Reservoir',
                                       fraction: 0
                                     }
                     ],
                     questionMapAction () {
                       map.flyTo(this.coordinates, MAX_ZOOM);
                     },
                     questionMapMarker () {
                       return L.marker(this.coordinates);
                     },
                     feedback: {
                       correct: 'Lim Bo Seng was a leader of Force 136, part of the resistance movement during the Japanese Occupation. He was captured by the Japanese and tortured. He did not give in.',
                       wrong: 'Here\'s a clue: he\'s a person of strong will.'
                     }
                   },
                   {
                     question: 'Singapore is home to a number of quarries. What was mined from these quarries?',
                     answerOptions: [{
                       answerDescription: 'Marble',
                       fraction: 0,
                     },
                                     {
                                       answerDescription: 'Granite',
                                       fraction: 1,
                                     },
                                     {
                                       answerDescription: 'Clay',
                                       fraction: 0,
                                     },
                                     {
                                       answerDescription: 'Limestone',
                                       fraction: 0,
                                     }
                     ],

                     questionMapAction () {
                       const location1 = [1.410571, 103.953000];
                       const location2 = [1.353340, 103.773757];
                       const location3 = [1.355841, 103.754524];
                       // var funcs = [func1, func2, func3],
                       //     i = 0;

                       // function callFuncs() {
                       //     funcs[i++]();
                       //     if (i < funcs.length) setTimeout(callFuncs, 1000);
                       // }
                       // setTimeout(callFuncs, 1000);
            
                       map.flyTo(location1, 17);
                       map.on('moveend', function () {
                         setTimeout(function () {
                           map.flyTo(location2, 17);
                           map.on('moveend', function () {
                             map.off('moveend');
                             map.on('moveend', function () {
                               setTimeout(function () {
                                 map.flyTo(location3, 17);
                                 map.on('moveend', function () {
                                   map.off('moveend');
                                 });
                               }, 1000);
                             });
                           });
                         }, 1000);
                       });

                     },
                     feedback: {
                       correct: 'The most commonly rock available in Singapore is granite.',
                       wrong: 'Look up the geology of Singapore!'
                     }
                   }
];

// condom truck
// Type of Rock (),(1.353340, 103.773757),(1.355841, 103.754524)
// Istana Woodneuk
// highest artificial waterfall
