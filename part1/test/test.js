const t = [[1, 2], [3, 4], [5, 6]]

const modify = t.map((a, b)=>{
    a += 2
    b += 1
    // console.log(a)
    console.log(b)
    return (b, a)
})

modify.forEach(value=>{
    console.log(value)
})