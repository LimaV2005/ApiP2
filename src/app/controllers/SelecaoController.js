import SelecaoRepository from "../repositories/SelecaoRepository.js"
// NOS CONTROLLERS GUARDAR AÇÕES OU NECESSIDADES - pegar dados 
class SelecaoController {


    async index(req, res) {
        const row = await SelecaoRepository.findAll()
        res.json(row)
    }

    async show(req, res) {
        const { id } = req.params
        const row = await SelecaoRepository.findById(id)
        res.json(row, )
    }

    async store(req, res) {
        const email = req.body.email
        const senha = req.body.senha
        const row = await SelecaoRepository.create(email, senha)
        res.json(row)
    }

    async update(req, res) {
        const {id} = req.params
        const email = req.body
        const row = await SelecaoRepository.update(email, id)
        res.json(row)
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const row = await SelecaoRepository.delete(id);
            res.json(row);
        } catch (error) {
            console.error('Erro ao excluir seleção:', error);
            res.status(500).json({ error: 'Erro ao excluir seleção' });
        }
    }

    async login(req, res, next) {
        const email = req.body.email
        const senha = req.body.senha
        const row = await SelecaoRepository.login(email,senha)
        res.json(row)
        console.log('Usuario logado ->', email, 'Senha: ', senha)
    }

    
}



//padrão singleton
export default new SelecaoController()

  


    