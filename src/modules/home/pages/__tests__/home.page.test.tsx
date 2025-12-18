import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import HomePage from '../home.page';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

jest.mock('../../../auth/quieries/useGetProfileQuery.ts', () => ({
  useGetProfileQuery: () => ({
    data: { name: 'Test User' },
    isLoading: false,
    isSuccess: true,
  }),
}));

describe('HomePage', () => {
  test('рендерит заголовок и имя пользователя', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/Home page/i)).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  test('содержит ссылку на Test page', () => {
    renderWithProviders(<HomePage />);

    const link = screen.getByRole('link', { name: /Go to Test page/i });
    expect(link).toHaveAttribute('href', '/home/test');
  });
});


