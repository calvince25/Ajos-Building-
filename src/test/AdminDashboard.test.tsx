import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../app/components/AdminDashboard';
import { supabase } from './__mocks__/supabaseClient';

// Override the actual supabaseClient with our mock
vi.mock('../app/supabaseClient', async () => {
  const mod = await import('./__mocks__/supabaseClient');
  return { supabase: mod.supabase };
});

describe('AdminDashboard Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AdminDashboard onClose={() => {}} />);
    expect(container).toBeTruthy();
  });

  it('shows login screen initially when no session exists', async () => {
    render(<AdminDashboard onClose={() => {}} />);
    // Verify login elements exist
    expect(await screen.findByText('Client Portal Login')).toBeInTheDocument();
  });
});
