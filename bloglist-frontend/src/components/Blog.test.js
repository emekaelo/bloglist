import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

test("renders only title and author by default", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Me",
    url: "someurl.com",
    likes: 3,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(component.container).toHaveTextContent("Me");
  expect(component.container).not.toHaveTextContent("someurl.com");
  expect(component.container).not.toHaveTextContent(3);
});

test("renders url and likes when show button is clicked", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Me",
    url: "someurl.com",
    likes: 3,
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByTestId("visible-btn");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("someurl.com");
  expect(component.container).toHaveTextContent(3);
});

test("clicking like button calls event handler twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Me",
    url: "someurl.com",
    likes: 3,
  };

  const mockHandler = jest.fn();
  //mockHandler.mockReturnValue("blog");

  const component = render(<Blog blog={blog} updateLike={mockHandler} />);

  const button = component.getByTestId("visible-btn");
  fireEvent.click(button);

  const likeButton = component.getByTestId("like-btn");
  /* likeButton.onclick = jest.fn((scalar) => 42 + scalar);
  likeButton.onclick(0);
  likeButton.onclick(1); */
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
