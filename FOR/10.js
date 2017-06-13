/*
Given an integer N (> 0), find the value of a following sum (as a real number): + 1/2 + 1 1/3 + ... + 1 / N .*/
var i,n=4, suma=0;
for (i=2;i<=n;i++)
{
    suma +=1/i;
}
console.log(suma);