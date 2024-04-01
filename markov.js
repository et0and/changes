/**
 * MarkovText object for generating text in a markov-like way
 * @param {Number} WordDepth Depth of each key
 * @param {String} Text (Optional) Text to learn from
 */
function MarkovText(wordDepth, text) {
    // Essentially the n in n-gram
    this.wordDepth = wordDepth || 2;
    this.words = {};

    if (text) {
        this.learn(text);
    }
}

/**
 * "Learn" word by word from a given text
 * @param {String} Text Text to learn from (best with minimal special characters)
 */
MarkovText.prototype.learn = function(text) {
    // Break up the text into individual words by spaces
    const newWords = text.split(" ");

    for (let i = 0; i < newWords.length - this.wordDepth; i++) {
        let key = "";
        for (let k = 0; k < this.wordDepth - 1; k++) {
            key += newWords[i + k] + " ";
        }

        // Make sure a key with these word(s) exists
        if (!this.words[key]) {
            this.words[key] = {
                __m: 0
            }
        }

        // See if there's an object with this key followed by the next word
        if (!this.words[key][newWords[i + this.wordDepth - 1]]) {
            this.words[key][newWords[i + this.wordDepth - 1]] = {
                __i: this.words[key].__m,
                __o: 1 // max index is index + occurrences
            }
        } else {
            this.words[key][newWords[i + this.wordDepth - 1]].__o++;
        }

        // Shift all __m values above this up by one (unless it is this)
        for (const prop in this.words[key]) {
            if (this.words[key][prop].__i >= this.words[key][newWords[i + this.wordDepth - 1]].__i && prop !== newWords[i + this.wordDepth - 1]) {
                this.words[key][prop].__i++;
            }
        }

        this.words[key].__m++;
    }
}

// ... (rest of the MarkovText class methods)
