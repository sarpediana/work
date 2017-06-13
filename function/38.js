function power(A,n)
{
    var fac;
    if (n==0){
        fac=1;
    }
    else if (n>0)
    {
       fac = Math.pow(A,n);
       return fac;
      
    }
    else
    {
        fac = 1/Math.pow(A,n);
    }
    return(fac);
}
console.log(power(5,-5));
