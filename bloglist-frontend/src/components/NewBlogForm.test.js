import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

test("form calls event handler with the right details", () => {
  const mockHandler = jest.fn();

  const component = render(<NewBlogForm createBlog={mockHandler} />);

  const form = component.container.querySelector("#new-blog-form");
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  fireEvent.change(title, { target: { value: "form testing" } });
  fireEvent.change(author, { target: { value: "tester" } });
  fireEvent.change(url, { target: { value: "test.com" } });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler).toHaveBeenCalledWith({
    author: "tester",
    title: "form testing",
    url: "test.com",
  });
});
