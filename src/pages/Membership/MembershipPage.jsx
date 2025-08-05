import React, { useEffect } from "react";
import CheckoutForm from "../../components/Form/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Container from "../../components/Shared/Container";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MembershipPage = () => {
	useEffect(() => {
		document.title = "Membership | Talkora Forum";
	}, []);
	const price = 10;

	return (
		<Container>
			<div className="bg-[#F7F7F7] py-10">
				<div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
					<h2 className="text-2xl font-bold text-center mb-4">Become a Gold Member</h2>
					<p className="text-center text-gray-600 mb-6">
						Unlock more features like posting more than 5 posts by becoming a Gold Member.
					</p>
					<div className="text-center text-lg font-semibold text-green-600 mb-4">
						Pay ${price} to become a gold member
					</div>
					<Elements stripe={stripePromise}>
						<CheckoutForm price={price} />
					</Elements>
				</div>
			</div>
		</Container>
	);
};

export default MembershipPage;
