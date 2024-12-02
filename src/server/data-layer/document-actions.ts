"use server";

import { Document, Packer, Paragraph } from "docx";
import * as fs from "fs";

// const tableCell = new TableCell({
//     width: {
//         size: 100,
//         type: "pct"
//     },
//     children: [new Paragraph("hello world")],
// });

// const tableRow = new TableRow({
//     children: [
//         tableCell
//     ],
// });

// const table = new Table({
//     rows: [tableRow],
//     columnWidths: [5505, 5505],
// });

const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                text: 'CASO NÚMERO 1: usuario no registrado se conecta con certificado digital',
                heading: 'Heading2'
            }),
            new Paragraph({
                text: 'Número de caso: 24',
            }),
            new Paragraph({
                text: 'Precondiciones: el usuario debe disponer de usuario y contraseña y estar registrado activamente en el sistema',
            }),
            new Paragraph({
                text: 'TABLA: el usuario debe disponer de usuario y contraseña y estar registrado activamente en el sistema',
            }),
        ],
    }],
});

export async function PackDocument () {
    // Used to export the file into a .docx file
    console.log('Se generara un documento en el servidor: ')
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("My Document.docx", buffer);
    });
}