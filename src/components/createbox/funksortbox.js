export const  funksortbox = (boxs) => {
    
    const hwtype = boxs.map(val => {
        return val.hw_type
    })

    const type = hwtype.filter((elem, index, array) => array.indexOf(elem) === index)

    let boxsSort = []

    type.forEach(vtype => {
        const active = false
        const add = false
        const type = 0
        let arr = []
        boxs.forEach(val => {
            if(val.hw_type !== 'GrBox' && vtype === val.hw_type) {
                arr.push(val)
            }
        })

        if(arr.length !== 0) {
            boxsSort.push({
                active: active,
                add: add,
                type: type,
                box: arr
            })
        }

    });

    return boxsSort
}
/**
    id(pin):18
    hw_type(pin):"sun"
    label(pin):"Солнце"
    name(pin):"S2W"
    desc_short(pin):"Светодиодный светильник холодный белый"
    desc_long(pin):"Светильник холодного белого света. В холодном белом свете присутствует излучение всех длин волн."
    param1(pin):"20Вт"
    param2(pin):"5000К"
    select_type(pin):2
    permounth(pin):35
    perhour(pin):1
    available(pin):0
 */