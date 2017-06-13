// suma 1^N  + 2^N -1  + ... +  N^1 .
var n=5, sum=0;
for (i = n,j=1; i>1,j<=n; i--,j++)
{
    sum +=Math.pow(j,i);
}
console.log(sum);