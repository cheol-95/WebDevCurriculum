// const star = () => {
//     const N = Number(prompt());

//     let space = ' '.repeat(N);
//     let stars = '*';
    
//     for (let i=0; i<N; i++){
//         space = space.slice(0, N-i-1);
//         console.log(space + stars)
//         stars += '**';
//     }
// }

// star();

const repeatString = (char, count) => {
    return char.repeat(count)
}

const printLine = (N, current) => {
    return repeatString(' ' ,N-current-1) + repeatString('*' ,current*2+1);
}

const star = () => {
    const N = Number(prompt());

    for (let i=0; i<N; i++){
        console.log(printLine(N, i));
    }
}

star()