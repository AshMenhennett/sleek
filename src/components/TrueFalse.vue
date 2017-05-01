<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div class="true-false">
          <a href="#" @click.prevent="leave" class="left btn-large waves-effect waves-light blue-grey lighten-1 left">Leave</a>
          <a href="#" @click.prevent="addQuestion" class="btn-large waves-effect waves-light blue-grey right">Add Question</a>
          <div style="clear:both"></div>
          <h3 class="center-align" style="margin-top: 50px">True False Learning Object Generator</h3>
          <div class="center-align mar-top">
            <a v-if="! questions.length" href="#" class="btn-large waves-effect waves-light blue" @click.prevent="addQuestion">Create a True or False question <i class="right material-icons">add</i></a>
          </div>
          <form>
            <template v-if="questions.length">
              <label>Enter Title
                  <input v-model="title" type="text" placeholder="Title goes here">
              </label>
            </template>

            <div v-for="(question, index) in questions" class="section question-row" :key="question.id">
              <p class="center-align"><a href="#" @click.prevent="deleteQuestion(index)" class="waves-effect waves-light btn-flat">Remove</a></p>
              <h4 class="center-align">Question {{ index+1 }}</h4>

              <div class="question-input">
                <p class="center-align">
                  <a @click.prevent="boldText(index)" class="waves-effect waves-light btn-flat sm-rt-pad"><i class="material-icons">format_bold</i></a>
                  <a @click.prevent="italicizeText(index)" class="waves-effect waves-light btn-flat sm-rt-pad"><i class="material-icons">format_italic</i></a>
                  <a @click.prevent="underlineText(index)" class="waves-effect waves-light btn-flat sm-rt-pad"><i class="material-icons">format_underline</i></a>
                </p>
                <label>Enter Question
                  <textarea :id="'question' + index" class="materialize-textarea" v-model="question.question"></textarea>
                </label>
                <p class="text-mute">Highlight text that you want to modify and click the respective text modifier button above.</p>
              </div>

              <label>Select an Answer
                <select v-model="question.answer">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </label>
              <br>

              <label>Explanation for correct answer
                <input v-model="question.correctExplanation" type="text" placeholder="Explanation to correct answer">
              </label>
              <label>Explanation for incorrect answer
                <input v-model="question.incorrectExplanation" type="text" placeholder="Explanation to incorrect answer">
              </label>
            </div>

            <a href="#" @click.prevent="addQuestion" class="btn-large mar-top btn-block waves-effect waves-light blue-grey">Add Question</a>

            <div class="center-align mar-top">
              <a @click.prevent="createLearningObject" v-if="questions.length" class="waves-effect waves-light btn-large blue">Generate True or False Learning Object <i class="right material-icons">cloud_download</i></a>
            </div>
          </form>

          <div v-if="output" class="center-align lg-mar-top">
            <h5>Your Freshly Baked Learning Object</h5>
            <a data-clipboard-action="copy" data-clipboard-target="#output" v-if="questions.length" class="btn-copy waves-effect waves-light btn-large teal lighten-2">Copy to clipboard <i class="right material-icons">content_copy</i></a>
            <textarea class="materialize-textarea lg dark" rows="40" id="output" :autofocus="autofocusOutput" v-model="output"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrueFalse',
  data () {
    return {
      id: 1,
      title: 'My True or False Object',
      questions: [
        {id: 1, question: '', answer: 'true', hasExplanations: false, correctExplanation: '', incorrectExplanation: '', answeredCorrectly: null}
      ],
      output: '',
      autofocusOutput: false
    }
  },
  methods: {
    boldText(index) {
      $("textarea#question" + index).selection('insert', {text: '<strong>', mode: 'before'});
      $("textarea#question" + index).selection('insert', {text: '</strong>', mode: 'after'});
      this.questions[index].question = $("textarea#question" + index).val();
    },
    italicizeText(index) {
      $("textarea#question" + index).selection('insert', {text: '<em>', mode: 'before'});
      $("textarea#question" + index).selection('insert', {text: '</em>', mode: 'after'});
      this.questions[index].question = $("textarea#question" + index).val();
    },
    underlineText(index) {
      $("textarea#question" + index).selection('insert', {text: '<u>', mode: 'before'});
      $("textarea#question" + index).selection('insert', {text: '</u>', mode: 'after'});
      this.questions[index].question = $("textarea#question" + index).val();
    },
    addQuestion() {
      this.nextId();
      this.questions.push({id: 1, question: '', answer: 'true', hasExplanations: false, correctExplanation: '', incorrectExplanation: '', answeredCorrectly: null});
    },
    deleteQuestion(index) {
      return this.questions.splice(index, 1);
    },
    nextId() {
      this.id++;
    },
    createLearningObject() {
      for (var i = 0; i < this.questions.length; i++) {
        if (this.questions[i].correctExplanation != '') {
          this.questions[i].hasExplanations = true;
        }
      }

      var HTML =        `<script type="text/javascript">`;
                        HTML += `var questions = [`;
                        for (var i = 0; i < this.questions.length; i++) {
                          HTML += `{question: "` + this.questions[i].question + `", answer: ` + this.questions[i].answer + `, hasExplanations: ` + this.questions[i].hasExplanations + `, correctExplanation: "` + this.questions[i].correctExplanation + `", incorrectExplanation: "` + this.questions[i].incorrectExplanation + `"}`;
                          if (i < (this.questions.length-1)) {
                            HTML += `,`;
                          }
                        }
                        HTML += `];`;

                        HTML += `$(document).ready(function (){var questionElements=$('.trueFalse .question'); var answerElements=$('.trueFalse .answer'); var explanationElements=$('.trueFalse .explanation'); var trueButtonElements=$('.trueFalse .button.true'); var falseButtonElements=$('.trueFalse .button.false'); for (var i=0; i < questionElements.length; i++){questionElements.eq(i).attr('data-index', i); answerElements.eq(i).attr('data-index', i); explanationElements.eq(i).attr('data-index', i); trueButtonElements.eq(i).attr('data-index', i); falseButtonElements.eq(i).attr('data-index', i); questionElements.eq(i).text(questions[i].question);}$('.trueFalse .button').on('click', function (){var btnClass=$(this).attr('class'); var index=$(this).attr('data-index'); trueButtonElements.eq(index).attr('data-disabled', false); falseButtonElements.eq(index).attr('data-disabled', false); if (btnClass.indexOf('true') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){answerElements.eq(index).text('You are correct! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}}else{answerElements.eq(index).text('You are incorrect! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}}}else if (btnClass.indexOf('false') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){answerElements.eq(index).text('You are incorrect! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}}else{answerElements.eq(index).text('You are correct! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}}}}); $('.trueFalse .reset').on('click', function (){for (var i=0; i < answerElements.length; i++){answerElements.eq(i).text(''); answerElements.eq(i).css('display', 'none'); explanationElements.eq(i).text(''); explanationElements.eq(i).css('display', 'none');}});});` +
                        `<\/script>` +
                        `<div class="trueFalse" style="width: 100%; max-width: 1200px; margin: 0 auto; background: #ecf0f1;"><div class="container" style="width: 100%; box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana;"><div class="row" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"><div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><h1 style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana;">`+ this.title +`</h1></div></div>`;
                        for (var i = 0; i < this.questions.length; i++) {
                          HTML += `<div class="row" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="question" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; color: #525151; display: block; margin-top: 30px; border-top: 2px solid #ddd; text-align: center; padding: 24px; line-height: 24px; font-size: 24px; background: #fefefe; border-left: 10px solid #ddd;"></span> <span class="answer" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 12px; color: #fff; letter-spacing: 2px; font-size: 18px;"></span> <span class="explanation" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 12px; letter-spacing: 2px; font-size: 18px; color: #fff;"></span> </div></div><div class="row" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><span class="button true float-left" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: left; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">T</span> &nbsp; <span class="button false float-right" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: right; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">F</span></div></div>`;
                        }
                        HTML+= `<div class="row" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="button reset" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; border: 1px solid rgba(155, 89, 182, 1); display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; font-size: 24px; text-align: center; background: rgba(155, 89, 182, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(155, 89, 182, 1); margin-top: 40px; font-weight: bolder;">RESET</span> </div></div></div></div>`;

      this.autofocusOutput = true;
      this.output = HTML;
    },
    leave() {
      this.$emit('changeType', 'Landing');
    }
  },
  mounted() {
    var clipboard = new Clipboard('.btn-copy');
  }
}
</script>

<style type="text/css" scoped>
  .question-input textarea {
    margin: 0;
  }
  .question-input p {
    margin: 0px 0px 25px 0px !important;
  }
  .text-modifier {
    background: #ddd;
    color: #525151;
    padding: 8px;
    margin: 1px;
    border-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    text-decoration: underline;
  }
  label {
    color: #000;
    font-size: 1.2rem;
  }
  select {
    display: block;
  }
  textarea.materialize-textarea {
    resize: vertical;
    transition: none;
    overflow: scroll;
  }
  textarea.materialize-textarea.lg {
    padding: 15px;
    margin-top: 25px;
    resize: vertical;
    min-height: 16rem;
  }
  textarea.materialize-textarea.dark {
    background: #eee;
  }
</style>
<style type="text/css">
  h3, h4 {
    font-weight: 100;
  }
  .btn-flat {
    border: 1px solid #ddd;
  }
  .lg-mar-top {
    margin-top: 45px;
  }
  .mar-top {
    margin-top: 25px;
  }
  .sm-rt-pad {
    padding: 0 8px;
  }
  .text-mute {
    color: #ababab;
  }
  .btn-block {
    display: block;
  }
</style>
