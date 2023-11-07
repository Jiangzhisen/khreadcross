const bcrypt = require('bcrypt');

async function hash(password) {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	}
    catch (err) {
		throw new Error('Password hashing failed');
	}
}

async function compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hash,
    compare
}