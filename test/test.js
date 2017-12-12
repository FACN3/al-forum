const test = require("tape");

test("sample test", (t) => {
  let actual = 2;
  t.equal(actual, 2, "this test should pass");
  t.end();
});
