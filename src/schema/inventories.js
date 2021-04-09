export default `
  type Inventory {
    id: String
    name: String
  }

  type Query {
    allInventories: [Inventory]
    getInventory(id: String): Inventory
  }

  type Mutation {
    createInventory(name: String): Inventory
    updateInventory(id: String, name: String): Inventory
    deleteInventory(id: String): CommonResponse
  }
`
