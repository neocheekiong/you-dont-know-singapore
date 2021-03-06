const DEFAULT_NUMBER = 0;

const MaterializeClasses = {
  closingModalButton: 'waves-effect waves-light btn cyan accent-3',
  submitButton: 'waves-effect waves-light btn deep-orange',
  feedbackModalButton: 'waves-effect waves-light btn red',
};

const MapQuizApp = {
  questions: [],
  selectedAnswers: [],
  player: {
    name: 'Player',
    score: DEFAULT_NUMBER,
    currentQuestion: DEFAULT_NUMBER,
  },

  getQuestions (questions) {
    questions.forEach(question => {
      MapQuizApp.questions.push(new Question(
        question.question,
        question.coordinates,
        question.answerOptions,
        question.questionMapAction,
        question.questionMapMarker,
        question.feedback));
    });
  },
};

const MapQuizAppView = {
  currentLayers: [],

  createRadioButton (value) {
    return $('<input>').attr({
      type: 'radio',
      name: 'answer',
      value: value
    });
  },

  createSpan (value) {
    return $('<span>').text(value);
  },

  renderSubmitButton () {
    return $('<button>').text('Submit')
      .on('click', MapQuizAppController.submitAnswer)
      .addClass(MaterializeClasses.submitButton);
  },

  renderCurrentQuestion () {
    const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
    if (currentQuestion) {
      $('#questions').append($('<h5>').text(currentQuestion.question));
      this.renderAnswers();
      $('#answers').append(this.renderSubmitButton());
      if (currentQuestion.coordinates) {
        let marker = currentQuestion.questionMapMarker();
        this.currentLayers.push(marker);
        marker.addTo(map);
      }
      currentQuestion.questionMapAction && currentQuestion.questionMapAction();
    }
  },

  renderAnswers () {
    const $answerContainer = $('#answers');
    const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
    currentQuestion.options.forEach((answerOption) => {
      if (answerOption.coordinates) {
        let marker = answerOption.answerMapMarker();
        marker.bindPopup(answerOption.answerDescription);
        this.currentLayers.push(marker);
        marker.addTo(map);
      }
      const answerDescription = answerOption.answerDescription;
      const $container = $('<p>');
      const $label = $('<label>');
      const $answer = MapQuizAppView.createRadioButton(answerDescription);
      const $span = MapQuizAppView.createSpan(answerDescription);
      $label.append($answer, $span);
      $container.append($label);
      $answerContainer.append($container);
    });
  },

  renderFeedbackModal (text) {
    console.log(text);
    const $feedbackModalContent = $('<p>').text(text);
    const $feedbackModalButton = $('<button>').text('Next Question')
      .addClass(MaterializeClasses.feedbackModalButton)
      .on('click', MapQuizAppController.nextQuestion);
    const $feedbackModalContentContainer = $('<div>').addClass('modal-content')
      .append(
        $feedbackModalContent,
        $feedbackModalButton
      );
    const $feedbackModal = $('<div>')
      .addClass('modal')
      .attr('id', 'feedback-modal')
      .append($feedbackModalContentContainer);
    $('body').prepend($feedbackModal);
    $feedbackModal.toggle();
  },

  clearPanel () {
    $('#questions').empty();
    $('#answers').empty();
    this.currentLayers.forEach((marker) => {
      marker.remove();
    });
    $('#feedback-modal').remove();
  },

  renderClosingModal () {
    const $closingModalHeader = $('<h2>').text(`Congratulations ${MapQuizApp.player.name}! You've finished the quiz`);
    const $closingModalContent = $('<p>').text(`You Scored ${MapQuizApp.player.score} out of ${MapQuizApp.questions.length}!`);
    const $closingModalButton = $('<button>').text('Restart?')
      .addClass(MaterializeClasses.closingModalButton)
      .on('click', MapQuizAppController.restartQuiz);
    const $closingModalContentContainer = $('<div>').addClass('modal-content')
      .append(
        $closingModalHeader,
        $closingModalContent,
        $closingModalButton
      );
    const $closingModal = $('<div>')
      .addClass('modal')
      .attr('id', 'closing-modal')
      .append($closingModalContentContainer);
    $('body').prepend($closingModal);
    $closingModal.toggle();
  },
};

const MapQuizAppController = {

  startQuiz () {
    MapQuizApp.getQuestions(questions);
    MapQuizApp.player.name = $('#enter-name').val();
    MapQuizAppView.renderCurrentQuestion();
    $('#opening-modal').remove();
  },

  getAnswer () {
    return $('input:radio[name=answer]:checked').val();
  },

  submitAnswer () {
    const submittedAnswer = MapQuizAppController.getAnswer();
    MapQuizApp.player.score = MapQuizApp.questions[MapQuizApp.player.currentQuestion].checkAnswer(submittedAnswer);
  },

  nextQuestion () {
    MapQuizApp.player.currentQuestion++;
    MapQuizAppView.clearPanel();
    MapQuizAppView.renderCurrentQuestion();
    MapQuizApp.player.currentQuestion >= MapQuizApp.questions.length && MapQuizAppController.endQuiz();
  },

  endQuiz () {
    MapQuizAppView.renderClosingModal();
  },

  restartQuiz () {
    MapQuizApp.player.score = DEFAULT_NUMBER;
    MapQuizApp.player.currentQuestion = DEFAULT_NUMBER;
    MapQuizApp.questions = [];
    $('#closing-modal').remove();
    MapQuizApp.getQuestions(questions);
    MapQuizAppView.renderCurrentQuestion();
  }
};

$(function () {
  $('#opening-modal').toggle();
  $('#start-button').on('click', MapQuizAppController.startQuiz);
});
