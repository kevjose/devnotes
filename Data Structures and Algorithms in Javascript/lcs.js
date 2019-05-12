function lcs(wordX, wordY) {
  const m = wordX.length;
  const n = wordY.length;
  const l = [];
  for (let i = 0; i <= m; i++) {
    l[i] = [];
    solution = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0;
      solution[i][j] = '0';
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        solution[i][j] = 'diagonal';
      } else {
        const a = l[i - 1][j];
        const b = l[i][j - 1];
        l[i][j] = a > b ? a : b;
        solution[i][j] = l[i][j] === l[i - 1][j] ? 'top' : 'left';
      }
    }
  }
  return l[m][n];
}
