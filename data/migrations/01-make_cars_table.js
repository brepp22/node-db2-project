exports.up =  function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', table => {
    table.increments()
    table.string('vin').notNullable().unique()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').unsigned().notNullable()
    table.string('title')
    table.string('transmission')
  })

};

exports.down =  function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
