// server.mjs
import { createServer } from 'node:http';
import fs from 'node:fs';
import querystring from 'querystring';

const server = createServer((req, res) => {
    // Mapping our website
    var url = req.url;
    var fileName = "";
    var fichero = "Fichero.txt"

    if (url === "/form") {
        fileName = "form.html";
    } else if (url === "/thanks") {
        fileName = "thanks.html";
    } else {
        fileName = "index.html";
    }

    // Reading our website
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.write("No existe esta web");
            res.end();
        } else {
            res.write(data.toString());
            res.end();
        } 
    });

    // Reading data from form
    if (req.method === 'POST' && req.url === '/form') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); //Collecting chunks
        });

        req.on('end', () => {
            const formData = querystring.parse(body);
            //console.log('Full request body:', body);

            // printing the data on console
            var format = `Nombre: ${formData.nombre} | Email: ${formData.email} | Telefono: ${formData.telefono} | Experiencia: ${formData.experiencia} | Puesto: ${formData.puesto} \n`;
            console.log(format);

            // check if new file already exits
            if (fs.existsSync(fichero)) {
                // reading txt and adding new data
                /*fs.readFile(fichero, "utf-8", (err, format) => {
                    if (err) {
                        console.log("Ha habido un error al leer el archivo.");
                    } else {
                        fs.appendFile(fichero, format, (err) => {
                            if (err) {
                                console.log("Ha habido un error al añadir el nuevo contenido.");
                            } else {
                                console.log('Contenido añadido.');
                            }
                        });
                    }
                });
                format = '';*/
            } else {
                // printing the data on txt
                fs.writeFile(fichero, format, (err) => {
                    if (err) {
                        console.log("Ha habido un error");
                    } else {
                        console.log('El archivo ha sido creado.');
                    }
                });
            }

            res.writeHead(302, { 'location': '/thanks'});
            res.end();
        });
    }

});


// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
console.log('Listening on 127.0.0.1:3000');
});