import { Router } from "express";
import SelecaoController from "./app/controllers/SelecaoController.js";
import loginverify from "./app/controllers/middleware/loginverify.js"
//GUARDAR AS ROTAS
const router = Router()

//modo de uso: router.metodo-requisição('/endpoint', Ação)
router.get('/', (req, res)=>{
    res.send('Raiz projeto')
})

router.get('/all', SelecaoController.index) // rota mostrar todos os usuarios

router.get('/one/:id', loginverify ,SelecaoController.show) // rota de mostrar usuario pelo id

router.post('/cadastro', SelecaoController.store) // cadastrar usuario

router.put('/cadastro/put/:id', SelecaoController.update) // mudar dado de usuario

router.delete('/cadastro/:id', SelecaoController.delete) // DELETAR USUARIO

router.post('/login', SelecaoController.login) // rota de login



export default router
