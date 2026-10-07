import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Digest } from './Digest';

describe('the digest (the prototype’s DIGEST section)', () => {
  it('shows exactly seven moments, then the end, then Back to Today', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        { path: '/today/digest', element: <Digest /> },
        { path: '/today', element: <p>Today body</p> },
      ],
      { initialEntries: ['/today/digest'] },
    );
    const { container } = render(<RouterProvider router={router} />);
    expect(
      screen.getByText(
        'Seven moments a day: your party, and one from the city. When you reach the end, you are done.',
      ),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('main > div').length).toBe(8); // seven moments and the end card
    expect(screen.getByText('Mei plated Nasi lemak · 3 emeralds · “Comforting”')).toBeInTheDocument();
    expect(screen.getByText('12:40 · Build-A-Dish')).toBeInTheDocument();
    expect(screen.getByText(/^Best plate in Singapore today/)).toBeInTheDocument();
    expect(screen.getByText("That's all for today")).toBeInTheDocument();
    expect(screen.getByText('Nothing more arrives until 00:00. Go and cook something.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back to Today' }));
    expect(router.state.location.pathname).toBe('/today');
  });
});
