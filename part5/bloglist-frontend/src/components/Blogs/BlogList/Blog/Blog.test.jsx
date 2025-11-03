import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

let blog;

describe("Blog tests", () => {
  beforeEach(() => {
    // to be sure in immutability before every test
    blog = {
      title: "Shells",
      author: "Waves",
      url: "ocean.com",
      likes: 0,
      user: {
        username: "Fish nicy",
        name: "Fish",
        id: "68ff9f88897773a133daccbe",
      },
      __v: 0,
      id: "68ff9f88897773a133daccc0",
    };
  });
  // details are likes and urls
  test("blogs displayed author and title but without details", () => {
    render(<Blog blog={blog} />);

    const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`);
    const url = screen.getByText(blog.url, { exact: false });
    const likes = screen.getByText(blog.likes.toString(), { exact: false });

    [url, likes].forEach((detail) => {
      expect(detail).not.toBeVisible();
    });

    expect(titleAndAuthor).toBeDefined();
  });
  test("details are shown when the button 'show' has been clicked", async () => {
    render(<Blog blog={blog} />);

    const url = screen.getByText(blog.url, { exact: false });
    const likes = screen.getByText(blog.likes.toString(), { exact: false });

    // not showing before clicking
    [url, likes].forEach((detail) => {
      expect(detail).not.toBeVisible();
    });

    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    // showing after clicking
    [url, likes].forEach((detail) => {
      expect(detail).toBeVisible();
    });
  });
  test("check the like button clicked twice", async () => {
    /*
        note for exercise 4.15
        i have mocked the services module because, in my implementation
        the Blog component contains the update function inside itself.
        when the handleLike function runs inside Blog, it calls setBlogs
        but only after a successful response from the update function.
        that’s why i mocked the service, to simulate a successful update
        and to be able track how many times the user click button.
        */
    vi.mock("../../../../services/blogs", () => ({
      default: {
        update: vi.fn().mockResolvedValue({ id: "abc123", likes: 1 }),
        deleteOne: vi.fn(),
      },
    }));

    const mockHandler = vi.fn();
    const mockNotificationHendler = vi.fn();

    const user = userEvent.setup();

    render(
      <Blog
        blog={blog}
        setBlogs={mockHandler}
        setNotification={mockNotificationHendler}
      />
    );

    const showButton = screen.getByText("show");
    await user.click(showButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
