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
            MapQuizApp.questions.push(new Question(question.question, question.coordinates, question.answerOptions, question.mapAction))
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

    createLabel(value) {
        return $('<label>').attr({
            for: value
        }).text(value)
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
                let coordinates = [currentQuestion.coordinates.latitude, currentQuestion.coordinates.longitude];
                let marker = L.circle(coordinates,{radius: 200});
                this.currentLayers.push(marker);
                marker.addTo(map);
                currentQuestion.mapAction.function(coordinates, currentQuestion.mapAction.zoom);
            }
        }

    },

    renderAnswers() {
        const $answerContainer = $('#answers');
        const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
        currentQuestion.options.forEach((answerOption) => {
            if (answerOption.coordinates) {
                let marker = L.marker([answerOption.coordinates.latitude, answerOption.coordinates.longitude]);
                this.currentLayers.push(marker);
                marker.addTo(map);
            }
            const answerDescription = answerOption.answerDescription
            const $answer = MapQuizAppView.createRadioButton(answerDescription);
            const $label = MapQuizAppView.createLabel(answerDescription)
            $answerContainer.append($answer, $label);
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
    }
}

$(function () {
    MapQuizApp.getQuestions(questions);
    MapQuizAppView.renderCurrentQuestion();
});
