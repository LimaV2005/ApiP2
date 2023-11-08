import mysql from 'mysql'

const conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'toor',
  database: 'projeto1'
});


conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
    
  }
})
/**
 *executa um codigo sql com ou sem valores 
 * @param {string} sqL instrução sql a ser executada
 * @param {string=id / [selecao, id]} valores valores a serem passados para o SQL
 * @param {string} mensagemReject mensagem a ser exibida no caso de reject
 * @returns objeto da promise
 */

export const consulta = (sql, valores="", mensagemReject) => {
    return new Promise((resolve, reject) =>{
            conexao.query(sql, valores,  (erro, result) =>{
                if(erro) return reject(mensagemReject)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
}

export default conexao