const CURREMCY_FORMATER = new Intl.NumberFormat(undefined , {
    currency:"INR", style:"currency"
})

export function formatCurrency(number:string){
    return CURREMCY_FORMATER.format(Number(number))
}