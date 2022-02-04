export default function sortByLength(answers) {
  const grouped = answers.reduce((obj, answer) => {
    const length = answer.length;

    if (!obj.hasOwnProperty(length)) obj[length] = [];

    obj[length].push(answer);

    return obj;
  }, {});

  return Object.values(grouped).flat();
}
