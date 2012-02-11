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
    isCorrectPronounciation: function(p) {
      return p === pronounciation
    }
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

  var HiraganaCollection = new Characters([
    {character: "あ", pronounciation: "a", type:"hiragana"},
    {character: "い", pronounciation: "i", type:"hiragana"},
    {character: "う", pronounciation: "u", type:"hiragana"},
    {character: "え", pronounciation: "e", type:"hiragana"},
    {character: "お", pronounciation: "o", type:"hiragana"}

    // TODO: MOAR and add comma above
  ]);

  var KatakanaCollection = new Characters([
    {character: "", pronounciation: "a", type:"katakana"},
    {character: "", pronounciation: "i", type:"katakana"},
    {character: "", pronounciation: "u", type:"katakana"},
    {character: "", pronounciation: "e", type:"katakana"},
    {character: "", pronounciation: "o", type:"katakana"},

    {character: "", pronounciation: "ka", type:"katakana"},
    {character: "", pronounciation: "ki", type:"katakana"},
    {character: "", pronounciation: "ku", type:"katakana"},
    {character: "", pronounciation: "ke", type:"katakana"},
    {character: "", pronounciation: "ko", type:"katakana"},
    {character: "", pronounciation: "ga", type:"katakana"},
    {character: "", pronounciation: "gi", type:"katakana"},
    {character: "", pronounciation: "gu", type:"katakana"},
    {character: "", pronounciation: "ge", type:"katakana"},
    {character: "", pronounciation: "go", type:"katakana"},

    {character: "", pronounciation: "sa", type:"katakana"},
    {character: "", pronounciation: "shi", type:"katakana"},
    {character: "", pronounciation: "su", type:"katakana"},
    {character: "", pronounciation: "se", type:"katakana"},
    {character: "", pronounciation: "so", type:"katakana"},
    {character: "", pronounciation: "za", type:"katakana"},
    {character: "", pronounciation: "ji", type:"katakana"},
    {character: "", pronounciation: "zu", type:"katakana"},
    {character: "", pronounciation: "ze", type:"katakana"},
    {character: "", pronounciation: "zo", type:"katakana"},

    {character: "", pronounciation: "ta", type:"katakana"},
    {character: "", pronounciation: "chi", type:"katakana"},
    {character: "", pronounciation: "tsu", type:"katakana"},
    {character: "", pronounciation: "te", type:"katakana"},
    {character: "", pronounciation: "to", type:"katakana"},
    {character: "", pronounciation: "da", type:"katakana"},
    {character: "", pronounciation: "ji", type:"katakana"},
    {character: "", pronounciation: "zu", type:"katakana"},
    {character: "", pronounciation: "de", type:"katakana"},
    {character: "", pronounciation: "do", type:"katakana"},

    {character: "", pronounciation: "na", type:"katakana"},
    {character: "", pronounciation: "ni", type:"katakana"},
    {character: "", pronounciation: "nu", type:"katakana"},
    {character: "", pronounciation: "ne", type:"katakana"},
    {character: "", pronounciation: "no", type:"katakana"},

    {character: "", pronounciation: "ha", type:"katakana"},
    {character: "", pronounciation: "hi", type:"katakana"},
    {character: "", pronounciation: "hu", type:"katakana"},
    {character: "", pronounciation: "he", type:"katakana"},
    {character: "", pronounciation: "ho", type:"katakana"},
    {character: "", pronounciation: "ba", type:"katakana"},
    {character: "", pronounciation: "bi", type:"katakana"},
    {character: "", pronounciation: "bu", type:"katakana"},
    {character: "", pronounciation: "be", type:"katakana"},
    {character: "", pronounciation: "bo", type:"katakana"},
    {character: "", pronounciation: "pa", type:"katakana"},
    {character: "", pronounciation: "pi", type:"katakana"},
    {character: "", pronounciation: "pu", type:"katakana"},
    {character: "", pronounciation: "pe", type:"katakana"},
    {character: "", pronounciation: "po", type:"katakana"},

    {character: "", pronounciation: "ma", type:"katakana"},
    {character: "", pronounciation: "mi", type:"katakana"},
    {character: "", pronounciation: "mu", type:"katakana"},
    {character: "", pronounciation: "me", type:"katakana"},
    {character: "", pronounciation: "mo", type:"katakana"},

    {character: "", pronounciation: "ra", type:"katakana"},
    {character: "", pronounciation: "ri", type:"katakana"},
    {character: "", pronounciation: "ru", type:"katakana"},
    {character: "", pronounciation: "re", type:"katakana"},
    {character: "", pronounciation: "ro", type:"katakana"},

    {character: "", pronounciation: "ya", type:"katakana"},
    {character: "", pronounciation: "yu", type:"katakana"},
    {character: "", pronounciation: "yo", type:"katakana"},

    {character: "", pronounciation: "wa", type:"katakana"},
    {character: "", pronounciation: "o", type:"katakana"},

    {character: "", pronounciation: "n", type:"katakana"},

    {character: "", pronounciation: "kya", type:"katakana"},
    {character: "", pronounciation: "kyu", type:"katakana"},
    {character: "", pronounciation: "kyo", type:"katakana"},
    {character: "", pronounciation: "gya", type:"katakana"},
    {character: "", pronounciation: "gyu", type:"katakana"},
    {character: "", pronounciation: "gyo", type:"katakana"},

    {character: "", pronounciation: "sha", type:"katakana"},
    {character: "", pronounciation: "shu", type:"katakana"},
    {character: "", pronounciation: "sho", type:"katakana"},
    {character: "", pronounciation: "ja", type:"katakana"},
    {character: "", pronounciation: "ju", type:"katakana"},
    {character: "", pronounciation: "jo", type:"katakana"},

    {character: "", pronounciation: "cha", type:"katakana"},
    {character: "", pronounciation: "chu", type:"katakana"},
    {character: "", pronounciation: "cho", type:"katakana"},

    {character: "", pronounciation: "nya", type:"katakana"},
    {character: "", pronounciation: "nyu", type:"katakana"},
    {character: "", pronounciation: "nyo", type:"katakana"},

    {character: "", pronounciation: "hya", type:"katakana"},
    {character: "", pronounciation: "hyu", type:"katakana"},
    {character: "", pronounciation: "hyo", type:"katakana"},
    {character: "", pronounciation: "bya", type:"katakana"},
    {character: "", pronounciation: "byu", type:"katakana"},
    {character: "", pronounciation: "byo", type:"katakana"},
    {character: "", pronounciation: "pya", type:"katakana"},
    {character: "", pronounciation: "pyu", type:"katakana"},
    {character: "", pronounciation: "pyo", type:"katakana"},

    {character: "", pronounciation: "mya", type:"katakana"},
    {character: "", pronounciation: "myu", type:"katakana"},
    {character: "", pronounciation: "myo", type:"katakana"},

    {character: "", pronounciation: "rya", type:"katakana"},
    {character: "", pronounciation: "ryu", type:"katakana"},
    {character: "", pronounciation: "ryo", type:"katakana"}
  ]);

  // Combination of the Above
  var HiraganaKatakanaCollection = new Characters(Array.concat(HiraganaCollection, KatakanaCollection));

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
      new PracticeScreen();
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
      t = this;
      el = $(this.el);

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
  var QuizScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#quiz-screen").text() ),

    quiz_bank: null,
    options_bank: null,

    total_characters: 0,
    total_characters_correct: 0,
    total_characters_unattempted: 0,

    initialize: function(params) {
      this.mode = params.mode;

      // This is the pronounciations bank
      if (mode === "hiragana") {
        this.options_bank = HiraganaCollection;
      } else if (mode === "katakana") {
        this.options_bank = KatakanaCollection;
      } else {
        this.options_bank = HiraganaKatakanaCollection;
      }

      this.total_characters = 0;
      this.total_characters_correct = 0;
      this.total_characters_unattempted = this.options_bank.mode.length;

      // This is the bank we'll pull characters from for quizzing
      quiz_bank = Characters.new(_.shuffle(this.options_bank.mode));

      // Render the template
      this.render(params);

      console.log(this.toJSON());
    },
    render: function(params) {
      t = this;
      el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template(params));
        el.fadeIn('fast');
      });
    },
    events: {
      "a.exit click": "end_quiz"
    },
    new_quiz_screen: function() {
    },
    end_quiz: function() {
      if (confirm("Are you sure you want to exit?")) {
        new EndQuizScreen({
          // TODO: Put the params here
        });
      }
    }
  });

  // View of the finish quiz screen
  var EndQuizScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#end-quiz-screen").text() ),

    initialize: function() {
      this.render();
    },
    render: function() {
      t = this;
      el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({}));
        el.fadeIn('fast');
      });
    }
  });

  // View of the quiz screen
  var PracticeScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#practice-screen").text() ),

    initialize: function() {
      this.render();
    },
    render: function() {
      t = this;
      el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({}));
        el.fadeIn('fast');
      });
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
      t = this;
      el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({}));
        el.fadeIn('fast');
      });
    }
  });

  // View of the goodbye screen
  var GoodByeScreen = Backbone.View.extend({
    el: "#hk-main",
    template: _.template( $("#goodbye-screen").text() ),

    initialize: function() {
      this.render();
    },
    render: function() {
      t = this;
      el = $(this.el);

      el.fadeOut('fast', function() {
        el.empty();
        el.html(t.template({}));
        el.fadeIn('fast');
      });

      // TODO: Exit via BB API
    },
  });

  hk = new HiraganaKatakanaTrainer();
  Backbone.history.start();
});
