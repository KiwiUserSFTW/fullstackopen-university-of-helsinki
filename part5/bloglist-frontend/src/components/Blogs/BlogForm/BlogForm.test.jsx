import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("BlogForm tests", () => {
  test("new blog form calls handler", async () => {
    /*
        note for exercise 5.16
        i have mocked the services module because, in my implementation
        the BlogForm component contains the handleSubmit function inside itself.
        when the handleSubmit function runs inside Blog, it calls setBlogs
        but only after a successful response from the create function.
        that’s why i mocked the service, to simulate a successful create
        and to be able track how many times the user click button.
    */
    vi.mock("../../../services/blogs", () => ({
      default: {
        create: vi
          .fn()
          .mockResolvedValue({ title: "test", author: "test", url: "test" }),
        deleteOne: vi.fn(),
      },
    }));

    const mockHandler = vi.fn();
    const user = userEvent.setup();

    render(
      <BlogForm
        setBlogs={mockHandler}
        setNotification={() => {}}
        onClose={() => {}}
      />
    );

    // fields
    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    // filling the fields
    for (const input of [titleInput, authorInput, urlInput]) {
      await user.type(input, "test");
    }

    const submitButton = screen.getByText("submit");
    await user.click(submitButton);

    expect(mockHandler.mock.calls).toHaveLength(1);

    const mockHandlerCallback = mockHandler.mock.calls[0][0];
    const mockHandlerCallbackResult = mockHandlerCallback([]);

    expect(mockHandlerCallbackResult[0]).toMatchObject({
      title: "test",
      author: "test",
      url: "test",
    });
  });
});
