import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../login.page';

const mockLogin = jest.fn();
const mockAddToken = jest.fn();

jest.mock('../../quieries/useLoginMutation.ts', () => ({
  useLoginMutation: () => ({
    isPending: false,
    mutate: mockLogin,
  }),
}));

jest.mock('../../store/auth.store.ts', () => ({
  useAuthStore: () => ({
    addToken: mockAddToken,
  }),
}));

function renderWithProviders() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('рендерит форму логина', () => {
    renderWithProviders();

    expect(screen.getByRole('heading', { name: /sign-in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('показывает alert, если поля пустые', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(window.alert).toHaveBeenCalled();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('отправляет данные при заполненных полях', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith(
      { email: 'test@example.com', password: 'password123' },
      expect.any(Object)
    );
  });
});


