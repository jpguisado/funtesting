"use client"

import { Button } from "@/components/ui/button"
import { userStorySchema } from "@/schemas/schemas";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import { z } from "zod";

export const stepForExportationSchema = z.object({
    id: z.number().optional(),
    stepDescription: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    expectedResult: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    isBlocker: z.string().optional(),
    order: z.number(),
})

export const stepForExportationListSchema = stepForExportationSchema.array()

export const testCaseForExportationSchema = z.object({
    id: z.number().optional(),
    titleCase: z.string().min(1, {
        message: "Test must have a title."
    }),
    relatedStory: userStorySchema,
    preconditions: z.string().min(1, {
        message: "Please, fill preconditions of this case"
    }),
    stepList: stepForExportationSchema.array(),
    executionOrder: z.number().optional(),
    updatedAt: z.date().optional(),
}).array();

export type testCaseListType = z.infer<typeof testCaseForExportationSchema>
export type stepListType = z.infer<typeof stepForExportationListSchema>

export default function SelectFromClient({ testCasesList }: { testCasesList: testCaseListType}) {
    const { data, error } = testCaseForExportationSchema.safeParse(testCasesList);
    if (error) {console.log(error); throw new Error}
    const testList = data;

    const generateRows = (stepListParam: stepListType): TableRow[] =>
        stepListParam.map(
            (test) =>
                new TableRow({
                    children: [
                        new TableCell({
                            shading: {
                                type: 'clear',
                                color: "00FFFF",
                                fill: "DDE8F6",
                            },
                            width: {
                                size: `25%`,
                                type: 'pct',
                            },
                            children: [new Paragraph({
                                children: [new TextRun({
                                    text: "Descripción del paso",
                                    bold: true,
                                    font: 'Calibri'
                                })]
                            })],
                        }),
                        new TableCell({
                            width: {
                                size: `50%`,
                                type: 'pct',
                            },
                            children: [new Paragraph(test.stepDescription)],
                        }),
                        new TableCell({
                            shading: {
                                type: 'clear',
                                color: "00FFFF",
                                fill: "DDE8F6",
                            },
                            width: {
                                size: `25%`,
                                type: 'pct',
                            },
                            children: [new Paragraph({
                                children: [new TextRun({
                                    text: "Resultado Esperado Paso ",
                                    bold: true,
                                    font: 'Calibri'
                                })]
                            })],
                        }),
                        new TableCell({
                            width: {
                                size: `50%`,
                                type: 'pct',
                            },
                            children: [new Paragraph(test.expectedResult)],
                        }),
                    ],
                }));

    const sections = testList.map((test) => {
        return ({
            children: [
                new Paragraph({
                    text: test.titleCase,
                    heading: 'Heading2',
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
                                    shading: {
                                        type: 'clear',
                                        color: "00FFFF",
                                        fill: "DDE8F6",
                                    },
                                    columnSpan: 1,
                                    width: {
                                        size: `25%`,
                                        type: 'pct',
                                    },
                                    children: [new Paragraph({
                                        children: [new TextRun({
                                            text: "Código Único del caso ",
                                            bold: true,
                                        })]
                                    })],

                                }),
                                new TableCell({
                                    columnSpan: 3,
                                    width: {
                                        size: `75%`,
                                        type: 'pct',
                                    },
                                    children: [new Paragraph(test.id!.toString())],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: {
                                        type: 'clear',
                                        color: "00FFFF",
                                        fill: "DDE8F6",
                                    },
                                    columnSpan: 1,
                                    children: [new Paragraph({
                                        children: [new TextRun({
                                            text: "Precondiciones:",
                                            bold: true,
                                        })]
                                    })],
                                }),
                                new TableCell({
                                    columnSpan: 3,
                                    children: [new Paragraph(test.preconditions)],
                                }),
                            ],
                        }),
                        ...generateRows(test.stepList),
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: {
                                        type: 'clear',
                                        color: "00FFFF",
                                        fill: "DDE8F6",
                                    },
                                    columnSpan: 4,
                                    children: [new Paragraph({
                                        children: [new TextRun({
                                            text: "Observaciones:",
                                            bold: true,
                                        })]
                                    })],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 4,
                                    children: [new Paragraph("")],
                                }),
                            ],
                        }),
                    ],
                })
            ]
        })
    })

    function generateDocx() {
        const doc = new Document({
            sections: sections,
        });

        Packer.toBlob(doc).then((blob) => {
            const file = new File([blob], "name", { type: blob.type });
            console.log("Document created successfully", file);
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name || 'download';
            link.click();
            window.URL.revokeObjectURL(url);
        }).catch((e) => { console.log(e) });
    }

    function generateDocxLegacy() {
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
                        rows:
                            testList.map((test) => {
                                return (
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                columnSpan: 1,
                                                children: [new Paragraph("Código único:")],
                                            }),
                                            new TableCell({
                                                columnSpan: 3,
                                                children: [new Paragraph(test.id!.toString())],
                                            })
                                        ]
                                    })
                                )
                            })
                    }),
                ],
            }],
        });

        Packer.toBlob(doc).then((blob) => {
            const file = new File([blob], "name", { type: blob.type });
            console.log("Document created successfully", file);
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name || 'download';
            link.click();
            window.URL.revokeObjectURL(url);
        }).catch((e) => { console.log(e) });
    }

    return (
        <>
            <Button onClick={() => generateDocx()}>Exportar casos!</Button>
        </>
    )
}