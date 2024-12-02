"use client"

import { Button } from "@/components/ui/button"
import { PackDocument } from "@/server/data-layer/document-actions"
import { Document, Packer, Paragraph, Tab, TextRun } from "docx";

export default function SelectFromClient() {
    async function ExportDocx() {
        console.log('En el cliente')
        await PackDocument()
    }

    function generateDocx() {
        function generate() {
            const doc = new Document({
                sections: [
                    {
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun("Hello World"),
                                    new TextRun({
                                        text: "Foo Bar",
                                        bold: true,
                                    }),
                                    new TextRun({
                                        children: [new Tab(), "Github is the best"],
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            Packer.toBlob(doc).then((blob) => {
                console.log(blob);
                // saveAs(blob, "example.docx");
                const file = new File([blob], "name");
                console.log("Document created successfully", file);
                const a =  document.createElement("a");
                a.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document,' + file;
                a.download = "My Document.docx";
                a.click();
            });
        }
        generate();
    }

    return (
        <>
            <Button onClick={() => ExportDocx()}>Server!</Button>
            <Button onClick={() => generateDocx()}>Client!</Button>
        </>
    )
}