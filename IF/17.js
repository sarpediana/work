var a= 10, b =9 , c = 8;
if ((a<b)&&(b<c) || (c<b)&&(b<a))
{
    a=a*2;
    b=b*2;
    c=c*2;
    console.log(a,b,c);
}
else
{
    a =-a;
    b = -b;
    c = -c;
    console.log(a,b,c);
}