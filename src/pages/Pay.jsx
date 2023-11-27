import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios"

const Pay = () => {
    const KEY = `pk_test_51NdDARSIe3OvtRfjMdafGWfv8geT8lGqPEj6wK8VCsk5J2WhJOf7elHfI8mAAKOeuSmd9B3jGiQuq3YGVuZ5VX1a00bCcyQcjP`
    const [stripeToken, setStripeToken] = useState(null)

    // const history = useHistory()
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${KEY}`
        };

        const makeRequest = async () => {
            try {
                const res = await axios.post("https://react-ecommerce-dbgk.onrender.com/api/v1/checkout/payment", { tokenId: stripeToken.id, amount: 2000 }, { headers })
                console.log("response data", res)
                // history.push("/success")
            } catch (error) {
                console.log("payment error", error)
            }
        }

        stripeToken && makeRequest()

    }, [stripeToken])

    const onToken = (token) => {
        setStripeToken(token)
        console.log("stripe token", token)
    }

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {stripeToken ? <span>Processing.Please wait...</span> : <StripeCheckout
                name='Lama Shop'
                billingAddress
                amount={2000}
                stripeKey={KEY}
                token={onToken}
                image='https://avatars.githubusercontent.com/u/1486366?v=4'
                shippingAddress
                description='your total is $20'>

                <button style={{ border: "none", width: 120, borderRadius: 5, padding: "20px", backgroundColor: "black", color: "white", fontWeight: "600", cursor: "pointer" }}>Pay Now</button>
            </StripeCheckout >
            }
        </div>
    )
}

export default Pay