var caut, nr, i, j;
var matr = [2, 4, 1, 6, 7, 3, 5, 8];
var n = matr.length;
var este = [];
var rez = true;
for (i = 0; i < n; i++) {
    if (este[matr[i]]) {
        console.log(matr[i] + ' se repeta');
        break;
    } else {
        este[matr[i]] = 1;
    }
}