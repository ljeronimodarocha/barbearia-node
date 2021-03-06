const { InvalidArgumentError } = require('../error/erros');
const { AgendamentoService } = require('../services')

const agendamentoService = new AgendamentoService();

class AgendamentoController {

    static async listaAgendamentos(req, res) {
        try {
            const where = {}
            return res.status(200).json(await agendamentoService.buscaTodos());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async adicionaAgendamento(req, res) {
        try {
            const agendamento = req.body;
            if (agendamento.dataInicial == "" || agendamento.tipo == "") {
                throw new InvalidArgumentError("Data ou tipo inválidos");
            }
            const novoAgendament = await agendamentoService.cria(agendamento, req.user);
            return res.status(201).json(novoAgendament);
        } catch (error) {
            if (error.name === "InvalidArgumentError") {
                return res.status(400).json(error.message);
            } else {
                return res.status(500).json(error.message);
            }
        }

    }
    static async atualizaAgendamento(req, res) {
        try {
            const { id } = req.params;
            const novoAgendamento = req.body;
            await agendamentoService.atualizaUmObjeto(novoAgendamento, { id })
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    static async pegaUmRegistro(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json(await agendamentoService.buscaUmRegistro({ id }));
        } catch (error) {

            return res.status(500).json(error.message);
        }
    }
    static async cancelarAgendamento(req, res) {
        try {
            const { id } = req.params;
            await agendamentoService.cancelarAgendamento(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}
module.exports = AgendamentoController;