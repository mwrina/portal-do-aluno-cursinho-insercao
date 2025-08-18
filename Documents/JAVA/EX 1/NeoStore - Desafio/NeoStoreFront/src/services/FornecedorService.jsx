import api from './api';

/*essa constante vai ser um objeto que vai agrupar todas as funções de comunicação da api*/

const FornecedorService = {

    // page núemro da página, size é a qtd de itens por página
    getAll: (page = 1, size = 5) => {
        return api.get(`/fornecedores?page=${page}&size=${size}`);
    },

    //busca o fornecedor específico
    getById: (id) => {
        return api.get(`/fornecedores/${id}`);
    },

    //data seria o objeto javascript com os dados do fornecedor
    create: (data) => {
        return api.post('/fornecedores', data);
    },

    update: (id, data) => {
        return api.put(`/fornecedores/${id}`, data);
    },

    delete: (id) => {
        return api.delete(`/fornecedores/${id}`);
    },

    import: (data) => {
        return api.post('/fornecedores/importar', data);
    }
};

export default FornecedorService;