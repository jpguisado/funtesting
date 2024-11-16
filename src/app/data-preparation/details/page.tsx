export default function Page() {

    const data = {
        "squadName": "Super hero squad",
        "homeTown": "Metro City",
        "formed": 2016,
        "secretBase": "Super tower",
        "active": true,
        "members": [
            {
                "name": "Molecule Man",
                "age": 29,
                "secretIdentity": "Dan Jukes",
                "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
            },
            {
                "name": "Madame Uppercut",
                "age": 39,
                "secretIdentity": "Jane Wilson",
                "powers": [
                    "Million tonne punch",
                    "Damage resistance",
                    "Superhuman reflexes"
                ]
            },
            {
                "name": "Eternal Flame",
                "age": 1000000,
                "secretIdentity": "Unknown",
                "powers": [
                    "Immortality",
                    "Heat Immunity",
                    "Inferno",
                    "Teleportation",
                    "Interdimensional travel"
                ]
            }
        ]
    }


    return (
        <div>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Caso de prueba:</div>
            </div>
            <pre className="mt-2 w-full rounded-md p-4">
                <code className="text-black">{JSON.stringify(data, null, 2)}</code>
            </pre>
        </div>
    )
}   