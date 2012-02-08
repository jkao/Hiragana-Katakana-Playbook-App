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
      if !(character && pronounciation && type) {
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

  // Collection object holding a few Characters to test
  var CharacterCollection = {};

  // View of the start menu
  var StartScreen = Backbone.View.extend({});

  // View of the quiz screen
  var QuizScreen = Backbone.View.extend({});

  // View of the about screen
  var AboutScreen = Backbone.View.extend({});

  // View of the goodbye screen
  var GoodByeScreen = Backbone.View.extend({});

  // Main
  window.initialize_game = function() {
    // Start the game!
  }

  window.initialize_game();
});
