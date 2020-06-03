const codeChallengeService = {
  getUser(knex, id){
    return knex.raw(`
    SELECT *
    FROM "user"
    WHERE id = ${id};`)
  },

  getAllUser(knex){
    return knex.raw(`
    SELECT *
    FROM "user";`)
  },

  insertUser(knex, newUser){
    return knex.raw(`
    BEGIN;

    INSERT INTO "user" (username)
    VALUES
    ('${newUser.username}');

    SELECT id
      FROM "user"
      WHERE username = '${newUser.username}';

    COMMIT;`)
  },

  insertContact(knex, newUser, id){
    return knex.raw(`
    INSERT INTO "contact" (user_id, phone_number, email_address, preferred_contact_method)
    VALUES
    (${id}, '${newUser.phone_number}', '${newUser.email_address}', '${newUser.preferred_contact_method}');`)
  },

  deleteUser(knex, id){
    return knex.raw(`
    BEGIN;

    DELETE FROM "contact" WHERE user_id = ${id};

    DELETE FROM "user" WHERE id = ${id};

    COMMIT;`)
  },

  updateContact(knex, id, method){
    return knex.raw(`
    UPDATE "contact"
    SET "preferred_contact_method" = '${method}'
    WHERE user_id = ${id};`)
  }
}

module.exports = codeChallengeService;