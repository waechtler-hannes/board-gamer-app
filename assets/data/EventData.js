const EventData = [
    {
        host: "Erik",
        date: "25. April 2025",
        icon: "person-circle",
        editable: true, //Wird bald entfernt und dann in der Komponente "EventView" festgelegt (regelt, ob ein User dieses Event bearbeiten kann)
        description: "Wir veranstalten einen lustigen Abend mit all unseren Freunden.",
        location: {
            street: "Lilienstraße",
            housenumber: "14",
            postalcode: "20095",
            city: "Hamburg"
        },
        games: [
            {voteable: "Siedler von Catan", votes: 1},
            {voteable: "Monopoly", votes: 0},
            {voteable: "Mensch ärgere dich nicht", votes: 3}
        ],
        foods: [
            {voteable: "asiatisch", votes: 1},
            {voteable: "italienisch", votes: 2},
            {voteable: "spanisch", votes: 5}
        ]
    },
    {
        host: "Sarah",
        date: "2. Mai 2025",
        icon: "person-circle",
        editable: true,
        description: "Wir wollen viele tolle Spiele spielen.",
        location: {
            street: "Färbergraben",
            housenumber: "12",
            postalcode: "80331",
            city: "München"
        },
        games: [
            {voteable: "Siedler von Catan", votes: 6},
            {voteable: "Monopoly", votes: 2},
            {voteable: "Mensch ärgere dich nicht", votes: 1}
        ],
        foods: [
            {voteable: "asiatisch", votes: 7},
            {voteable: "italienisch", votes: 2},
            {voteable: "griechisch", votes: 2}
        ]
    }
]

export default EventData;