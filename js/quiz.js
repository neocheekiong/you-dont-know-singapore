

const MapQuizApp = {
    questions: [],
    selectedAnswers: [],
    player: {
        name: "Player",
        score: 0,
        currentQuestion: 0,
    },

    getQuestions(questions) {
        questions.forEach(question => {
            MapQuizApp.questions.push(new Question(question.question, question.coordinates, question.answerOptions))
        });
    },
}

const MapQuizAppView = {
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
        $('#questions').append($('<span>').text(currentQuestion.question))
        this.renderAnswers();
        $('#answers').append(this.renderSubmitButton());
    },

    renderAnswers() {
        const $answerContainer = $('#answers');
        const currentQuestion = MapQuizApp.questions[MapQuizApp.player.currentQuestion];
        currentQuestion.options.forEach((answerOption) => {
            if (answerOption.coordinates) {
                L.marker([answerOption.coordinates.latitude, answerOption.coordinates.longitude]).addTo(map);
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

    nextQuestion(){
        MapQuizApp.player.currentQuestion++;
        MapQuizAppView.clearPanel();
        MapQuizAppView.renderCurrentQuestion();
    }
}

$(function () {
    MapQuizApp.getQuestions(questions);
    MapQuizAppView.renderCurrentQuestion();
});