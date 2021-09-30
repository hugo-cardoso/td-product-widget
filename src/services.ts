import type { Product } from "./types";

type GetProductMetafieldsResponse = {
  data: {
    product: {
      cor: {
        value: string;
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            busto: {
              value: number;
            },
            cintura: {
              value: number;
            },
            quadril: {
              value: number;
            },
            comprimento: {
              value: number;
            }
          }
        }>
      }
    }
  }
}

export const getProduct = async (): Promise<Product> => {
  let url = window.location.pathname + '.js';
  if (process.env.NODE_ENV === 'development') url = 'http://www.todadelicadinha.com.br/products/vestido-raquel-terra-cota.js';

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getProductMetafields = async (handle: string): Promise<GetProductMetafieldsResponse> => {
  let url = 'https://toda-delicadinha.myshopify.com/api/2021-10/graphql.json';

  const query = `
    {
      product(handle: "${ handle }") {
        cor: metafield(namespace: "my_fields", key: "cor") {
          value
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              busto: metafield(namespace: "my_fields", key: "medida_do_busto") {
                value
              }
              cintura: metafield(namespace: "my_fields", key: "medida_da_cintura") {
                value
              }
              quadril: metafield(namespace: "my_fields", key: "medida_do_quadril") {
                value
              }
              comprimento: metafield(namespace: "my_fields", key: "medida_de_comprimento") {
                value
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_KEY as string
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  return data;
}

export const addToCart = async (variantId: number): Promise<void> => {
  const formData = {
    'items': [{
      'id': variantId,
      'quantity': 1
    }]
  };

  await fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(response => response.json())
}