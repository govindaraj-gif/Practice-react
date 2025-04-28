import { Children, createContext, ReactNode, useContext, useState } from "react"
import { Item } from "react-bootstrap/lib/Breadcrumb"


type ShoppingCartProviderProps = {
    children:ReactNode
}

type ShoppingCartContext = {
    getItemQuantity:(id:number) => number,
    increaseItemQuantity:(id:number) => void,
    decreaseItemQuantity:(id:number) => void,
    removeFromCart:(id:number) => void,
    openCart:() => void
    closeCart:() => void
    cartQuantity: number
    cartItems:CartItem[]
}

type CartItem = {
    id:number,
    quantity:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find((item) => item.id == id)?.quantity || 0;
    }   

    function increaseItemQuantity(id:number){
        setCartItems(curItems => {
            if(curItems.find(item => item.id == id) == null) {
                return [...curItems , { id, quantity : 1}]
            }
            return curItems.map(item => {
                if(item.id == id) {
                    return {...item , quantity:item.quantity + 1}
                }
                return item
            })
        })
    }

    function decreaseItemQuantity(id:number){
        setCartItems(curItems => {
            if(curItems.find(item => item.id == id)?.quantity == 1) {
                return curItems.filter(item => item.id != id)
            }
            return curItems.map(item => {
                if(item.id == id) {
                    return {...item , quantity:item.quantity - 1}
                }
                return item
            })
        })
    }

    function removeFromCart(id:number) {
        setCartItems(curItems => {
            return curItems.filter(item => item.id !== id)
        })
    }
    
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,0
    )

    return <ShoppingCartContext.Provider value={{getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart,
        cartItems, cartQuantity, openCart, closeCart
    }}>
            {children}
        </ShoppingCartContext.Provider>
}
