import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import './cart.css'

const initialState = {
    success: false,
    message: "",
};

async function submitOrder(previousState, formData) {
    // Simulate async request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        success: true,
        message: `Order for ${formData.get("name")} has been submitted!`,
    };
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="submit-btn"
            disabled={pending}
        >
            {pending ? "Sending..." : "Send"}
        </button>
    );
}

export default function Cart() {
    const [state, formAction] = useActionState(
        submitOrder,
        initialState
    );

    return (
        <div className="container">
            <form action={formAction}>
                <div className="grid">

                    {/* Cart */}
                    <div className="cart-panel">
                        <div className="section-title">Your Items</div>

                        <div className="cart-row">
                            <span className="cart-name">MailABom #1</span>
                            <span className="cart-price">$12.99</span>
                        </div>

                        <div className="cart-row">
                            <span className="cart-name">MailABom #2</span>
                            <span className="cart-price">$7.99</span>
                        </div>

                        <div className="cart-total-row">
                            <span>Total</span>
                            <span>$20.98</span>
                        </div>

                        <button
                            type="button"
                            className="clear-cart-btn"
                        >
                            Clear cart
                        </button>
                    </div>

                    {/* Customer info */}
                    <div>
                        <div className="section-title">Info</div>

                        <div className="field">
                            <input
                                name="name"
                                type="text"
                                placeholder="Name, Surname"
                                required
                            />
                        </div>

                        <div className="field">
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+380XXXXXXXXX"
                                required
                            />
                        </div>

                        <div className="field">
                            <input
                                name="instructions"
                                type="text"
                                placeholder="Special Instructions"
                            />
                        </div>
                    </div>

                    {/* Delivery */}
                    <div>
                        <div className="section-title">Delivery</div>

                        <div className="field">
                            <div className="field-label">Way to deliver</div>

                            <select
                                name="delivery"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Choose delivery
                                </option>
                                <option>Courier</option>
                                <option>Pickup</option>
                                <option>Post</option>
                            </select>
                        </div>

                        <div className="field">
                            <div className="field-label">Address</div>

                            <input
                                name="address"
                                type="text"
                                placeholder="City, Street"
                                required
                            />
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <div className="section-title">Payment</div>

                        <label className="radio-row">
                            <input
                                type="radio"
                                name="payment"
                                value="pickup"
                                required
                            />
                            On pickup
                        </label>

                        <label className="radio-row">
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                            />
                            Card
                        </label>
                    </div>

                    {/* Extras */}
                    <div>
                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="register"
                            />
                            Register
                        </label>

                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                name="no_call"
                                defaultChecked
                            />
                            The decision is final, don't call me back.
                        </label>
                    </div>

                </div>

                <SubmitButton />

                {state.message && (
                    <p
                        style={{
                            marginTop: "20px",
                            textAlign: "center",
                            color: state.success ? "limegreen" : "tomato",
                        }}
                    >
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}