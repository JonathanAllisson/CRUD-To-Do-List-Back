exports.up = (knex) => {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('Description').notNullable();
    table.string('icon').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('tasks');
};
