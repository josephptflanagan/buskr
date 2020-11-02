import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './Stripe.css';

function handleToken(token) {
	console.log(token);
	if (!token) {
		console.log('no, there is not a token');
	} else {
		console.log('yes, there is a token');
	}
}

export default class TakeMoney extends React.Component {
	onToken = (token) => {
		fetch('/save-stripe-token', {
			method : 'POST',
			body   : JSON.stringify(token)
		}).then((response) => {
			response.json().then((data) => {
				alert(`We are in business, ${data.email}`);
			});
		});
	};

	// ...

	render() {
		return (
			// ...
			<StripeCheckout
				className="mt-1 mb-2"
				token={handleToken}
				stripeKey="pk_test_51HhIATKzbiTfOHlAPGr5hBe93NaRX36cCUlefbd2B372BBCtZZZ5xIpc9SHEkt4PuZCJZP08LZkGbyq2S3s0owR000bga50gZJ"
				label="Donate with Stripe"
				amount={199}
			/>
		);
	}
}
