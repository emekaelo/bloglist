describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "test",
      username: "test",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
    });

    it("logs out successfully", function () {
      cy.get("#logout-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(187, 0, 0)");

      cy.get("html").should("not.contain", "Login successful");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();

      cy.get("#title").type("Cypress test blog");
      cy.get("#author").type("tester");
      cy.get("#url").type("test.com");
      cy.get("#create-blog").click();

      cy.contains("Cypress test blog");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Another cypress test blog",
          author: "tester1",
          url: "http://test.com",
        });
        cy.createBlog({
          title: "This blog has more likes",
          author: "tester1",
          url: "http://test.com",
        });
        cy.createBlog({
          title: "This blog has most likes",
          author: "tester1",
          url: "http://test.com",
        });
      });

      it("can like a blog", function () {
        cy.contains("Another cypress test blog").contains("show").click();
        cy.contains("Another cypress test blog")
          .parent()
          .find(".like-button")
          .as("likeButton");
        cy.get("@likeButton").click();
      });

      describe("blog deletion", function () {
        /* beforeEach(function () {
          cy.register({
            name: "test2",
            username: "test2",
            password: "password",
          });
        }); */

        it("can only be done by user who created it", function () {
          cy.contains("Another cypress test blog").contains("Delete").click();
          cy.get("html").should("not.contain", "Another cypress test blog");
        });

        it("cannot be done by user who did not create it", function () {
          cy.get("#logout-button").click();
          cy.register({
            name: "test2",
            username: "test2",
            password: "password",
          });

          cy.login({ username: "test2", password: "password" });
          cy.contains("Another cypress test blog").contains("Delete").click();
          cy.get(".error").should(
            "contain",
            "Error!, can't delete a blog you didn't create"
          );
          cy.contains("Another cypress test blog");
        });
      });

      it("can sort blogs from most likes to least likes", function () {
        cy.contains("Another cypress test blog").contains("show").click();
        cy.contains("Another cypress test blog")
          .parent()
          .find(".like-button")
          .as("likeButton");
        cy.get("@likeButton").click();
        cy.contains("This blog has more likes").contains("show").click();
        cy.contains("This blog has more likes")
          .parent()
          .find(".like-button")
          .as("likeButton");
        cy.get("@likeButton").click();
        cy.wait(1000);
        cy.get("@likeButton").click();
        cy.contains("This blog has most likes").contains("show").click();
        cy.contains("This blog has most likes")
          .parent()
          .find(".like-button")
          .as("likeButton");
        cy.get("@likeButton").click();
        cy.wait(1000);
        cy.get("@likeButton").click();
        cy.wait(1000);
        cy.get("@likeButton").click();
        cy.wait(1000);

        cy.contains("sort by likes high to low").click();
        cy.request("GET", "http://localhost:3003/api/blogs").then(
          (response) => {
            //console.log(response.body);
            let testBlogs = [...response.body];
            testBlogs.sort((a, b) => b.likes - a.likes);
            //console.log(testBlogs);
            // Checks if the first blog in the application is same as the first blog in the sorted array
            cy.get("#blog-content").first().contains(testBlogs[0].title);
          }
        );
      });
    });
  });
});
