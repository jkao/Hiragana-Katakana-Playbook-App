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
      console.log("Created a character");
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

  var HiraganaCollection = Backbone.Collection.extend({
    model: Character
  });

  var KatakanaCollection = Backbone.Collection.extend({
    model: Character
  });

  var QuizCollection = Backbone.Collection.extend({
    model: Character
  });

  // Model object representing the Japanese Quiz
  var Quiz = Backbone.Model.extend({
  });

  // Main game routing object
  var HiraganaKatakanaTrainer = Backbone.Router.extend({
    routes: {
      "": "start",
      "quiz": "quiz",
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

    quiz: function() {
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

  // Collection object holding a few Characters to test
  var CharacterCollection = {};

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
        el.html(t.template({}));
        el.fadeIn('fast');
      });
    },
    events: {
    }
  });

  // View of the quiz screen
  var QuizScreen = Backbone.View.extend({});

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
