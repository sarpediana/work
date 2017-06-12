/* Elements of a circle are numbered as: 
1 — radius R, 2 — diameter 
D = 2·R, 3 — length 
L = 2·π·R of the circumference,
 4 — area S = π·R2. 
 The order number of one element 
 and its value (as a real number) are given. Output values of other 
 elements in the same order. Use 3.14 for a value of π.*/

var D, R = 10, L,S;
var n=4;
switch(n)
{
    case 1: 
        console.log(R);
        break;
    case 2 :
        D = 2*R;
        console.log(D);
        break;
    case 3:
        L=2*Math.PI*R;
        console.log(L);
        break;
    case 4:
        S=Math.PI*R*R;
        console.log(S);
}