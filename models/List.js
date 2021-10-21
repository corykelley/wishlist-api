const db = require('../db/config');

class List {
	constructor(list) {
		this.id = list.id || null;
		this.title = list.title;
		this.date_created = list.start_date || new Date();
	}

	static getAll() {
		return db
			.manyOrNone(
				`SELECT * FROM lists
        ORDER BY date_created ASC`
			)
			.then((lists) => {
				return lists.map((list) => new this(list));
			});
	}

	static getById = (id) => {
		return db
			.oneOrNone(
				`SELECT * FROM lists
        WHERE id = $1`,
				parseInt(id)
			)
			.then((list) => {
				if (list) return new this(list);
				throw new Error(`List ${id} not found!`);
			});
	};

	save() {
		return db
			.one(
				`INSERT INTO lists
        (title, date_created)
        VALUES ($/title/, $/date_created/)
        RETURNING *`,
				this
			)
			.then((list) => Object.assign(list));
	}

	update(changes) {
		Object.assign(this, changes);
		return db
			.one(
				`UPDATE lists SET
        title = $/title/
        WHERE id = $/id/
        RETURNING *`,
				this
			)
			.then((list) => {
				return Object.assign(this, list);
			});
	}

	delete() {
		return db.none(
			`DELETE FROM lists
      WHERE id = $1`,
			this.id
		);
	}
}

module.exports = List;
