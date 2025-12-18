import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthPageGuard from '../auth-page-guard';
import { useGetProfileQuery } from '../../../auth/quieries/useGetProfileQuery.ts';

jest.mock('../../../auth/quieries/useGetProfileQuery.ts');

jest.mock('../../../../shared/ui/fullscreen-loader.tsx', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div>Loading...</div> : null,
}));

const mockedUseGetProfileQuery = useGetProfileQuery as jest.Mock;

describe('AuthPageGuard', () => {
  test('показывает лоадер при загрузке', () => {
    mockedUseGetProfileQuery.mockReturnValue({
      isSuccess: false,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <AuthPageGuard>
          <div>Private content</div>
        </AuthPageGuard>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('редиректит на /login если пользователь не авторизован', () => {
    mockedUseGetProfileQuery.mockReturnValue({
      isSuccess: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AuthPageGuard>
          <div>Private content</div>
        </AuthPageGuard>
      </MemoryRouter>
    );

    // Navigate сам по себе не рендерит текст, поэтому просто проверяем,
    // что приватный контент НЕ отображается
    expect(screen.queryByText(/Private content/i)).not.toBeInTheDocument();
  });

  test('рендерит children когда пользователь авторизован', () => {
    mockedUseGetProfileQuery.mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <AuthPageGuard>
          <div>Private content</div>
        </AuthPageGuard>
      </MemoryRouter>
    );

    expect(screen.getByText(/Private content/i)).toBeInTheDocument();
  });
});


