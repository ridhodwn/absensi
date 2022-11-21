function sold(arr) {
    let arr2 = [];
    for(let i=0; i<arr.length; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr2.push(arr[i]);
                break;
            }
        }
    }

    let counts = {};
    for (const num of arr2) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // console.log(counts);

    const values = Object.values(counts);
    const sum = values.reduce((accumulator, value) => {
        if(value > 1) {
            value = Math.floor((value+1) / 2);
        }
        return accumulator + value;
    }, 0);

    return sum;
}

arr =  [10, 20, 20, 10, 10, 30, 50, 10, 20];
console.log(sold(arr));