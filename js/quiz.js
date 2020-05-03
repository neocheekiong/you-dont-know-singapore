const DEFAULT_NUMBER = 0;

const MapQuizApp = {
    questions: [],
    selectedAnswers: [],
    player: {
        name: "Player",
        score: DEFAULT_NUMBER,
        currentQuestion: DEFAULT_NUMBER,
    },

    getQuestions(questions) {
        questions.forEach(question => {
            MapQuizApp.questions.push(new Question(question.question, question.coordinates, question.answerOptions, question.questionMapAction, question.questionMapMarker))
        });
    },
}

const MapQuizAppView = {
    currentLayers: [],
    createRadioButton(value) {
        return $('<input>').attr({
            type: 'radio',
            name: 'answer',
            value: value
        })
    },

    createSpan(value) {
        return $('<span>').text(value)
    },

    renderSubmitButton() {
        return $('<button>').text('Submit').on('click', MapQuizAppController.submitAnswer)
    },

    renderCurrentQuestion() {
        const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
        if (currentQuestion) {
            $('#questions').append($('<span>').text(currentQuestion.question))
            this.renderAnswers();
            $('#answers').append(this.renderSubmitButton());
            if (currentQuestion.coordinates) {
                let marker = currentQuestion.questionMapMarker();
                this.currentLayers.push(marker);
                marker.addTo(map);
                currentQuestion.questionMapAction();
            }
        }

    },

    renderAnswers() {
        const $answerContainer = $('#answers');
        const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
        currentQuestion.options.forEach((answerOption) => {
            if (answerOption.coordinates) {
                let marker = answerOption.answerMapMarker();
                marker.bindPopup(answerOption.answerDescription)
                this.currentLayers.push(marker);
                marker.addTo(map);
            }
            const answerDescription = answerOption.answerDescription;
            const $container = $("<p>");
            const $label = $("<label>");
            const $answer = MapQuizAppView.createRadioButton(answerDescription);
            const $span = MapQuizAppView.createSpan(answerDescription);
            $label.append($answer, $span);
            $container.append($label);
            $answerContainer.append($container);
        })
    },

    clearPanel() {
        $('#questions').empty();
        $('#answers').empty();
        this.currentLayers.forEach((marker) => {
            marker.remove()
        })
    },

    endQuiz() {
        const $closingModalHeader = $('<h2>').text("Congratulations! You've finished the quiz");
        const $closingModalContent = $('<p>').text(`You Scored ${MapQuizApp.player.score} out of ${MapQuizApp.questions.length}!`);
        const $closingModalButton = $('<button>').text('Restart?').addClass('waves-effect waves-light btn').on('click', MapQuizAppController.restart);
        const $closingModalContentContainer = $('<div>').addClass('modal-content').append($closingModalHeader, $closingModalContent, $closingModalButton);
        const $closingModal = $('<div>').addClass('modal').attr("id","closing-modal").append($closingModalContentContainer);
        
        $('body').prepend($closingModal);
        $closingModal.toggle();

    }
}

const MapQuizAppController = {
    getAnswer() {
        return $('input:radio[name=answer]:checked').val();
    },

    submitAnswer() {
        const submittedAnswer = MapQuizAppController.getAnswer();
        MapQuizApp.player.score = MapQuizApp.questions[MapQuizApp.player.currentQuestion].checkAnswer(submittedAnswer);
        MapQuizAppController.nextQuestion();
    },

    nextQuestion() {
        MapQuizApp.player.currentQuestion++;
        MapQuizAppView.clearPanel();
        MapQuizAppView.renderCurrentQuestion();
        MapQuizApp.player.currentQuestion >= MapQuizApp.questions.length && MapQuizAppView.endQuiz()
    },

    start() {
        MapQuizApp.getQuestions(questions);
        MapQuizApp.player.name = $('#enter-name').val();
        MapQuizAppView.renderCurrentQuestion();
        $('#opening-modal').remove();
    },

    restart() {
        MapQuizApp.player.score = DEFAULT_NUMBER;
        MapQuizApp.player.currentQuestion = DEFAULT_NUMBER;
        MapQuizApp.questions = [];
        $('#closing-modal').remove();
        MapQuizApp.getQuestions(questions);
        MapQuizAppView.renderCurrentQuestion();
    }
}

$(function () {
    $('#opening-modal').toggle();
    $('#start-button').on('click', MapQuizAppController.start);
});