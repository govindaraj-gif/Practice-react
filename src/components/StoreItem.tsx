import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/shpooigCartContext";

type StoreItemProps = {
    id:number,
    name:string,
    price:number,
    url:string
}

export const StoreItem : React.FC<StoreItemProps> = ({id, name, price, url } : StoreItemProps) => {
    const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id);

    return( 
    <Card className="h-100">
        <Card.Img variant="top" src={url} height="200px" style={{objectFit:"cover"}}/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between 
                align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{ formatCurrency(price)}</span>
            </Card.Title>

            <div className="mt-auto">
                {quantity === 0 ? <Button className="w-100" onClick={() => increaseItemQuantity(id)}>+ Add To Cart</Button> 
                : <div className="d-flex align-items-center flex-column"
                 style={{gap:".5rem"}}> 
                 <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                    <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                    <div>
                        <span className="fs-3">{quantity}</span> in cart
                    </div>
                    <Button onClick={() => increaseItemQuantity(id)}>+</Button>
                </div>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                </div>  
                } 
            </div>
        </Card.Body> 
    </Card>
    )
}