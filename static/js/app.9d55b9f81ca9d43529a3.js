webpackJsonp([0],[,,function(e,t,a){var i=a(0)(a(4),a(20),null,null);e.exports=i.exports},,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(18),n=a.n(i),s=a(17),o=a.n(s);t.default={name:"app",components:{TrueFalse:n.a,Landing:o.a},data:function(){return{type:"Landing"}},methods:{changeType:function(e){return this.type=e}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Landing",data:function(){return{types:[{name:"True or False",type:"TrueFalse"}]}},methods:{changeType:function(e){this.$emit("changeType",e)}},mounted:function(){smoothScroll.init({speed:1600,easing:"easeInOutQuad"})}}},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={name:"TrueFalse",data:function(){return{id:1,title:"My True or False Object",jQueryAlreadyAvailable:!0,questions:[{id:1,question:"",answer:"true",hasExplanations:!1,correctExplanation:"",incorrectExplanation:"",answeredCorrectly:null}],output:"",autofocusOutput:!1,objectToEditInput:"",error:{objectToEditInput:!1}}},methods:{boldText:function(e){$("textarea#question"+e).selection("insert",{text:"<strong>",mode:"before"}),$("textarea#question"+e).selection("insert",{text:"</strong>",mode:"after"}),this.questions[e].question=$("textarea#question"+e).val()},italicizeText:function(e){$("textarea#question"+e).selection("insert",{text:"<em>",mode:"before"}),$("textarea#question"+e).selection("insert",{text:"</em>",mode:"after"}),this.questions[e].question=$("textarea#question"+e).val()},underlineText:function(e){$("textarea#question"+e).selection("insert",{text:"<u>",mode:"before"}),$("textarea#question"+e).selection("insert",{text:"</u>",mode:"after"}),this.questions[e].question=$("textarea#question"+e).val()},addQuestion:function(){this.error.objectToEditInput=!1,this.nextId(),this.questions.push({id:1,question:"",answer:"true",hasExplanations:!1,correctExplanation:"",incorrectExplanation:"",answeredCorrectly:null})},deleteQuestion:function(e){return this.error.objectToEditInput=!1,this.questions.splice(e,1)},nextId:function(){this.id++},createLearningObject:function(){this.error.objectToEditInput=!1;for(var e=0;e<this.questions.length;e++)""!=this.questions[e].correctExplanation&&(this.questions[e].hasExplanations=!0);var t="";this.jQueryAlreadyAvailable||(t+='<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"><\/script>'),t+='<script type="text/javascript">',t+="var questions = [";for(var e=0;e<this.questions.length;e++)t+='{question: "'+this.questions[e].question+'", answer: '+this.questions[e].answer+", hasExplanations: "+this.questions[e].hasExplanations+', correctExplanation: "'+this.questions[e].correctExplanation+'", incorrectExplanation: "'+this.questions[e].incorrectExplanation+'", answeredCorrectly: '+this.questions[e].answeredCorrectly+"}",e<this.questions.length-1&&(t+=",");t+="];",t+="var allAnswered=function (){var counter=0; for (var i=0; i < questions.length; i++){if (questions[i].answeredCorrectly !=null){counter++;}}if (counter==questions.length){return true;}return false;}; var getCorrectAnswersPercentage=function (){var counter=0; for (var i=0; i < questions.length; i++){if (questions[i].answeredCorrectly){counter++;}}return (counter / questions.length) * 100;};",t+="$(document).ready(function (){var questionElements=$('.trueFalse .question'); var answerElements=$('.trueFalse .answer'); var explanationElements=$('.trueFalse .explanation'); var trueButtonElements=$('.trueFalse .button.true'); var falseButtonElements=$('.trueFalse .button.false'); for (var i=0; i < questionElements.length; i++){questionElements.eq(i).attr('data-index', i); answerElements.eq(i).attr('data-index', i); explanationElements.eq(i).attr('data-index', i); trueButtonElements.eq(i).attr('data-index', i); falseButtonElements.eq(i).attr('data-index', i); questionElements.eq(i).html(questions[i].question);}$('.trueFalse .button').on('click', function (){var btnClass=$(this).attr('class'); var index=$(this).attr('data-index'); trueButtonElements.eq(index).attr('data-disabled', false); falseButtonElements.eq(index).attr('data-disabled', false); if (btnClass.indexOf('true') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){/* correct */ answerElements.eq(index).text('You are correct! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}questions[index].answeredCorrectly=true;}else{/* incorrect */ answerElements.eq(index).text('You are incorrect! You selected TRUE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}questions[index].answeredCorrectly=false;}}else if (btnClass.indexOf('false') >=0){$(this).attr('data-disabled', true); if (questions[index].answer===true){/* incorrect */ answerElements.eq(index).text('You are incorrect! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(231, 76, 60, 0.85)', 'border-bottom': '7px solid rgba(231, 76, 60, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].incorrectExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(243, 156, 18, 1)', 'background': 'rgba(243, 156, 18, 0.85)'});}questions[index].answeredCorrectly=false;}else{/* correct */ answerElements.eq(index).text('You are correct! You selected FALSE!'); answerElements.eq(index).css({'background': 'rgba(46, 204, 113, 0.85)', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'display': 'block'}); if (questions[index].hasExplanations){explanationElements.eq(index).text(questions[index].correctExplanation); explanationElements.eq(index).css({'display': 'block', 'border-bottom': '7px solid rgba(46, 204, 113, 1)', 'background': 'rgba(46, 204, 113, 0.85)'});}questions[index].answeredCorrectly=true;}}if (allAnswered()){$('.trueFalse .score').text('You got '+ getCorrectAnswersPercentage().toFixed(2) + '% of the questions correct!');}}); $('.trueFalse .reset').on('click', function (){for (var i=0; i < answerElements.length; i++){trueButtonElements.eq(i).attr('data-disabled', false); falseButtonElements.eq(i).attr('data-disabled', false); answerElements.eq(i).text(''); answerElements.eq(i).css('display', 'none'); explanationElements.eq(i).text(''); explanationElements.eq(i).css('display', 'none'); $('.trueFalse .score').text('waiting for you to complete the quiz..');}});});",t+="<\/script>",t+='<div class="trueFalse" style="width: 100%; max-width: 1200px; margin: 0 auto; background: #ecf0f1;"><div class="container" style="box-sizing: border-box; width: 100%; text-align: center; font-family: Arial,Helvetica,Verdana;"> <div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><h1 style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana;">'+this.title+"</h1></div></div>";for(var e=0;e<this.questions.length;e++)t+='<div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="question" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; color: #525151; display: block; margin-top: 30px; border-top: 2px solid #ddd; text-align: center; padding: 24px; line-height: 26px; font-size: 26px; background: #fefefe; border-left: 10px solid #ddd;"></span> <span class="answer" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 18px; color: #fff; text-shadow: 2px 2px 2px rgba(44, 62, 80,1.0); letter-spacing: 2px; font-size: 22px;"></span> <span class="explanation" style="box-sizing: border-box; text-align: center; font-family: sans-serif; display: none; padding: 18px; letter-spacing: 2px; font-size: 20px; color: #fff; text-shadow: 2px 2px 2px rgba(44, 62, 80,1.0);"></span> </div></div><div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"><span class="button true float-left" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: left; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">T</span> &nbsp; <span class="button false float-right" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; float: right; display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; text-align: center; font-weight: bolder; background: rgba(41, 128, 185, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(41, 128, 185, 1); font-size: 24px;">F</span></div></div>';t+='<div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="score" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; text-align: center; display: inline-block; border: 1px solid #ddd; border-radius: 3px; color: #8a8a8a; padding: 18px; background: #fefefe; font-weight: bolder; font-size: 18px; margin-top: 35px;">waiting for you to complete the quiz..</span> </div></div><div class="row" style="box-sizing: border-box; margin: 0 auto; text-align: center; font-family: Arial,Helvetica,Verdana; padding: 2px; width: 100%; float: left;"> <div class="col twelve" style="box-sizing: border-box; text-align: center; font-family: Arial,Helvetica,Verdana; min-height: 60px; display: inline-block; float: left; margin-left: 0px; margin-right: 0px; width: 100%;"> <span class="button reset" style="box-sizing: border-box; font-family: Arial,Helvetica,Verdana; border: 1px solid rgba(155, 89, 182, 1); display: inline-block; width: 48.5%; padding: 17px; line-height: 24px; font-size: 24px; text-align: center; background: rgba(155, 89, 182, 0.85); color: #fff; cursor: pointer; transition: all 0.20s ease-in-out; box-shadow: inset 0px -6px 0px rgba(155, 89, 182, 1); margin-top: 40px; font-weight: bolder;">RESET</span> </div></div></div></div>',this.autofocusOutput=!0,this.output=t},populateQuestions:function populateQuestions(){this.error.objectToEditInput=!1;var questionsData=this.objectToEditInput,start=questionsData.indexOf("var questions = [{"),end=questionsData.indexOf("];");if(-1==start||-1==end)return void(this.error.objectToEditInput=!0);start+=16,end+=2;var substring=questionsData.substring(start,end);this.questions.push.apply(this.questions,eval(substring))},leave:function(){this.error.objectToEditInput=!1,this.$emit("changeType","Landing")}},mounted:function(){new Clipboard(".btn-copy");$(document).ready(function(){$(".modal").modal()})}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(3),n=a(2),s=a.n(n);i.a.config.productionTip=!1,new i.a({el:"#app",template:"<App/>",components:{App:s.a}})},,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},,function(e,t){e.exports="data:image/png;base64,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"},function(e,t,a){a(12),a(11);var i=a(0)(a(5),a(19),"data-v-3d7afe20",null);e.exports=i.exports},function(e,t,a){a(14),a(13);var i=a(0)(a(6),a(21),"data-v-ed0fd064",null);e.exports=i.exports},function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),e._m(1),e._v(" "),a("section",{staticClass:"strip purple center-align"},[e._l(e.types,function(t){return[a("a",{staticClass:"btn-flat btn-large btn-action no-top-mar",on:{click:function(a){a.preventDefault(),e.changeType(t.type)}}},[e._v("Create a "+e._s(t.name)+" Object "),a("i",{staticClass:"material-icons right"},[e._v("wb_incandescent")])])]})],2),e._v(" "),e._m(2),e._v(" "),e._m(3)])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("header",{staticClass:"only-desktop main center-align"},[i("img",{attrs:{src:a(16)}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"box blue less-pad-mobile"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"center-align"},[a("h1",[e._v("Learning Objects at the speed of light!")]),e._v(" "),a("p",{staticClass:"lead"},[e._v("Create meaningful and engaging expereinces for your users today..")]),e._v(" "),a("a",{staticClass:"learn-more",attrs:{"data-scroll":"",href:"#about"}},[e._v("Learn More »")])])])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"box grey center-align"},[a("div",{staticClass:"row",attrs:{id:"about"}},[a("div",{staticClass:"col s12"},[a("i",{staticClass:"material-icons"},[a("i",{staticClass:"material-icons right"},[e._v("accessibility")])]),e._v(" "),a("h3",[e._v("Our Mission")]),e._v(" "),a("p",{staticClass:"lead lg-pad md-mar"},[e._v("We want to support your "),a("strong",[e._v("mission")]),e._v(" of reaching students and users with "),a("strong",[e._v("high quality learning objects")]),e._v(" to supplement online teaching and information services. Sleek has been designed from the bottom up to be the "),a("strong",[e._v("simplest possible solution")]),e._v(" to your problem. Sleek will allow you to generate learning objects "),a("strong",[e._v("on the fly")]),e._v(" and provide you the self-contained object ready for you to paste into your "),a("strong",[e._v("existing CMS or platform")]),e._v(", ready to go! "),a("strong",[e._v("Simple as that")]),e._v("!")])])]),e._v(" "),a("hr",{staticClass:"lg-mar"}),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col m12 l4"},[a("i",{staticClass:"material-icons"},[e._v("mode_edit")]),e._v(" "),a("h3",[e._v("Reusable Objects")]),e._v(" "),a("p",{staticClass:"lead"},[e._v('Putting the "R" in '),a("strong",[e._v("RLO")]),e._v("! Each object is designed to be plugged back into the generator to "),a("strong",[e._v("pick up where you left off")]),e._v("! Saving time and costs!")])]),e._v(" "),a("div",{staticClass:"col m12 l4"},[a("i",{staticClass:"material-icons"},[e._v("publish")]),e._v(" "),a("h3",[e._v("LibGuides Integration")]),e._v(" "),a("p",{staticClass:"lead"},[e._v("Each "),a("strong",[e._v("self-contained")]),e._v(" learning object authored is "),a("strong",[e._v("100% compatible")]),e._v(" with LibGuides, meaning all you do is copy and paste the generated HTML into your LibGuide and away you go!")])]),e._v(" "),a("div",{staticClass:"col m12 l4"},[a("i",{staticClass:"material-icons"},[e._v("devices")]),e._v(" "),a("h3",[e._v("Modern Design")]),e._v(" "),a("p",{staticClass:"lead"},[e._v("Create "),a("strong",[e._v("awesome learning experiences")]),e._v(" for your users! Each learning object is "),a("strong",[e._v("uniquely designed for maximum impact")]),e._v("!")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("footer",{staticClass:"main box blue footer center-align sm-pad"},[a("p",[e._v("© 2017. Hand crafted in Australia by "),a("a",{attrs:{href:"http://ashley.guru"}},[e._v("ashley.guru")]),e._v(".")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("keep-alive",[a(e.type,{tag:"component",on:{changeType:e.changeType}})],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"true-false"},[a("a",{staticClass:"left btn-large waves-effect waves-light teal lighten-2 left",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.leave(t)}}},[e._v("Back")]),e._v(" "),a("a",{staticClass:"btn-large waves-effect waves-light teal lighten-2 right",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.addQuestion(t)}}},[e._v("Add Question "),a("i",{staticClass:"right material-icons"},[e._v("add")])]),e._v(" "),a("div",{staticStyle:{clear:"both"}}),e._v(" "),a("h3",{staticClass:"center-align",staticStyle:{"margin-top":"50px"}},[e._v("True False Learning Object Generator")]),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"modal",attrs:{id:"modalToEdit"}},[a("div",{staticClass:"modal-content"},[a("h4",[e._v("Load up an existing Object")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.objectToEditInput,expression:"objectToEditInput"}],staticClass:"materialize-textarea lg",attrs:{rows:"40",autofocus:"true"},domProps:{value:e.objectToEditInput},on:{input:function(t){t.target.composing||(e.objectToEditInput=t.target.value)}}}),e._v(" "),a("p",{staticClass:"text-mute"},[e._v("Paste in your existing True False learning object. Pressing Upload will append the questions being edited to any existing questions in this session.")])]),e._v(" "),a("div",{staticClass:"modal-footer"},[a("p",{staticClass:"center-align"},[a("a",{staticClass:"modal-close waves-effect waves-light btn-large grey lighten-1",attrs:{href:"#"}},[e._v("Cancel")]),e._v(" "),a("a",{staticClass:"modal-close waves-effect waves-light btn-large blue",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.populateQuestions(t)}}},[e._v("Upload "),a("i",{staticClass:"right material-icons"},[e._v("cloud_upload")])])])])]),e._v(" "),e.error.objectToEditInput?a("div",{staticClass:"card red darken-1 center-align-margin"},[e._m(1)]):e._e(),e._v(" "),a("form",[e.questions.length?a("p",{staticClass:"center-align mar-top"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.jQueryAlreadyAvailable,expression:"jQueryAlreadyAvailable"}],attrs:{id:"jquery",type:"checkbox"},domProps:{checked:Array.isArray(e.jQueryAlreadyAvailable)?e._i(e.jQueryAlreadyAvailable,null)>-1:e.jQueryAlreadyAvailable},on:{__c:function(t){var a=e.jQueryAlreadyAvailable,i=t.target,n=!!i.checked;if(Array.isArray(a)){var s=e._i(a,null);n?s<0&&(e.jQueryAlreadyAvailable=a.concat(null)):s>-1&&(e.jQueryAlreadyAvailable=a.slice(0,s).concat(a.slice(s+1)))}else e.jQueryAlreadyAvailable=n}}}),e._v(" "),a("label",{attrs:{for:"jquery"}},[e._v("Is jQuery already included in your environment?")])]):e._e(),e.questions.length?a("p",{staticClass:"text-mute center-align"},[e._v("If you are using LibGuides, leave this checked. If not, find out from your IT team.")]):e._e(),e._v(" "),a("p"),e._v(" "),e.questions.length?[a("label",[e._v("Enter Title\n                "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],attrs:{type:"text",placeholder:"Title goes here"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}})])]:e._e(),e._v(" "),e._l(e.questions,function(t,i){return a("div",{key:t.id,staticClass:"section question-row"},[a("h4",{staticClass:"center-align"},[e._v("Question "+e._s(i+1))]),e._v(" "),a("p",{staticClass:"center-align"},[a("a",{staticClass:"waves-effect waves-light btn-flat",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.deleteQuestion(i)}}},[e._v("Remove")])]),e._v(" "),a("div",{staticClass:"question-input"},[a("p",{staticClass:"center-align"},[a("a",{staticClass:"waves-effect waves-light btn-flat sm-rt-pad",on:{click:function(t){t.preventDefault(),e.boldText(i)}}},[a("i",{staticClass:"material-icons"},[e._v("format_bold")])]),e._v(" "),a("a",{staticClass:"waves-effect waves-light btn-flat sm-rt-pad",on:{click:function(t){t.preventDefault(),e.italicizeText(i)}}},[a("i",{staticClass:"material-icons"},[e._v("format_italic")])]),e._v(" "),a("a",{staticClass:"waves-effect waves-light btn-flat sm-rt-pad",on:{click:function(t){t.preventDefault(),e.underlineText(i)}}},[a("i",{staticClass:"material-icons"},[e._v("format_underline")])])]),e._v(" "),a("label",[e._v("Enter Question\n                "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question.question"}],staticClass:"materialize-textarea",attrs:{id:"question"+i},domProps:{value:t.question},on:{input:function(e){e.target.composing||(t.question=e.target.value)}}})]),e._v(" "),a("p",{staticClass:"text-mute"},[e._v("Highlight text that you want to modify and click the respective text modifier button above.")])]),e._v(" "),a("label",[e._v("Select an Answer\n              "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"question.answer"}],on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});t.answer=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"true"}},[e._v("True")]),e._v(" "),a("option",{attrs:{value:"false"}},[e._v("False")])])]),e._v(" "),a("br"),e._v(" "),a("label",[e._v("Explanation for correct answer\n              "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.correctExplanation,expression:"question.correctExplanation"}],attrs:{type:"text",placeholder:"Explanation to correct answer"},domProps:{value:t.correctExplanation},on:{input:function(e){e.target.composing||(t.correctExplanation=e.target.value)}}})]),e._v(" "),a("label",[e._v("Explanation for incorrect answer\n              "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.incorrectExplanation,expression:"question.incorrectExplanation"}],attrs:{type:"text",placeholder:"Explanation to incorrect answer"},domProps:{value:t.incorrectExplanation},on:{input:function(e){e.target.composing||(t.incorrectExplanation=e.target.value)}}})])])}),e._v(" "),a("a",{staticClass:"btn-large lg-mar-top btn-block waves-effect waves-light teal lighten-2",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.addQuestion(t)}}},[e._v("Add Question "),a("i",{staticClass:"right material-icons"},[e._v("add")])]),e._v(" "),a("div",{staticClass:"center-align lg-mar-top"},[e.questions.length?a("a",{staticClass:"waves-effect waves-light btn-large blue",on:{click:function(t){t.preventDefault(),e.createLearningObject(t)}}},[e._v("Generate True or False Learning Object "),a("i",{staticClass:"right material-icons"},[e._v("cloud_download")])]):e._e()])],2),e._v(" "),e.output?a("div",{staticClass:"center-align lg-mar-top"},[a("h5",[e._v("Your Freshly Baked Learning Object")]),e._v(" "),e.questions.length?a("a",{staticClass:"btn-copy waves-effect waves-light btn-large purple darken-1",attrs:{"data-clipboard-action":"copy","data-clipboard-target":"#output"}},[e._v("Copy to clipboard "),a("i",{staticClass:"right material-icons"},[e._v("content_copy")])]):e._e(),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.output,expression:"output"}],staticClass:"materialize-textarea lg dark",attrs:{rows:"40",id:"output",autofocus:e.autofocusOutput},domProps:{value:e.output},on:{input:function(t){t.target.composing||(e.output=t.target.value)}}}),e._v(" "),a("p",{staticClass:"text-mute"},[e._v("Simply copy the above code and paste it into a LibGuide or CMS page.")])]):e._e()])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",{staticClass:"center-align"},[a("a",{staticClass:"waves-effect waves-light btn-flat",attrs:{href:"#modalToEdit"}},[e._v("Edit Existing Object")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card-content white-text"},[a("span",{staticClass:"card-title"},[e._v("Whoops!")]),e._v(" "),a("p",[e._v("The existing Learning Object that you uploaded was not valid.")]),e._v(" "),a("p",[e._v("Did you only partially copy the code? or maybe you edited the code?")]),e._v(" "),a("p",[e._v("You may want to manually recreate this obeject.")]),e._v(" "),a("p",[e._v("However, in future, make sure you don't edit the code and that you copy the object in it's entirety.")])])}]}}],[7]);
//# sourceMappingURL=app.9d55b9f81ca9d43529a3.js.map