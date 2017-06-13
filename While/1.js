//Find the largest integer K such that the sum 1 + 2 + … + K is less than or equal to N .
var sum=0,k=1,n=5;

while (k<=n)
{
    sum = sum+k;
    k++;
}
console.log(sum);
