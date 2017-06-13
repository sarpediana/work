/*A real number X and an integer N (> 0) are given. Compute the expression
1 − X2/(2!) + X4/(4!) − … + (−1)N·X2·N/((2·N)!*/
 var j,i,Serie=1,f=1, n=4;
 var x=2;
 for (i=2,j=1; i<n,j<n; i+=2,j++)
 {      
     f*=i;
     if (j % 2!=0)
     {
        Serie = Serie -(Math.pow(x,i))/f;
     }
     else
     {
         Serie =Serie +(Math.pow(x,i))/f;
     }
 }
 console.log(Serie);