const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const listsRouter = require('./routes/lists-routes');

app.use('/api/lists', listsRouter);

app.use('*', (req, res) => {
	res.status(404).send({
		error: 'Not Found',
	});
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send({
		err,
		message: err.message,
		stack: err.stack,
	});
});
