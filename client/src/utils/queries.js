import gql from 'graphql-tag';

export const QUERY_VIBES = gql`
	{
		vibes {
			_id
			name
		}
	}
`;

export const QUERY_CREATORS = gql`
	query getCreators($vibe: ID) {
		creators(vibe: $vibe) {
			_id
      firstName
      lastName
      bandName
      imgUrl
      location
      bio
      vibes {
          _id
        }
		}
	}
`;

// export const QUERY_CREATORS = gql`
// {
//   creators {
//     _id
//     firstName
//     lastName
//     bandName
//     imgUrl
//     location
//     bio
//     vibes {
//       _id
//     }
//   }
// }
// `;



export const QUERY_ALL_PRODUCTS = gql`
	{
		products {
			_id
			name
			description
			price
			quantity
			category {
				name
			}
		}
	}
`;

export const QUERY_CATEGORIES = gql`
	{
		categories {
			_id
			name
		}
	}
`;

export const QUERY_USER = gql`
	{
		user {
			firstName
			lastName
			orders {
				_id
				purchaseDate
				products {
					_id
					name
					description
					price
					quantity
					image
				}
			}
		}
	}
`;

export const QUERY_CHECKOUT = gql`
	query getCheckout($products: [ID]!) {
		checkout(products: $products) {
			session
		}
	}
`;
