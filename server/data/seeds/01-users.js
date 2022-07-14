exports.seed = function (knex) {
  return knex("users").insert(
    [
      { email: "hemanth@gmail.com" },
    ],
    "id"
  );
};
