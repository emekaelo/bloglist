(this.webpackJsonppart1 = this.webpackJsonppart1 || []).push([
  [0],
  {
    36: function (e, t, n) {},
    37: function (e, t, n) {
      "use strict";
      n.r(t);
      var c = n(0),
        a = n(1),
        r = n(12),
        o = n.n(r),
        s = n(3),
        i = n(4),
        u = n.n(i),
        d = "/api/persons",
        l = {
          getAll: function () {
            return u.a.get(d).then(function (e) {
              return e.data;
            });
          },
          create: function (e) {
            return u.a.post(d, e).then(function (e) {
              return e.data;
            });
          },
          deleteItem: function (e) {
            return u.a.delete("".concat(d, "/").concat(e));
          },
          update: function (e, t) {
            return u.a.put("".concat(d, "/").concat(e), t);
          },
        },
        f = function (e) {
          var t = e.notify;
          return t
            ? Object(c.jsx)("div", {
                className: t.type,
                children: Object(c.jsx)("p", { children: t.message }),
              })
            : null;
        },
        j = function (e) {
          var t = e.searchName,
            n = e.handleSearchNameChange;
          return Object(c.jsxs)("div", {
            children: [
              "Search:",
              Object(c.jsx)("input", { value: t, onChange: n }),
            ],
          });
        },
        h = function (e) {
          var t = e.newName,
            n = e.newNumber,
            a = e.handleNameChange,
            r = e.handleNumberChange,
            o = e.addName;
          return Object(c.jsxs)("form", {
            children: [
              Object(c.jsxs)("div", {
                children: [
                  "name: ",
                  Object(c.jsx)("input", { value: t, onChange: a }),
                  Object(c.jsx)("br", {}),
                  "number: ",
                  Object(c.jsx)("input", { value: n, onChange: r }),
                ],
              }),
              Object(c.jsx)("div", {
                children: Object(c.jsx)("button", {
                  type: "submit",
                  onClick: o,
                  children: "add",
                }),
              }),
            ],
          });
        },
        b = function (e) {
          var t,
            n,
            a = e.person,
            r = e.setPersons,
            o = e.persons,
            s = e.notifyUserWith;
          return Object(c.jsxs)("li", {
            children: [
              a.name,
              " ",
              a.number,
              " ",
              Object(c.jsx)("button", {
                onClick:
                  ((t = a.id),
                  (n = a.name),
                  function () {
                    window.confirm(
                      "Are you sure you want to delete ".concat(n, "?")
                    ) &&
                      l
                        .deleteItem(t)
                        .then(function (e) {
                          var c = o.filter(function (e) {
                            return e.id !== t;
                          });
                          r(c),
                            s(
                              "".concat(n, " successfully deleted"),
                              "success-notification"
                            );
                        })
                        .catch(function (e) {
                          s(
                            "Sorry, ".concat(
                              n,
                              " may have been deleted from the database"
                            ),
                            "error-notification"
                          ),
                            r(
                              o.filter(function (e) {
                                return e.id !== t;
                              })
                            );
                        });
                  }),
                children: "Delete",
              }),
            ],
          });
        },
        m = function (e) {
          var t = e.persons,
            n = e.setPersons,
            a = e.notifyUserWith;
          return Object(c.jsx)("ul", {
            children: t.map(function (e) {
              return Object(c.jsx)(
                b,
                { persons: t, person: e, setPersons: n, notifyUserWith: a },
                e.id
              );
            }),
          });
        },
        O = function () {
          var e = Object(a.useState)([]),
            t = Object(s.a)(e, 2),
            n = t[0],
            r = t[1],
            o = Object(a.useState)(n),
            i = Object(s.a)(o, 2),
            u = i[0],
            d = i[1],
            b = Object(a.useState)(""),
            O = Object(s.a)(b, 2),
            p = O[0],
            v = O[1],
            x = Object(a.useState)(""),
            g = Object(s.a)(x, 2),
            y = g[0],
            N = g[1],
            w = Object(a.useState)(""),
            C = Object(s.a)(w, 2),
            S = C[0],
            k = C[1],
            P = Object(a.useState)(null),
            U = Object(s.a)(P, 2),
            W = U[0],
            A = U[1];
          Object(a.useEffect)(function () {
            l.getAll().then(function (e) {
              r(e), d(e);
            });
          }, []);
          var I = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "success-notification";
            A({ message: e, type: t }),
              setTimeout(function () {
                A(null);
              }, 5e3);
          };
          return Object(c.jsxs)("div", {
            children: [
              Object(c.jsx)(f, { notify: W }),
              Object(c.jsx)(j, {
                searchName: S,
                handleSearchNameChange: function (e) {
                  k(e.target.value);
                  var t = u.filter(function (t) {
                    return t.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  });
                  r(t);
                },
              }),
              Object(c.jsx)("h2", { children: "Phonebook" }),
              Object(c.jsx)(h, {
                newName: p,
                newNumber: y,
                addName: function (e) {
                  e.preventDefault();
                  var t = { name: p, number: y };
                  if (
                    n.some(function (e) {
                      return e.name === p;
                    })
                  ) {
                    var c = n.find(function (e) {
                      return e.name === p;
                    });
                    window.confirm(
                      "".concat(
                        p,
                        " is already in phonebook, do you want to replace the number?"
                      )
                    ) &&
                      l
                        .update(c.id, t)
                        .then(function (e) {
                          r(
                            n.map(function (t) {
                              return t.id !== c.id ? t : e.data;
                            })
                          ),
                            I(
                              "".concat(p, " successfully updated"),
                              "success-notification"
                            );
                        })
                        .catch(function (e) {
                          I(
                            "".concat(e.response.data.error),
                            "error-notification"
                          );
                        });
                  } else
                    l.create(t)
                      .then(function (e) {
                        r(n.concat(e)),
                          I(
                            "".concat(p, " successfully added"),
                            "success-notification"
                          );
                      })
                      .catch(function (e) {
                        I(
                          "".concat(e.response.data.error),
                          "error-notification"
                        );
                      });
                  v(""), N("");
                },
                handleNameChange: function (e) {
                  v(e.target.value);
                },
                handleNumberChange: function (e) {
                  N(e.target.value);
                },
              }),
              Object(c.jsx)("h2", { children: "Numbers" }),
              Object(c.jsx)(m, {
                persons: n,
                setPersons: r,
                notifyUserWith: I,
              }),
            ],
          });
        };
      n(36);
      o.a.render(Object(c.jsx)(O, {}), document.getElementById("root"));
    },
  },
  [[37, 1, 2]],
]);
//# sourceMappingURL=main.e305233a.chunk.js.map
