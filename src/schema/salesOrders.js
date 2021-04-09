export default `
  type SalesOrder {
    id: String
    name: String
  }

  type Query {
    allSalesOrders: [SalesOrder]
    getSalesOrder(id: String): SalesOrder
  }

  type Mutation {
    createSalesOrder(name: String): SalesOrder
    updateSalesOrder(id: String, name: String): SalesOrder
    deleteSalesOrder(id: String): CommonResponse
  }
`
