/* A real number A and an integer N (> 0) are given. 1 -  A  +  A^2  -  A^3  + ... + (-1)^N · A^N .*/
var i, A=2,n = 5,Serie=1;
for (i=1;i<=n; i++)
{
    if (i % 2==0)
    {
        Serie= Serie + Math.pow(A,i);
    }
    else
    {
        Serie = Serie -Math.pow(A,i);
    }
}
console.log(Serie);