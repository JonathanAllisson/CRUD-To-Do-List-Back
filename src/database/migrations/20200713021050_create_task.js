exports.up = (knex) => {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('icon').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('tasks');
};
