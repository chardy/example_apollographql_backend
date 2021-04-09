export default `
  type PurchaseOrder {
    id: String
    name: String
  }

  type Query {
    allPurchaseOrders: [PurchaseOrder]
    getPurchaseOrder(id: String): PurchaseOrder
  }

  type Mutation {
    createPurchaseOrder(name: String): PurchaseOrder
    updatePurchaseOrder(id: String, name: String): PurchaseOrder
    deletePurchaseOrder(id: String): CommonResponse
  }
`
