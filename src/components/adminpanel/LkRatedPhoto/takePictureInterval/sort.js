export const sortarr = (arr) => {
    let res = null
    arr.forEach(element => {
        if(element.param === '_photo_light') {
            res = element
        }
    });

    return res
}