import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /next\.js with jenkins ci\/cd/i,
    })
    
    expect(heading).toBeInTheDocument()
  })
  
  it('renders the description text', () => {
    render(<Home />)
    
    const description = screen.getByText(/this application is automatically built, tested, and deployed using jenkins!/i)
    
    expect(description).toBeInTheDocument()
  })
})
