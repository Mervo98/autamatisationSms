const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const command = `osascript /Users/babamerveilles/documents/sendMessage/sendMessage.scpt "${data.phone}" "${data.message}"`;
                exec(command, (error) => {
                    if (error) console.error(error);
                });
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Message envoyé ✅');
            } catch (err) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Erreur : données invalides ❌');
            }
        });
    } else {
        res.writeHead(405);
        res.end('Méthode non autorisée ❌');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur prêt sur le port ${PORT} 🚀`);
});
