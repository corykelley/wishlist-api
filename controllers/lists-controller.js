const List = require('../models/List');

const listsController = {
	index(req, res, next) {
		List.getAll()
			.then((lists) => {
				res.json({
					message: 'ok',
					lists,
				});
			})
			.catch(next);
	},

	create(req, res, next) {
		new List({
			title: req.body.title,
			id: req.body.id,
			date_created: req.body.start_date,
			// TODO: Lists belong to users?
		})
			.save()
			.then((list) => {
				res.status(201).json({
					message: 'List was successfully created!',
					list,
				});
			})
			.catch(next);
	},

	show(req, res, next) {
		List.getById(req.params.id)
			.then((list) => {
				res.json({
					message: 'ok',
					list,
				});
				console.log(list);
			})
			.catch(next);
	},

	update(req, res, next) {
		List.getById(req.params.id)
			.then((list) => {
				list.update({
					title: req.body.title,
				});
			})
			.then((list) => {
				res.json({
					message: 'List updated!',
					list,
				});
			})
			.catch(next);
	},

	delete(req, res, next) {
		List.getById(req.params.id)
			.then((list) => list.delete())
			.then(() => {
				res.json({
					message: 'List deleted!',
				});
			})
			.catch(next);
	},
};

module.exports = listsController;
