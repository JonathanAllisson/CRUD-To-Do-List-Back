exports.up = (knex) => {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
