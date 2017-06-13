var i;
function bisect(anul)
{
    var n;
if (anul%4==0 && anul %100 !=0 && anul || 400==0)
{
    n=true;
}
else
    n=false;

return(n);
}

i=bisect(1980);
console.log(i);