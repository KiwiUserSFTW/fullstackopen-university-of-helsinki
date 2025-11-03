import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import BlogList from "./BlogList";
import userEvent from "@testing-library/user-event";

let blogs;

describe("BlogList tests", () => {
  beforeEach(() => {
    // to be sure in immutability before every test
    blogs = [
      {
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
      },
    ];
  });
  // details is likes and urls
  test("blogs displayed author and title but without details", () => {
    const userId = "mock user id";

    render(<BlogList blogs={blogs} user={userId} />);
    const blog = blogs[0];

    const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`);
    const url = screen.getByText(blog.url, { exact: false });
    const likes = screen.getByText(blog.likes.toString(), { exact: false });

    [url, likes].forEach((detail) => {
      expect(detail).not.toBeVisible();
    });

    expect(titleAndAuthor).toBeDefined();
  });
  test("details are shown when the button 'show' has been clicked", async () => {
    const userId = "mock user id";
    render(<BlogList blogs={blogs} user={userId} />);
    const blog = blogs[0];

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
});
