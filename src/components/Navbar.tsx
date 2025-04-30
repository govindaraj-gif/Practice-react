import { Button, Container, Nav, Navbar as NavBarbs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/shpooigCartContext"

export function Navbar (){
    const { openCart, cartQuantity } = useShoppingCart();

    return (
        <NavBarbs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>
                {cartQuantity > 0 && ( 
                    <Button 
                    onClick={openCart}
                    style={{width : "3rem", height:"3rem",position:'relative'}}
                    variant="outline-primary" className="rounded-circle"
                >
                    <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="shopping-cart"/>

                    <div className="rounded-circle bg-danger d-flex justify-content-center" style={{color:"white", 
                        width:"1.5rem",height:"1.5rem" , position:"absolute", bottom:0,right:0,
                        transform:"translate(25%, 25%)"
                    }}>
                        { cartQuantity }
                    </div>
                </Button>
                )}
            </Container>
        </NavBarbs>
    )
}