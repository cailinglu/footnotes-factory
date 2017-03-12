var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

var footnotes = [];

fs.readFileAsync('text.md')
  .then(function(response) {
    return response.toString(); // Turning the response from a buffer to a string
  })
  .then(getFootnotes) // Saving the contents of the footnotes in an array
  .then(replaceFootnotes) // Replacing inline footnotes with '[^NUMBER]'
  .then(function(text) {
    fs.writeFileAsync('text.md', text) // Rewriting the file with edited inline footnotes
      .then(function() {
        return editFootnotes(footnotes); // Creating footnotes in the form of '[^NUMBER]: FOOTNOTE CONTENT'
      })
      .then(appendFootnotes) // Appending those edited footnotes to the bottom of the file
      .catch(function(error) {
        console.log('There was an error while appending footnotes:', error);
      });
  })
  .catch(function (error) {
    console.log('There was an error while replacing footnotes:', error);
  });


/////////////
// HELPERS //
/////////////

var regex = /\[\^.+?\]/g;

// Save footnote contents to an array
function getFootnotes(text) {
  // Array of footnotes from file
  footnotes = text.match(regex);
  return Promise.resolve(text); // Returns text unmodified
}

// Creating footnotes in the form of '[^NUMBER]: FOOTNOTE CONTENT'
function editFootnotes(footnotes) {
  footnotes.forEach(function(footnote, index) {
    footnotes[index] = footnote.slice(0, 2) + (index + 1) + ']: ' + footnote.slice(2, footnote.length - 1);
  });
  return Promise.resolve(footnotes);
}

function appendFootnotes(footnotes) {
  footnotes = footnotes.join('\n');
  footnotes = '\n' + footnotes; // Add a newline before the footnotes
  fs.appendFileAsync('text.md', footnotes)
    .catch(function(error) {
      console.log('There was an error while appending footnotes:', error);
    });
}

// Replacing inline footnotes with '[^NUMBER]'
function replaceFootnotes(text) {
  var count = 1;
  text = text.replace(regex, function(match) {
    return '[^' + (count++) + ']';
  });

  return Promise.resolve(text); // Returns text with inline footnotes edited
}

/*
Regex:

/\[\^.+\]/: Catches footnotes in the form of [^Some text here for the footnote.]

*/
