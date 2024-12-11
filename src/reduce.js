const arr = [1, 2, 3, 4, 5]




const newArr = arr.reduce((pre, val, valIdx) => {
    return pre + val;
}, 0)



console.log(newArr)