import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../ProductCard'

const sample = {
  id: 't1',
  name: 'Test Product',
  mrpPrice: 100,
  discountPercent: 10,
  currentPrice: 90,
  description: 'A test product',
  image: 'https://images.unsplash.com/photo-1518444026307-8a7a9f3f0d9b?q=80&w=800&auto=format&fit=crop&crop=entropy',
  affiliateUrl: 'https://example.com/test'
}

describe('ProductCard', () => {
  it('renders name, price and button', () => {
    render(<ProductCard product={sample} />)
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
  expect(screen.getByText(/₹90/)).toBeInTheDocument()
    const btn = screen.getByRole('link', { name: /View Deal/i })
    expect(btn).toHaveAttribute('href', 'https://example.com/test')
  })
})
