import axios from "axios";
import { render, screen } from "@testing-library/react";
import TodoListPage from "../todo-list.page";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TodoListPage", () => {
  test("отображает загрузку и затем список задач", async () => {
    // Arrange
    const mockTodos = [
      { id: 1, title: "Test Todo 1", completed: false },
      { id: 2, title: "Test Todo 2", completed: true },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });

    render(<TodoListPage />);

    // Начальное состояние — лоадер
    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();

    // Act + Assert: ждём появления данных
    expect(await screen.findByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();

    // Проверяем, что axios.get был вызван с правильным урлом
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/todos");

    // Лоадер должен исчезнуть
    expect(screen.queryByText(/Загрузка.../i)).not.toBeInTheDocument();
  });
}
);


