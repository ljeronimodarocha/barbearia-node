const { TipoService } = require('../services')

const tipoService = new TipoService();

class tipoController {

    static async criaTipo(req, res) {
        const user = req.user;
        const tipoBody = req.body;
        const tipo = {
            tempo: parseFloat(tipoBody.tempo),
            nome: tipoBody.nome
        }
        if (user.tipo !== "funcionario") {
            return res.status(401).json();
        }
        try {
            return res.status(201).json(tipoService.cria(tipo));
        } catch (error) {
            return res.status(500).json(error);
        }

    }
    static async listaTipos(req, res) {
        try {
            return res.status(200).json(await tipoService.buscaTodosOsRegistros());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }


}

module.exports = tipoController;