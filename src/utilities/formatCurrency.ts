const CURREMCY_FORMATER = new Intl.NumberFormat(undefined , {
    currency:"INR", style:"currency"
})

export function formatCurrency(number:number){
    return CURREMCY_FORMATER.format(number)
}