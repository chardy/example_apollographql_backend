export default `
  type Journal {
    id: String
    name: String
  }

  type Query {
    allJournals: [Journal]
    getJournal(id: String): Journal
  }

  type Mutation {
    createJournal(name: String): Journal
    updateJournal(id: String, name: String): Journal
    deleteJournal(id: String): CommonResponse
  }
`
