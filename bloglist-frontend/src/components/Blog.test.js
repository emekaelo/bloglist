import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
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
