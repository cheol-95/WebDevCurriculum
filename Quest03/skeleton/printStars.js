const star = () => {
    const N = Number(prompt());

    let space = ' '.repeat(N);
    let stars = '*';
    
    for (let i=0; i<N; i++){
        space = space.slice(0, N-i-1);
        console.log(space + stars)
        stars += '**';
    }
}

star();

// for (let i = 0; i < N ; i++){
//     console.log(' '.repeat(N-i-1) + '*'.repeat(i*2+1))
// }