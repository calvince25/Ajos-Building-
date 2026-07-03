import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from '../app/App';

// Mock matchMedia for carousel and other components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <MemoryRouter initialEntries={['/']}>
      {children}
    </MemoryRouter>
  </HelmetProvider>
);

describe('App Routing', () => {
  it('renders home page without crashing', () => {
    const { container } = render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    expect(container).toBeTruthy();
  });

  it('renders navigation links', () => {
    render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });
});
