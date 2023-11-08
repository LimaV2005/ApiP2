import conexao, { consulta } from "../database/conexao.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

///NOS REPOSITORIES, GUARDAR QUERYS E RESPOSTAS

class SelecaoRepository {
    // consulta = (sql, valores="", mensagemReject) => {
    //     return new Promise((resolve, reject) =>{
    //             conexao.query(sql, valores,  (erro, result) =>{
    //                 if(erro) return reject(mensagemReject)
    //                 const row = JSON.parse(JSON.stringify(result))
    //                 return resolve(row)
    //             })
    //         })

    async create(email, senha) {

        const hashedSenha = await bcrypt.hash(senha, 10);
        const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
        const values = [email, hashedSenha];

        return new Promise((resolve, reject) => {
            conexao.query(sql, values, (erro, result) => {
                if (erro) {
                    if (erro.code === 'ER_DUP_ENTRY') {
                        const row = `Email ${email} já cadastrado, tente alterar o email.`
                        
                        resolve(row)
                    } else {
                        reject('Não foi possível cadastrar');
                    }
                } else {
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, 
                        auth: {
                            user: "limag9006@gmail.com", 
                            pass: "qtna upxr kggp uxps" 
                        }
                    });
                    transporter.sendMail({
                        from: 'Limag9006 <limag9006@gmail.com>', 
                        to: 'julianneandrade578@gmail.com', 
                        subject: 'n trabalha nn?', 
                        text: 'Olá' + 'Julianne' + ', sua senha é:' + '', 
                        html: '' 
                    })
                        .then(() => console.log('Email enviado com sucesso'))
                        .catch((erro) => console.log(erro))
                    
                    const row = JSON.parse(JSON.stringify(result));
                    resolve(row);
                }
            });
        });
    }



    findAll() {
        const sql = 'SELECT * FROM usuarios;'
        return consulta(sql, 'Não foi possivel localizar')
    }

    findById(id) {
        const sql = "SELECT * FROM usuarios WHERE id=?;"
        return consulta(sql, id, 'Não foi possivel localizar')
    }



    update(email, id) {
        const sql = 'UPDATE usuarios SET ? WHERE id=?';

        return new Promise((resolve, reject) => {
            conexao.query(sql, [email, id], (erro, result) => {
                if (erro) {
                    reject('Não foi possível atualizar');
                } else {
                    const row = JSON.parse(JSON.stringify(result));
                    resolve(row);
                }
            });
        });
    }

    delete(id) {
        const sql = 'DELETE FROM usuarios WHERE id=?';

        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (erro, result) => {
                if (erro) {
                    reject('Não foi possível excluir');
                } else {
                    const row = JSON.parse(JSON.stringify(result));
                    resolve(row);
                }
            });
        });
    }

    // 
    login(email, senha) {
        const sql = 'SELECT * FROM usuarios WHERE email=?';

        return new Promise((resolve, reject) => {
            conexao.query(sql, [email], (erro, result) => {
                if (erro) {
                    reject('Falha na consulta');
                } else {
                    if (result) {
                        const row = JSON.parse(JSON.stringify(result[0]));
                        const senhaHash = row.senha;
                        bcrypt.compare(senha, senhaHash, (err, result) => {
                            if (err) {
                                reject('Erro ao comparar senhas');
                            } else if (result) {
                                const token = jwt.sign({
                                    email: row.email,
                                    id: row.id
                                },
                                    'segredo',
                                    {
                                        expiresIn: "1h"
                                    }
                                )
                                console.log('Logado com sucesso, token de sessão: ', token)
                                resolve({ user: row, token: token });
                            } else {
                                console.log('Comparação falhou: senha fornecida pelo usuario:', senha, 'senha no banco de dados:', senhaHash);
                                reject('Senha incorreta');
                            }
                        });
                    } else {
                        console.log('Nenhum usuário encontrado');
                        reject('Usuário não encontrado');
                    }
                }
            });

        });
    }




}

export default new SelecaoRepository