const { TipoService } = require('../services')

const tipoService = new TipoService();

class tipoController {

    static async criaTipo(req, res) {
        const user = req.user;
        const tipoBody = req.body;
        const tipo = {
            nome: tipoBody.nome,
            tempo: parseFloat(tipoBody.tempo),
        }
        if (user.tipo !== "funcionario") {
            return res.status(401).json();
        }
        try {
            const json = await tipoService.cria(tipo)
            return res.status(201).json(json);
        } catch (error) {
            const objErrors = {};
            error.errors.map((e) => {
                objErrors[e.path] = e.message;
            });
            console.log('====================================');
            console.log(objErrors);
            console.log('====================================');
            return res.status(422).json(objErrors);
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