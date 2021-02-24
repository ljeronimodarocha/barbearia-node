const { horariosService } = require('../services')
const hService = new horariosService();


class horariosController {

    static async buscaTodosHorarios(req, res) {
        try {
            return res.status(200).json(await hService.buscaTodosOsRegistros());
        } catch (error) {
            console.log(error);

            return res.status(404).json(error);
        }
    }
    static async adicionaHorariosLivres(req, res) {
        try {
            let horarios = req.body;
            horarios.id_usuario = req.user.id;
            return res.status(201).json(await hService.cria(horarios));
        } catch (error) {
            //console.log(erro);
            return res.status(500).json(error);
        }
    }
}
module.exports = horariosController