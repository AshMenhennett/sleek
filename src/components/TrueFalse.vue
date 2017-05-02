<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div class="true-false">
          <a href="#" @click.prevent="leave" class="left btn-large waves-effect waves-light teal lighten-2 left">Back</a>
          <a href="#" @click.prevent="addQuestion" class="btn-large waves-effect waves-light teal lighten-2 right">Add Question <i class="right material-icons">add</i></a>
          <div style="clear:both"></div>
          <h3 class="center-align" style="margin-top: 50px">True False Learning Object Generator</h3>
          <p class="center-align"><a href="#modalToEdit" class="waves-effect waves-light btn-flat">Edit Existing Object</a></p>

          <div id="modalToEdit" class="modal">
            <div class="modal-content">
              <h4>Load up an existing Object</h4>
              <textarea v-model="objectToEditInput" class="materialize-textarea lg" rows="40" autofocus="true"></textarea>
              <p class="text-mute">Paste in your existing True False learning object. Pressing Upload will append the questions being edited to any existing questions in this session.</p>
            </div>
            <div class="modal-footer">
              <p class="center-align">
                <a href="#" class="modal-close waves-effect waves-light btn-large grey lighten-1">Cancel</a>
                <a href="#" @click.prevent="populateQuestions" class="modal-close waves-effect waves-light btn-large blue">Upload <i class="right material-icons">cloud_upload</i></a>
              </p>
            </div>
          </div>

          <div v-if="error.objectToEditInput" class="card red darken-1 center-align-margin">
            <div class="card-content white-text">
              <span class="card-title">Whoops!</span>
              <p>The existing Learning Object that you uploaded was not valid.</p>
              <p>Did you only partially copy the code? or maybe you edited the code?</p>
              <p>You may want to manually recreate this obeject.</p>
              <p>However, in future, make sure you don't edit the code and that you copy the object in it's entirety.</p>
            </div>
          </div>

          <form>
            <p class="center-align mar-top" v-if="questions.length">
              <input v-model="jQueryAlreadyAvailable" id="jquery" type="checkbox">
              <label for="jquery">Is jQuery already included in your environment?</label>
              <p class="text-mute center-align" v-if="questions.length">If you are using LibGuides, leave this checked. If not, find out from your IT team.</p>
            </p>

            <template v-if="questions.length">
              <label>Enter Title
                  <input v-model="title" type="text" placeholder="Title goes here">
              </label>
            </template>

            <div v-for="(question, index) in questions" class="section question-row" :key="question.id">
              <h4 class="center-align">Question {{ index+1 }}</h4>
              <p class="center-align"><a href="#" @click.prevent="deleteQuestion(index)" class="waves-effect waves-light btn-flat">Remove</a></p>

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

            <a href="#" @click.prevent="addQuestion" class="btn-large lg-mar-top btn-block waves-effect waves-light teal lighten-2">Add Question <i class="right material-icons">add</i></a>

            <div class="center-align lg-mar-top">
              <a @click.prevent="createLearningObject" v-if="questions.length" class="waves-effect waves-light btn-large blue">Generate True or False Learning Object <i class="right material-icons">cloud_download</i></a>
            </div>
          </form>

          <div v-if="output" class="center-align lg-mar-top">
            <h5>Your Freshly Baked Learning Object</h5>
            <a data-clipboard-action="copy" data-clipboard-target="#output" v-if="questions.length" class="btn-copy waves-effect waves-light btn-large purple darken-1">Copy to clipboard <i class="right material-icons">content_copy</i></a>
            <textarea class="materialize-textarea lg dark" rows="40" id="output" :autofocus="autofocusOutput" v-model="output"></textarea>
            <p class="text-mute">Simply copy the above code and paste it into a LibGuide or CMS page.</p>
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
      // whether or not jQuery is already available in the CMS.
      // Meaning we don't have to include it into the object
      jQueryAlreadyAvailable: true,
      questions: [
        {id: 1, question: '', answer: 'true', hasExplanations: false, correctExplanation: '', incorrectExplanation: '', answeredCorrectly: null}
      ],
      output: '',
      autofocusOutput: false,

      // used for loading up an existing object
      objectToEditInput: '',
      error: {
        objectToEditInput: false
      }
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
      // clear errors
      this.error.objectToEditInput = false;

      this.nextId();
      this.questions.push({id: 1, question: '', answer: 'true', hasExplanations: false, correctExplanation: '', incorrectExplanation: '', answeredCorrectly: null});
    },
    deleteQuestion(index) {
      // clear errors
      this.error.objectToEditInput = false;

      return this.questions.splice(index, 1);
    },
    nextId() {
      this.id++;
    },
    createLearningObject() {
      // clear errors
      this.error.objectToEditInput = false;

      for (var i = 0; i < this.questions.length; i++) {
        if (this.questions[i].correctExplanation != '') {
          this.questions[i].hasExplanations = true;
        }
      }

      var HTML = '';

      if (! this.jQueryAlreadyAvailable) {
        HTML += `<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"><\/script>`;
      }

      HTML += `<script type="text/javascript">`;
                HTML += `var questions = [`;
                for (var i = 0; i < this.questions.length; i++) {
                  HTML += `{question: "` + this.questions[i].question + `", answer: ` + this.questions[i].answer + `, hasExplanations: ` + this.questions[i].hasExplanations + `, correctExplanation: "` + this.questions[i].correctExplanation + `", incorrectExplanation: "` + this.questions[i].incorrectExplanation + `", answeredCorrectly: ` + this.questions[i].answeredCorrectly + `}`;
                  if (i < (this.questions.length-1)) {
                    HTML += `,`;
                  }
                }
                HTML += `];`;
                HTML += `var allAnswered=function (){var counter=0; for (var i=0; i < questions.length; i++){if (questions[i].answeredCorrectly !=null){counter++;}}if (counter==questions.length){return true;}return false;}; var getCorrectAnswersPercentage=function (){var counter=0; for (var i=0; i < questions.length; i++){if (questions[i].answeredCorrectly){counter++;}}return (counter / questions.length) * 100;};`;
                HTML += `$(document).ready(function (){var questionElements=$('.trueFalse .question'); var answerElements=$('.trueFalse .answer'); var explanationElements=$('.trueFalse .explanation'); var trueButtonElements=$('.trueFalse .button.true'); var falseButtonElements=$('.trueFalse .button.false'); for (var i=0; i < questionElements.length; i++){questionElements.eq(i).attr('data-index', i); answerElements.eq(i).attr('data-index', i); explanationElements.eq(i).attr('data-index', i); trueButtonElements.eq(i).attr('data-index', i); falseButtonElements.eq(i).attr('data-index', i); questionElements.eq(i).html(questions[i].question);}$('.trueFalse .button').on('click', function (){var btnClass=$(this).attr('class'); var index=$(this).attr('data-index'); trueButtonElements.eq(index).attr('data-disabled', false); falseButtonElements.eq(index).attr('data-disabled', false); if (btnClass.indexOf('true') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){/* correct */ answerElements.eq(index).text('You are correct! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}questions[index].answeredCorrectly=true;}else{/* incorrect */ answerElements.eq(index).text('You are incorrect! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}questions[index].answeredCorrectly=false;}}else if (btnClass.indexOf('false') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){/* incorrect */ answerElements.eq(index).text('You are incorrect! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}questions[index].answeredCorrectly=false;}else{/* correct */ answerElements.eq(index).text('You are correct! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}questions[index].answeredCorrectly=true;}}if (allAnswered()){$('.trueFalse .score').text('You got '+ getCorrectAnswersPercentage().toFixed(2) + '% of the questions correct!');}}); $('.trueFalse .reset').on('click', function (){for (var i=0; i < answerElements.length; i++){trueButtonElements.eq(i).attr('data-disabled', false); falseButtonElements.eq(i).attr('data-disabled', false); answerElements.eq(i).text(''); answerElements.eq(i).css('display', 'none'); explanationElements.eq(i).text(''); explanationElements.eq(i).css('display', 'none'); $('.trueFalse .score').text('waiting for you to complete the quiz..');}});});`;
              HTML += `<\/script>`;
              HTML += `<div class="trueFalse" style="width: 100%; max-width: 1200px; margin: 0 auto; background: #ecf0f1;"><div class="container" style="box-sizing: border-box; width: 100%; text-align: center; font-family: Arial,Helvetica,Verdana;"> <div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><h1 style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana;">` + this.title + `</h1></div></div>`;
              for (var i = 0; i < this.questions.length; i++) {
                HTML += `<div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="question" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; color: #525151; display: block; margin-top: 30px; border-top: 2px solid #ddd; text-align: center; padding: 24px; line-height: 26px; font-size: 26px; background: #fefefe; border-left: 10px solid #ddd;"></span> <span class="answer" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 18px; color: #fff; text-shadow: 2px 2px 2px rgba(44, 62, 80,1.0); letter-spacing: 2px; font-size: 22px;"></span> <span class="explanation" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 18px; letter-spacing: 2px; font-size: 20px; color: #fff; text-shadow: 2px 2px 2px rgba(44, 62, 80,1.0);"></span> </div></div><div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><span class="button true float-left" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: left; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">T</span> &nbsp; <span class="button false float-right" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: right; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">F</span></div></div>`;
              }
              HTML+= `<div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="score" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; text-align: center; display: inline-block; border: 1px solid #ddd; border-radius: 3px; color: #8a8a8a; padding: 18px; background: #fefefe; font-weight: bolder; font-size: 18px; margin-top: 35px;">waiting for you to complete the quiz..</span> </div></div><div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="button reset" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; border: 1px solid rgba(155, 89, 182, 1); display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; font-size: 24px; text-align: center; background: rgba(155, 89, 182, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(155, 89, 182, 1); margin-top: 40px; font-weight: bolder;">RESET</span> </div></div></div></div>`;

      this.autofocusOutput = true;
      this.output = HTML;
    },
    populateQuestions () {
      // clear errors
      this.error.objectToEditInput = false;

      var questionsData = this.objectToEditInput;
      var start = questionsData.indexOf('var questions = [{')
      var end = questionsData.indexOf('];')

      if (start == -1 || end == -1) {
        this.error.objectToEditInput = true;
        return;
      }

      start += 16; // 16 characters in arg
      end += 2; // 2 characters in arg

      var substring = questionsData.substring(start, end);
      this.questions.push.apply(this.questions, eval(substring));
    },
    leave() {
      // clear errors
      this.error.objectToEditInput = false;

      this.$emit('changeType', 'Landing');
    }
  },
  mounted() {
    var clipboard = new Clipboard('.btn-copy');
    $(document).ready(function() {
      $('.modal').modal();
    });
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
  .modal .modal-footer {
    padding: 0;
  }
  .modal .modal-footer .btn-large {
    margin: -20px auto;
    float: none;
  }
  .modal textarea.materialize-textarea {
    margin:0;
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
  .center-align-margin {
    margin: 0 auto;
  }
  .card {
    width: 100%;
    text-align: center;
  }
</style>
