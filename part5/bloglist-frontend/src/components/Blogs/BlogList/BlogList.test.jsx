import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import BlogList from "./BlogList";

describe("BlogList tests", () => {
  test("blogs displayed author and title but without details", () => {
    const blogs = [
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

    const user = "mock user id";

    render(<BlogList blogs={blogs} user={user} />);
    const blog = blogs[0];

    const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`);
    const url = screen.getByText(blog.url, { exact: false });
    const likes = screen.getByText(blog.likes.toString(), { exact: false });

    [url, likes].forEach((detail) => {
      expect(detail).not.toBeVisible();
    });

    expect(titleAndAuthor).toBeDefined();
  });
});
