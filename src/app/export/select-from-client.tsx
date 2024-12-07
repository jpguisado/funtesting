"use client"

import { Button } from "@/components/ui/button"
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";

export default function SelectFromClient() {
    function generateDocx() {
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
                    new Table({
                        margins: {
                            top: 50,
                            bottom: 50,
                            left: 50,
                            right: 50,
                        },
                        width: {
                            size: `100%`,
                            type: 'dxa',
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 1,
                                        children: [new Paragraph("Código único:")],
                                    }),
                                    new TableCell({
                                        columnSpan: 3,
                                        children: [new Paragraph("Lorem ipsum dolor sit aemet Lorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemetLorem ipsum dolor sit aemet")],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 1,
                                        children: [new Paragraph("Precondiciones:")],
                                    }),
                                    new TableCell({
                                        columnSpan: 3,
                                        children: [new Paragraph("Lorem ipsum dolor sit aemet")],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 1,
                                        children: [new Paragraph("Descripción:")],
                                    }),
                                    new TableCell({
                                        columnSpan: 3,
                                        children: [new Paragraph("Lorem ipsum dolor sit aemet")],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: `25%`,
                                            type: 'pct',
                                        },
                                        children: [new Paragraph(`Paso ` + 1)],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: `25%`,
                                            type: 'pct',
                                        },
                                        children: [new Paragraph("Descripción del paso 1")],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: `25%`,
                                            type: 'pct',
                                        },
                                        children: [new Paragraph("Paso 2: ")],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: `25%`,
                                            type: 'pct',
                                        },
                                        children: [new Paragraph("Descripción del paso 2")],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 4,
                                        children: [new Paragraph("Observaciones: ")],
                                    }),
                                ],
                            }),
                        ],
                    })
                ],
            }],
        });

        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            // saveAs(blob, "example.docx");
            const file = new File([blob], "name", { type: blob.type });
            console.log("Document created successfully", file);
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name || 'download';
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    return (
        <>
            <Button onClick={() => generateDocx()}>Client!</Button>
        </>
    )
}