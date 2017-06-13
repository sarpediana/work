function Euclid(x,y)
{
    var c;
    while (y) {
        c = x % y;
        x = y;
        y = c;
    }
    return x;
}

console.log(Euclid(9,50));