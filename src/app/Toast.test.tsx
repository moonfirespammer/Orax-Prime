import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TOAST_MS, say, useToast } from '@/store/toast';
import { Toast } from './Toast';

describe('toast (prototype say())', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    act(() => {
      useToast.getState().clear();
    });
    vi.useRealTimers();
  });

  it('is an always-mounted status region that shows the overline and the line, gone after 3.2 s', () => {
    render(<Toast />);
    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toBeEmptyDOMElement();
    act(() => {
      say('City', 'Checked in at VivoCity. Quest done: a venue patch is waiting in your bag.');
    });
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText(/Checked in at VivoCity/)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(TOAST_MS - 1);
    });
    expect(screen.getByText('City')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(region).toBeEmptyDOMElement();
  });

  it('a new line replaces the current one and restarts the timer', () => {
    render(<Toast />);
    act(() => {
      say('OraX', 'First.');
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      say('OraX', 'Second.');
    });
    expect(screen.queryByText('First.')).not.toBeInTheDocument();
    expect(screen.getByText('Second.')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Second.')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('Second.')).not.toBeInTheDocument();
  });
});
