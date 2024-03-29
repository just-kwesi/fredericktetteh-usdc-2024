/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

const findSearchTerm = (searchTerm, book) => {
  //return an empty object if there are no pages to scan
  if (!book.Content.length) return [];

  const searchResult = [];

  book.Content.forEach((page) => {
    let text = page.Text;
    let searchTermFound = false;
    let searchTermIndex = text[0] === searchTerm[0] ? 1 : 0;

    for (let i = 1; i <= text.length; i++) {
      let searchChar = searchTerm[searchTermIndex];
      let textChar = text[i];
      let prevChar = text[i - 1];

      if (
        searchTermIndex === 0 &&
        prevChar.toLowerCase() != prevChar.toUpperCase()
      ) {
        continue;
      }

      if (searchChar === textChar) {
        searchTermIndex++;
      } else {
        searchTermIndex = 0;
      }

      //
      if (searchTermIndex === searchTerm.length && i === text.length - 1) {
        searchTermFound = true;
        break;
      } else if (
        searchTermIndex === searchTerm.length &&
        text[i + 1].toLowerCase() === text[i + 1].toUpperCase()
      ) {
        searchTermFound = true;
        break;
      }
    }

    if (searchTermFound) {
      searchResult.push({
        ISBN: book.ISBN,
        Page: page.Page,
        Line: page.Line,
      });
    }
  });

  return searchResult;
};

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  var result = {
    SearchTerm: '',
    Results: [],
  };

  result.SearchTerm = searchTerm;

  // return if there are no scanned books in the Obj
  if (!scannedTextObj.length) return result;

  //pass each book to a function that scans for the seacrh term
  scannedTextObj.forEach((book) => {
    //check for matches
    const bookResult = findSearchTerm(searchTerm, book);

    // add to results if there is any match
    if (bookResult.length) result.Results = [...result.Results, ...bookResult];
  });

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: 'Twenty Thousand Leagues Under the Sea',
    ISBN: '9780000528531',
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: 'now simply went on by her own momentum.  The dark-',
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: 'eyes were, I asked myself how he had managed to see, and',
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: 'the',
  Results: [
    {
      ISBN: '9780000528531',
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks('the', twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log('PASS: Test 1');
} else {
  console.log('FAIL: Test 1');
  console.log('Expected:', twentyLeaguesOut);
  console.log('Received:', test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks('the', twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log('PASS: Test 2');
} else {
  console.log('FAIL: Test 2');
  console.log('Expected:', twentyLeaguesOut.Results.length);
  console.log('Received:', test2result.Results.length);
}

/** check if result the capitazation is taken into account as different terms */
const test3Result = findSearchTermInBooks('Eyes', twentyLeaguesIn);
const test3ExpectedResult = {
  SearchTerm: 'Eyes',
  Results: [],
};
if (JSON.stringify(test3Result) === JSON.stringify(test3ExpectedResult)) {
  console.log('PASS: Test 3 (Capitalization is taken into account)');
} else {
  console.log('FAIL: Test 3');
  console.log('Expected:', twentyLeaguesOut.Results.length);
  console.log('Received:', test3ExpectedResult.Results.length);
}

/** check if the results contains at least, the search term if no matches are found
 *  or there are no books to search
 */
const test4Term = 'Romeo';
const test4Result = findSearchTermInBooks(test4Term, twentyLeaguesIn);
if (test4Term === test4Result.SearchTerm) {
  console.log('PASS: Test 4 (Result should contain at least the search term)');
} else {
  console.log('FAIL: Test 4');
  console.log('Expected:', test4Term);
  console.log('Received:', test4Result.SearchTerm);
}

/** search if it doesn't only work with words */
const test5Result = findSearchTermInBooks('now simply went', twentyLeaguesIn);
const test5ExpectedResult = {
  SearchTerm: 'now simply went',
  Results: [
    {
      ISBN: '9780000528531',
      Page: 31,
      Line: 8,
    },
  ],
};
if (JSON.stringify(test5Result) === JSON.stringify(test5ExpectedResult)) {
  console.log('PASS: Test 5 (Function should not only consider words)');
} else {
  console.log('FAIL: Test 5');
  console.log('Expected:', test5ExpectedResult.Results);
  console.log('Received:', test5Result.Results);
}
