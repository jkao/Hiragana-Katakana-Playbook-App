/*
 *
 * Hiragana/Katakana Trainer
 * By: Jeff Kao (http://jeff-kao.com)
 *
 * Japanese Hiragana/Katakana learning application
 * built for the Blackberry PlayBook platform.
 *
 */

$(function() {
  var NUMBER_OF_OPTIONS = 4;
  var VERSION = "1.0";

  // Model to keep track of progress of Quiz
  var Quiz = Backbone.Model.extend({
    defaults: {
      mode: null,

      quiz_bank: null,
      options_bank: null,
      incorrect_chars: null,

      total_characters: 0,
      total_characters_correct: 0,
      total_characters_left: 0
    },
    initialize: function(params) {
      this.mode = params.mode;

      // This is the pronounciations bank
      if (this.mode === "hiragana") {
        this.options_bank = window.HiraganaCollection;
      } else if (this.mode === "katakana") {
        this.options_bank = window.KatakanaCollection;
      } else {
        this.options_bank = window.HiraganaKatakanaCollection;
      }

      this.total_characters_correct = 0;
      this.total_characters_left = this.options_bank.length;
      this.total_characters = this.options_bank.length;

      // This is the bank we'll pull characters from for quizzing
      this.quiz_bank = new Characters(_.shuffle(this.options_bank.models));
    },
    validate: function() {
      if (!mode) {
        throw "Requires a mode";
      }
    },
    total_characters_attempted: function() {
      return this.total_characters - this.total_characters_left;
    },
    percentage_score: function() {
      return Math.floor(this.total_characters_correct/this.total_characters * 100);
    },
    correctness_score: function() {
      if (this.total_characters_attempted() == 0) {
        return 0;
      } else {
        return Math.floor(this.total_characters_correct/this.total_characters_attempted() * 100);
      }
    }
  });

  // Model object representing a Japanese character
  var Character = Backbone.Model.extend({
    defaults: {
      character: null,
      pronounciation: null,
      type: null
    },
    initialize: function(args) {
    },
    validate: function() {
      if (!(character && pronounciation && type)) {
        throw "All fields should be filled out [character, pronounciation, type]"
      }
    },
  });

  var Characters = Backbone.Collection.extend({
    model: Character,

    // Returns an n-length array of first n elements
    // of the shuffled collection
    // Returns null if you specify more characters than 
    // there are in the collection
    get_random_characters: function(num_chars) {
      return (num_chars > this.length) ? null : _.first(_.shuffle(this.models), num_chars);
    },

    get_random_characters_except: function(num_chars, character) {
      filtered_characters = _.reject(this.models, function(char) {
        return char.attributes.character == character
      });
      return (num_chars > this.length - 1) ? null : _.first(_.shuffle(filtered_characters), num_chars);
    }
  });

  window.HiraganaCollection = new Characters([
    {character: "あ", pronounciation: "a", type:"hiragana"},
    {character: "い", pronounciation: "i", type:"hiragana"},
    {character: "う", pronounciation: "u", type:"hiragana"},
    {character: "え", pronounciation: "e", type:"hiragana"},
    {character: "お", pronounciation: "o", type:"hiragana"},

    {character: "か", pronounciation: "ka", type:"katakana"},
    {character: "き", pronounciation: "ki", type:"katakana"},
    {character: "く", pronounciation: "ku", type:"katakana"},
    {character: "け", pronounciation: "ke", type:"katakana"},
    {character: "こ", pronounciation: "ko", type:"katakana"},
    {character: "が", pronounciation: "ga", type:"katakana"},
    {character: "ぎ", pronounciation: "gi", type:"katakana"},
    {character: "ぐ", pronounciation: "gu", type:"katakana"},
    {character: "げ", pronounciation: "ge", type:"katakana"},
    {character: "ご", pronounciation: "go", type:"katakana"},

    {character: "さ", pronounciation: "sa", type:"katakana"},
    {character: "し", pronounciation: "shi", type:"katakana"},
    {character: "す", pronounciation: "su", type:"katakana"},
    {character: "せ", pronounciation: "se", type:"katakana"},
    {character: "そ", pronounciation: "so", type:"katakana"},
    {character: "ざ", pronounciation: "za", type:"katakana"},
    {character: "じ", pronounciation: "ji", type:"katakana"},
    {character: "ず", pronounciation: "zu", type:"katakana"},
    {character: "ぜ", pronounciation: "ze", type:"katakana"},
    {character: "ぞ", pronounciation: "zo", type:"katakana"},

    {character: "た", pronounciation: "ta", type:"katakana"},
    {character: "ち", pronounciation: "chi", type:"katakana"},
    {character: "つ", pronounciation: "tsu", type:"katakana"},
    {character: "て", pronounciation: "te", type:"katakana"},
    {character: "と", pronounciation: "to", type:"katakana"},
    {character: "だ", pronounciation: "da", type:"katakana"},
    {character: "じ", pronounciation: "ji", type:"katakana"},
    {character: "ず", pronounciation: "zu", type:"katakana"},
    {character: "で", pronounciation: "de", type:"katakana"},
    {character: "ど", pronounciation: "do", type:"katakana"},

    {character: "な", pronounciation: "na", type:"katakana"},
    {character: "に", pronounciation: "ni", type:"katakana"},
    {character: "ぬ", pronounciation: "nu", type:"katakana"},
    {character: "ね", pronounciation: "ne", type:"katakana"},
    {character: "の", pronounciation: "no", type:"katakana"},

    {character: "は", pronounciation: "ha", type:"katakana"},
    {character: "ひ", pronounciation: "hi", type:"katakana"},
    {character: "ふ", pronounciation: "hu", type:"katakana"},
    {character: "へ", pronounciation: "he", type:"katakana"},
    {character: "ほ", pronounciation: "ho", type:"katakana"},
    {character: "ば", pronounciation: "ba", type:"katakana"},
    {character: "び", pronounciation: "bi", type:"katakana"},
    {character: "ぶ", pronounciation: "bu", type:"katakana"},
    {character: "べ", pronounciation: "be", type:"katakana"},
    {character: "ぼ", pronounciation: "bo", type:"katakana"},
    {character: "ぱ", pronounciation: "pa", type:"katakana"},
    {character: "ぴ", pronounciation: "pi", type:"katakana"},
    {character: "ぷ", pronounciation: "pu", type:"katakana"},
    {character: "ぺ", pronounciation: "pe", type:"katakana"},
    {character: "ぽ", pronounciation: "po", type:"katakana"},

    {character: "ま", pronounciation: "ma", type:"katakana"},
    {character: "み", pronounciation: "mi", type:"katakana"},
    {character: "む", pronounciation: "mu", type:"katakana"},
    {character: "め", pronounciation: "me", type:"katakana"},
    {character: "も", pronounciation: "mo", type:"katakana"},

    {character: "ら", pronounciation: "ra", type:"katakana"},
    {character: "り", pronounciation: "ri", type:"katakana"},
    {character: "る", pronounciation: "ru", type:"katakana"},
    {character: "れ", pronounciation: "re", type:"katakana"},
    {character: "ろ", pronounciation: "ro", type:"katakana"},

    {character: "や", pronounciation: "ya", type:"katakana"},
    {character: "ゆ", pronounciation: "yu", type:"katakana"},
    {character: "よ", pronounciation: "yo", type:"katakana"},

    {character: "わ", pronounciation: "wa", type:"katakana"},
    {character: "を", pronounciation: "wo", type:"katakana"},

    {character: "ん", pronounciation: "n", type:"katakana"},

    {character: "きゃ", pronounciation: "kya", type:"katakana"},
    {character: "きゅ", pronounciation: "kyu", type:"katakana"},
    {character: "きょ", pronounciation: "kyo", type:"katakana"},
    {character: "ぎゃ", pronounciation: "gya", type:"katakana"},
    {character: "ぎゅ", pronounciation: "gyu", type:"katakana"},
    {character: "ぎょ", pronounciation: "gyo", type:"katakana"},

    {character: "しゃ", pronounciation: "sha", type:"katakana"},
    {character: "しゅ", pronounciation: "shu", type:"katakana"},
    {character: "しょ", pronounciation: "sho", type:"katakana"},
    {character: "じゃ", pronounciation: "ja", type:"katakana"},
    {character: "じゅ", pronounciation: "ju", type:"katakana"},
    {character: "じょ", pronounciation: "jo", type:"katakana"},

    {character: "ちゃ", pronounciation: "cha", type:"katakana"},
    {character: "ちゅ", pronounciation: "chu", type:"katakana"},
    {character: "ちょ", pronounciation: "cho", type:"katakana"},

    {character: "にゃ", pronounciation: "nya", type:"katakana"},
    {character: "にゅ", pronounciation: "nyu", type:"katakana"},
    {character: "にょ", pronounciation: "nyo", type:"katakana"},

    {character: "ひゃ", pronounciation: "hya", type:"katakana"},
    {character: "ひゅ", pronounciation: "hyu", type:"katakana"},
    {character: "ひょ", pronounciation: "hyo", type:"katakana"},
    {character: "びゃ", pronounciation: "bya", type:"katakana"},
    {character: "びゅ", pronounciation: "byu", type:"katakana"},
    {character: "びょ", pronounciation: "byo", type:"katakana"},
    {character: "ぴゃ", pronounciation: "pya", type:"katakana"},
    {character: "ぴゅ", pronounciation: "pyu", type:"katakana"},
    {character: "ぴょ", pronounciation: "pyo", type:"katakana"},

    {character: "みゃ", pronounciation: "mya", type:"katakana"},
    {character: "みゅ", pronounciation: "myu", type:"katakana"},
    {character: "みょ", pronounciation: "myo", type:"katakana"},

    {character: "りゃ", pronounciation: "rya", type:"katakana"},
    {character: "りゅ", pronounciation: "ryu", type:"katakana"},
    {character: "りょ", pronounciation: "ryo", type:"katakana"}
  ]);

  window.KatakanaCollection = new Characters([
    {character: "ア", pronounciation: "a", type:"katakana"},
    {character: "イ", pronounciation: "i", type:"katakana"},
    {character: "ウ", pronounciation: "u", type:"katakana"},
    {character: "エ", pronounciation: "e", type:"katakana"},
    {character: "オ", pronounciation: "o", type:"katakana"},

    {character: "カ", pronounciation: "ka", type:"katakana"},
    {character: "キ", pronounciation: "ki", type:"katakana"},
    {character: "ク", pronounciation: "ku", type:"katakana"},
    {character: "ケ", pronounciation: "ke", type:"katakana"},
    {character: "コ", pronounciation: "ko", type:"katakana"},
    {character: "ガ", pronounciation: "ga", type:"katakana"},
    {character: "ギ", pronounciation: "gi", type:"katakana"},
    {character: "グ", pronounciation: "gu", type:"katakana"},
    {character: "ゲ", pronounciation: "ge", type:"katakana"},
    {character: "ギ", pronounciation: "go", type:"katakana"},

    {character: "サ", pronounciation: "sa", type:"katakana"},
    {character: "シ", pronounciation: "shi", type:"katakana"},
    {character: "ス", pronounciation: "su", type:"katakana"},
    {character: "セ", pronounciation: "se", type:"katakana"},
    {character: "ソ", pronounciation: "so", type:"katakana"},
    {character: "ザ", pronounciation: "za", type:"katakana"},
    {character: "ジ", pronounciation: "ji", type:"katakana"},
    {character: "ズ", pronounciation: "zu", type:"katakana"},
    {character: "ゼ", pronounciation: "ze", type:"katakana"},
    {character: "ゾ", pronounciation: "zo", type:"katakana"},

    {character: "タ", pronounciation: "ta", type:"katakana"},
    {character: "チ", pronounciation: "chi", type:"katakana"},
    {character: "ツ", pronounciation: "tsu", type:"katakana"},
    {character: "テ", pronounciation: "te", type:"katakana"},
    {character: "ト", pronounciation: "to", type:"katakana"},
    {character: "ダ", pronounciation: "da", type:"katakana"},
    {character: "ジ", pronounciation: "ji", type:"katakana"},
    {character: "ズ", pronounciation: "zu", type:"katakana"},
    {character: "デ", pronounciation: "de", type:"katakana"},
    {character: "ド", pronounciation: "do", type:"katakana"},

    {character: "ナ", pronounciation: "na", type:"katakana"},
    {character: "ニ", pronounciation: "ni", type:"katakana"},
    {character: "ヌ", pronounciation: "nu", type:"katakana"},
    {character: "ネ", pronounciation: "ne", type:"katakana"},
    {character: "ノ", pronounciation: "no", type:"katakana"},

    {character: "ハ", pronounciation: "ha", type:"katakana"},
    {character: "ヒ", pronounciation: "hi", type:"katakana"},
    {character: "フ", pronounciation: "hu", type:"katakana"},
    {character: "ヘ", pronounciation: "he", type:"katakana"},
    {character: "ホ", pronounciation: "ho", type:"katakana"},
    {character: "バ", pronounciation: "ba", type:"katakana"},
    {character: "ビ", pronounciation: "bi", type:"katakana"},
    {character: "ブ", pronounciation: "bu", type:"katakana"},
    {character: "ベ", pronounciation: "be", type:"katakana"},
    {character: "ボ", pronounciation: "bo", type:"katakana"},
    {character: "パ", pronounciation: "pa", type:"katakana"},
    {character: "ピ", pronounciation: "pi", type:"katakana"},
    {character: "プ", pronounciation: "pu", type:"katakana"},
    {character: "ペ", pronounciation: "pe", type:"katakana"},
    {character: "ポ", pronounciation: "po", type:"katakana"},

    {character: "マ", pronounciation: "ma", type:"katakana"},
    {character: "ミ", pronounciation: "mi", type:"katakana"},
    {character: "ム", pronounciation: "mu", type:"katakana"},
    {character: "メ", pronounciation: "me", type:"katakana"},
    {character: "モ", pronounciation: "mo", type:"katakana"},

    {character: "ラ", pronounciation: "ra", type:"katakana"},
    {character: "リ", pronounciation: "ri", type:"katakana"},
    {character: "ル", pronounciation: "ru", type:"katakana"},
    {character: "レ", pronounciation: "re", type:"katakana"},
    {character: "ロ", pronounciation: "ro", type:"katakana"},

    {character: "ヤ", pronounciation: "ya", type:"katakana"},
    {character: "ユ", pronounciation: "yu", type:"katakana"},
    {character: "ヨ", pronounciation: "yo", type:"katakana"},

    {character: "ワ", pronounciation: "wa", type:"katakana"},
    {character: "ヲ", pronounciation: "wo", type:"katakana"},

    {character: "ン", pronounciation: "n", type:"katakana"},

    {character: "キャ", pronounciation: "kya", type:"katakana"},
    {character: "キュ", pronounciation: "kyu", type:"katakana"},
    {character: "キョ", pronounciation: "kyo", type:"katakana"},
    {character: "ギャ", pronounciation: "gya", type:"katakana"},
    {character: "ギュ", pronounciation: "gyu", type:"katakana"},
    {character: "ギョ", pronounciation: "gyo", type:"katakana"},

    {character: "シャ", pronounciation: "sha", type:"katakana"},
    {character: "シュ", pronounciation: "shu", type:"katakana"},
    {character: "ショ", pronounciation: "sho", type:"katakana"},
    {character: "ジャ", pronounciation: "ja", type:"katakana"},
    {character: "ジュ", pronounciation: "ju", type:"katakana"},
    {character: "ジョ", pronounciation: "jo", type:"katakana"},

    {character: "チャ", pronounciation: "cha", type:"katakana"},
    {character: "チュ", pronounciation: "chu", type:"katakana"},
    {character: "チョ", pronounciation: "cho", type:"katakana"},

    {character: "ニャ", pronounciation: "nya", type:"katakana"},
    {character: "ニュ", pronounciation: "nyu", type:"katakana"},
    {character: "ニョ", pronounciation: "nyo", type:"katakana"},

    {character: "ヒャ", pronounciation: "hya", type:"katakana"},
    {character: "ヒュ", pronounciation: "hyu", type:"katakana"},
    {character: "ヒョ", pronounciation: "hyo", type:"katakana"},
    {character: "ビャ", pronounciation: "bya", type:"katakana"},
    {character: "ビュ", pronounciation: "byu", type:"katakana"},
    {character: "ビョ", pronounciation: "byo", type:"katakana"},
    {character: "ピャ", pronounciation: "pya", type:"katakana"},
    {character: "ピュ", pronounciation: "pyu", type:"katakana"},
    {character: "ピョ", pronounciation: "pyo", type:"katakana"},

    {character: "ミャ", pronounciation: "mya", type:"katakana"},
    {character: "ミュ", pronounciation: "myu", type:"katakana"},
    {character: "ミョ", pronounciation: "myo", type:"katakana"},

    {character: "リャ", pronounciation: "rya", type:"katakana"},
    {character: "リュ", pronounciation: "ryu", type:"katakana"},
    {character: "リョ", pronounciation: "ryo", type:"katakana"}
  ]);

  // Combination of the Above
  window.HiraganaKatakanaCollection = new Characters([].concat(window.HiraganaCollection.models, window.KatakanaCollection.models));

  // Main game routing object
  var HiraganaKatakanaTrainer = Backbone.Router.extend({
    routes: {
      "": "start",
      "quiz/:category": "quiz",
      "practice": "practice",
      "about": "about",
      "goodbye": "goodbye"
    },

    initialize: function(options) {
      if (this.index_view === null) {
        this.index_view = new StartScreen({})
      }
    },

    start: function() {
      new StartScreen();
    },

    quiz: function(category) {
      if (category === "hiragana") {
        quiz_title = "Hiragana";
      } else if (category === "katakana") {
        quiz_title = "Katakana";
      } else {
        quiz_title = "Hiragana & Katakana";
      }

      new QuizScreen({
        title: quiz_title,
        mode: category
      });
    },

    practice: function() {
      new PracticeScreen({
        hiragana_collection: window.HiraganaCollection,
        katakana_collection: window.KatakanaCollection
      });
    },

    about: function() {
      new AboutScreen();
    },

    goodbye: function() {
      new GoodByeScreen();
    }
  });

  // View of the start menu
  var StartScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#start-screen").text() ),

    initialize: function() {
      this.render();
    },
    render: function() {
      var t = this;
      var el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({
        }));
        el.fadeIn('fast');
      });
    },
    events: {
    }
  });

  // View of the quiz screen
  // TODO: Move more of the method contents in to the Quiz Model
  var QuizScreen = Backbone.View.extend({
    el: "#hk-main",
    question_el: "#hk-main #quiz-options-area",
    template: _.template( $("#quiz-screen").text() ),
    question_template: _.template( $("#quiz-options").text() ),

    quiz: null,

    initialize: function(params) {
      this.quiz = new Quiz({
        mode: params.mode
      });

      // Render the template
      this.render(params);
    },
    render: function(params) {
      var t = this;
      var el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template(params));
        el.fadeIn('fast');

        // Set up the exit handler
        $("a.exit").click(function(e) {
          e.preventDefault();
          t.finish_quiz();
        });

        t.new_question();
      });
    },
    new_question: function() {
      if (this.quiz.quiz_bank.length > 0) {
        // If we still have characters to test
        var t = this;
        var new_question_char = _.first(this.quiz.quiz_bank.models);
        var answer_options = _.shuffle(this.quiz.options_bank.get_random_characters_except(NUMBER_OF_OPTIONS - 1, new_question_char.attributes.character).concat(new_question_char));

        this.quiz.quiz_bank.remove(new_question_char);

        $(this.question_el).fadeOut('2500', function() {
          $(this).empty();
          $(this).html(t.question_template({
            character: new_question_char.attributes.character,
            answer: new_question_char.attributes.pronounciation,
            options: _.map(answer_options, function(option) {
              return option.attributes.pronounciation;
            }),
            total_chars: t.quiz.total_characters,
            progress: t.quiz.total_characters - t.quiz.total_characters_left,
            correct: t.quiz.total_characters_correct
          }));
          $("a.question-option").click(function(e) {
            e.preventDefault();
            t.answer_question( $(this) );
          });
          $(this).fadeIn('fast');
        });
      } else {
        // If we have no more characters, we are done testing
        this.finish_quiz();
      }
    },
    answer_question: function(answer_el) {
      var question_el = $("#question-character");
      var question_answer = question_el.data("value");
      var question_attempt = answer_el.data("value");

      this.quiz.total_characters_left--;

      if (question_answer === question_attempt) {
        this.quiz.total_characters_correct++;
        answer_el.addClass("success");
      } else {
        $("a.question-option[data-value='" + question_answer + "']").addClass("success");
        answer_el.addClass("error");
      }

      // Render next question
      this.new_question();
    },
    finish_quiz: function() {
      new EndQuizScreen({
        quiz: this.quiz
      });
    }
  });

  // View of the finish quiz screen
  var EndQuizScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#end-quiz-screen").text() ),

    initialize: function(params) {
      this.render(params);
    },
    render: function(params) {
      var t = this;
      var el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({
          quiz_result: params.quiz
        }));
        el.fadeIn('fast');
      });
    }
  });

  // View of the quiz screen
  var PracticeScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#practice-screen").text() ),

    hiragana_collection: null,
    katakana_collection: null,

    initialize: function(params) {
      this.hiragana_collection = params.hiragana_collection;
      this.katakana_collection = params.katakana_collection;
      this.render(params);
    },
    render: function(params) {
      var t = this;
      var el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({
          hiragana_collection: params.hiragana_collection,
          katakana_collection: params.katakana_collection
        }));
        el.fadeIn('fast');

        // Set the click binders for tabs
        $("#katakana-practice-tab").click(function(e) {
          e.preventDefault();
          t.use_set("katakana");
        });
        $("#hiragana-practice-tab").click(function(e) {
          e.preventDefault();
          t.use_set("hiragana");
        });

        // Show Hiragana by default
        t.use_set("hiragana");
      });
    },
    use_set: function(char_set) {
      t = this;
      $(".practice-tabs dd a").removeClass("active");

      if (char_set === "katakana") {
        $("#katakana-practice-tab").addClass("active");
        new PracticeCharacterGrid({
          character_set: t.katakana_collection,
          mode: char_set
        });
      } else {
        $("#hiragana-practice-tab").addClass("active");
        new PracticeCharacterGrid({
          character_set: t.hiragana_collection,
          mode: char_set
        });
      }
    }
  });

  // TODO: Characters in memory should be refactored to be put in buckets
  // so that we can programmatically format the table rather than manually
  // doing it, I simply copied the HTML table from a site and modified it a bit
  var PracticeCharacterGrid = Backbone.View.extend({
    el: "#character-grid",
    template: _.template( $("#practice-character-grid-screen").text() ),

    initialize: function(params) {
      this.render(params);
    },
    render: function(params) {
      var t = this;
      var el = $(this.el);

      el.empty();
      el.html(t.template({
        character_set: params.character_set,
        mode: params.mode
      }));
    }
  });

  // View of the about screen
  var AboutScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#about-screen").text() ),

    initialize: function() {
      this.render();
    },
    render: function() {
      var t = this;
      var el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({}));
        el.fadeIn('fast');
      });
    }
  });

  hk = new HiraganaKatakanaTrainer();
  Backbone.history.start();
});
