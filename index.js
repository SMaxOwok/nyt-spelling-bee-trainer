// Groups array elements in an object by length
const groupByLength = answers => (
  answers.reduce((obj, answer) => {
    const length = answer.length;

    if (!obj.hasOwnProperty(length)) obj[length] = [];

    obj[length].push(answer);

    return obj;
  }, {})
);

// Fetches answers from NYTBee.com
const fetchAnswers = async () => {
  return fetch('https://cors-anywhere.herokuapp.com/https://nytbee.com')
    .then(response => response.text())
    .then(html => {
      const domparser = new DOMParser();
      const doc = domparser.parseFromString(html, 'text/html');

      return Array.from(doc.querySelectorAll("#main-answer-list ul li")).map(node => node.innerText.trim());
    })
    .catch(error => {
      alert('Error fetching NYT Bee data');
      console.log(error);
    });
}

fetchAnswers().then(answers => {
  if (answers.length === 0) return;

  const grouped = groupByLength(answers);
  const answerKey = document.createElement('ul');
  answerKey.classList.add('sb-wordlist-items');

  // Make list items for each word and insert into answer key
  Object.values(grouped).forEach(words => (
    words.forEach(word => {
      const listItem = document.createElement('li');
      listItem.style.webkitTextSecurity = 'disc';

      const innerSpan = document.createElement('span');
      innerSpan.classList.add('sb-anagram');
      innerSpan.innerText = word;

      listItem.appendChild(innerSpan);
      answerKey.appendChild(listItem);
    })
  ));

  const listContainer = document.querySelector('.sb-wordlist');
  const gameList = listContainer.querySelector('.sb-wordlist-items');
  const score = document.querySelector('.sb-wordlist-summary');

  // Add the total word count to the score
  const totalWords = document.createElement('span');
  totalWords.innerText = ` (${answers.length} total)`;
  score.appendChild(totalWords);

  // Hide default UI list
  gameList.style.display = 'none';

  // Display all currently guessed words in answer key
  gameList.querySelectorAll('.sb-anagram').forEach(node => {
    const answerKeyItems = Array.from(answerKey.querySelectorAll('.sb-anagram'));
    const answerKeyItem = answerKeyItems.find(item => item.innerText.trim() === node.innerText.trim());
    if (!answerKeyItem) return;

    answerKeyItem.style.webkitTextSecurity = 'none';
  });

  // Attach the answer key in place of the default UI list
  listContainer.appendChild(answerKey);

  // Instantiate an observer on the game list to see when a newly guessed word is added.
  // When one is, reveal the matching one in the answer key list.
  const observer = new MutationObserver(mutation => {
    const answerKeyItems = Array.from(answerKey.querySelectorAll('[style*="webkit-text-security: disc"]'));
    const answerKeyItem = answerKeyItems.find(item => {
      const match = item.innerHTML.match(/>(?<word>.*)</); // disc style makes innerText •s, so that no longer works here
      if (!match) return false;
      
      return match[1].trim() === mutation[0].addedNodes[0].innerText.trim();
    });
    if (!answerKeyItem) return;

    answerKeyItem.style.webkitTextSecurity = 'none';
  });

  // Start the observer
  observer.observe(gameList, { childList: true });
});
