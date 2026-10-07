import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { You } from './You';

describe('You', () => {
  it('shows the player, the gem and city chips, bondmates, no Signature Dish yet, habits and the two actions', () => {
    const router = createMemoryRouter([{ path: '/you', element: <You /> }], { initialEntries: ['/you'] });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { name: 'You' })).toBeInTheDocument();
    expect(screen.getByText('Wen')).toBeInTheDocument();
    expect(screen.getByText('Stirrer')).toHaveStyle({ color: 'var(--class-stirrer)' });
    expect(screen.getByText('Mage')).toBeInTheDocument();
    expect(screen.getByText('Sapphire')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
    expect(
      screen.getByText('Sapphire Stirrer · 12 plates this month · gem locks at 00:00'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Mei · “Chilli”/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Dev · “Front Row”/ })).toBeInTheDocument();
    expect(screen.getByText('No Signature Dish yet. Cook one and keep it.')).toBeInTheDocument();
    expect(screen.getByText('Doubles the chilli ×4')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wardrobe' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change class' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });
});
