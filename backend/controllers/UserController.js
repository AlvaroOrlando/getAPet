const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body;

        //validations 
        if(!name){
            res.status(422).json({
                message: 'O nome é obrigatório'
            })
            return
        }
        if(!email){
            res.status(422).json({
                message: 'O e-mail é obrigatório'
            })
            return
        }
        if(!phone){
            res.status(422).json({
                message: 'O telefone é obrigatório'
            })
            return
        }
        if(!password){
            res.status(422).json({
                message: 'A senha é obrigatório'
            })
            return
        }
        if(!confirmPassword){
            res.status(422).json({
                message: 'A confirmação de senha é obrigatório'
            })
            return
        }

        if(password !== confirmPassword){
            res.status(422).json({
                message: 'A senha e a confirmação de senha não conferem'
            })
            return
        }

        //check if user exists
        const userExists = await User.findOne({email});

        if(userExists){
            res.status(422).json({
                message: 'Usuário já existe'
            })
            return
        }

        //create password hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        });

        //save user
        try { 
            const newUser = await user.save();

            await createUserToken(newUser, req,res);

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao criar usuário'
            })
        }
            
    }

    //login
    static async login(req, res) {

        const { email, password } = req.body;

        if(!email){
            res.status(422).json({
                message: 'O e-mail é obrigatório'
            })
            return
        }
        if(!password){
            res.status(422).json({
                message: 'A senha é obrigatório'
            })
            return
        }
          //check if user exists
          const user = await User.findOne({email});

          if(!user){
              res.status(422).json({
                  message: 'Usuário não encontrado!'
              })
              return
          }

            //check if password is correct
            const checkPassword = await bcrypt.compare(password, user.password);
            if(!checkPassword){
                res.status(422).json({
                    message: 'Senha Incorreta!'
                })
                return
            }

            await createUserToken(user, req, res);
    }
}
