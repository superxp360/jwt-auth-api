import { db } from './dbConnect.js'

const coll = db.collection('users')

export async function signup(req, res) {
    const { email, password } = req.body 
    await coll.insertOne({ email: email.toLowerCase(), password }) //bad to store password in plain text
    login(req, res)

}

export async function login(req, res){
    const { email, password} = req.body
    let user = await coll.findOne ({ email: email.toLowerCase(), password })
    delete user.password // stip out password
    //TODO: create toekn and send with user below
    res.send({ user })
}