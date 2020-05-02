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
        return $('<button>').text('Submit').on('click', mapQuizAppController.submitAnswer)
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
    }
}

const mapQuizAppController = {
    getAnswer() {
        return $('input:radio[name=answer]:checked').val();
    },

    submitAnswer() {
        const submittedAnswer = mapQuizAppController.getAnswer();
        MapQuizApp.player.score = MapQuizApp.questions[MapQuizApp.player.currentQuestion].checkAnswer(submittedAnswer);
        mapQuizAppController.nextQuestion();
    },

    nextQuestion() {
        MapQuizApp.player.currentQuestion++;
        MapQuizAppView.clearPanel();
        MapQuizAppView.renderCurrentQuestion();
    },

    start() {
        MapQuizApp.player.name = $('#enter-name').val();
        MapQuizAppView.renderCurrentQuestion();
        $('#opening-modal').toggle();
    }
}

$(function () {
    MapQuizApp.getQuestions(questions);
    $('#opening-modal').toggle();
    $('#start-button').on('click', mapQuizAppController.start);
});