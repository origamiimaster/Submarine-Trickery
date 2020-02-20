const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))
module.exports = {
    createUser({ username, password }) {
        console.log(`Add user ${username} with password ${password}`)
        const { salt, hash } = saltHashPassword({ password })
        return knex('user').insert({
            salt,
            encrypted_password: hash,
            username
        })
    },//Add authentication via select where instead of calling back encrypted hash to js server. 
    authenticate({ username, password }) {
        console.log(`Authenticating user ${username}`)
        return knex('user').where({ username })
            .then(([user]) => {
                if (!user) return { success: false }
                const { hash } = saltHashPassword({
                    password,
                    salt: user.salt
                })
                return { success: hash === user.encrypted_password }
            })
    },
    //Useless upon further inspection will deal with later
    //Ignore above comment
    generateCookie({ username, password }) {
        console.log(`generating a cookie for user ${username}`)
        const { salt, hash } = saltHashPassword({ password })
        return hash
    }
}
function saltHashPassword({ password, salt = randomString() }) {
    const hash = crypto
        .createHmac('sha512', salt)
        .update(password)
    return {
        salt,
        hash: hash.digest('hex')
    }
}
function randomString() {
    return crypto.randomBytes(4).toString('hex')
}
