import { useProducts } from '@/provider/product.provider'
import { type JSX } from 'react'

export default function Index(): JSX.Element {
  const { products } = useProducts()

  return (
    <>
      {products?.map((product) => (
        <div key={product.name}>
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </>
  )
}
