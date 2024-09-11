//Paciência e uma boa prova. Que a Força esteja com você!
//import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.
import http from 'node:http'

const PORT = 3333
const livros = []
const autores = []
const editoras = []

const server = http.createServer((request, response)=>{
    const {method, url} = request

    if(url === '/editoras' && method === "GET"){//Buscar todos os usuários

        response.setHeader('content-Type', 'application/json')
        response.end(JSON.stringify(editoras))
    
    }else if(url.startsWith('/livros/') && method === 'GET'){//Buscar único usuários
        const livroId = url.split('/')[2]
        const livro = livros.find((livro)=> livro.id == livroId)

        if(livro){
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(livro));
        }else{
            response.writeHead(404, {"Content-Type":"application/json"});
            response.end(JSON.stringify({message: "Usuário não encontrado"}));
        }

    }else if(url === '/livros' && method == "POST"){//cadastrar um livro
        let body = ''
        request.on('data' ,(chunk)=>{
            body += chunk.toString()
        })
        request.on('end', () =>{
            const newLivro = JSON.parse(body)
            newLivro.id = livros.length + 1
            livros.push(newLivro)
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(newLivro))
        }) 
    }else if(url === '/autores' && method == "POST"){//cadastrar um Autor
        let body = ''
        request.on('data' ,(chunk)=>{
            body += chunk.toString()
        })
        request.on('end', () =>{
            const newAutor = JSON.parse(body)
            newAutor.id = autores.length + 1
            autores.push(newAutor)
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(newAutor))
        }) 
    }else if(url === '/editoras' && method == "POST"){//cadastrar uma Editora
        let body = ''
        request.on('data' ,(chunk)=>{
            body += chunk.toString()
        })
        request.on('end', () =>{
            const newEditora = JSON.parse(body)
            newEditora.id = editoras.length + 1
            editoras.push(newEditora)
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(newEditora))
        })

    }else if(url.startsWith('/editoras/') && method === 'PUT'){//Atualizar um usuário 
        const editoraId = url.split("/")[2]

        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on('end', ()=> {
            const uptadeEditora = JSON.parse(body)
            const index = editoras.findIndex((editora)=> editora.id == editoraId)
            if(index !== -1){//atualizar
                editoras[index] = {...editoras[index], uptadeEditora}
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(editoras[index]))
            }else{//retornar erro
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "Erro ao tentar atualizar!"}))
            }
        })


    } else if (url.startsWith('/autores/') && method === 'DELETE') { // Deletar um usuário
        const autorId = url.split('/')[2];
        const index = autores.findIndex((autor) => autor.id == autorId);
    
        if (index !== -1) { // Usuário encontrado, então deletar
            autores.splice(index, 1);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Usuário deletado com sucesso" }));
        } else { // Usuário não encontrado, retornar erro
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Usuário não encontrado" }));
        }
    } else { // Recurso não encontrado
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Recurso não encontrado" }));
    }
    
    })

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta${PORT}`)
})
