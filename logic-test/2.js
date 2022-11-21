let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let format2 = /[!.?]/;
let format3 = /[-]/;

function wordCount(string) {
    let splitString = string.split(' ');
    let res = 0;
    // console.log(splitString);
    splitString.forEach(el => {
        if(format.test(el) === false) {
            res++;
        } else if (format.test(el) === true && format2.test(el[el.length-1]) === true) {
            res++;
        } else if (format.test(el) === true && el.split('').includes('-') && format3.test(el[el.length-1]) === false && format3.test(el[0]) === false ) {
            res++;
        }
    })
    // console.log(res);
    return res
}

let input = 'Berapa u(mur minimal[ untuk !mengurus ktp?';
// let input = 'Saat meng*ecat tembok, Agung dib_antu oleh Raihan.';
// let input = 'Kemarin Shopia per[gi ke mall.';
// let input = 'Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda';
console.log(wordCount(input));