import app from "./app.js"
// ESCUTAR A PORTA
const PORT = process.env.PORT || 3010

// fazer a conexao

        app.listen(PORT, ()=> {
        console.log(`Servidor rodando no ${PORT}`)
        console.table(        {
        'API': 'CRUD USERS',       
        'port':PORT,
        'host':`http://localhost:${PORT}`})
})




