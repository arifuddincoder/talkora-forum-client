import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		setLoading(true);

		const card = elements.getElement(CardElement);
		if (!card) {
			setLoading(false);
			return;
		}

		try {
			const { data: clientSecretData } = await axiosSecure.post("/create-payment-intent", { price });
			const clientSecret = clientSecretData.clientSecret;

			const { paymentMethod, error } = await stripe.createPaymentMethod({
				type: "card",
				card,
				billing_details: {
					email: user?.email,
					name: user?.displayName || "Anonymous",
				},
			});

			if (error) {
				toast.error(error.message);
				setLoading(false);
				return;
			}

			const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: paymentMethod.id,
			});

			if (confirmError) {
				toast.error(confirmError.message);
				setLoading(false);
				return;
			}

			if (paymentIntent.status === "succeeded") {
				await axiosSecure.patch(`/users/membership/${user.email}`, { isMember: true });

				await axiosSecure.post("/payments", {
					email: user.email,
					amount: price,
					transactionId: paymentIntent.id,
					paymentMethod: "Stripe",
				});

				toast.success("Payment successful! You're now a Gold Member 🎉");

				card.clear();
			}
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<CardElement className="border p-3 rounded-md" />
			<button
				type="submit"
				disabled={!stripe || loading}
				className={`w-full py-2 px-4 rounded text-white transition ${
					loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
				}`}
			>
				{loading ? "Processing..." : `Pay $${price}`}
			</button>
		</form>
	);
};

export default CheckoutForm;
