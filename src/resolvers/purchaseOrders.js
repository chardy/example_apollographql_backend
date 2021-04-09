let data = [
  {
    id: "1",
    name: "Name 1"
  },
  {
    id: "2",
    name: "Name 2"
  }
]

export default {
  Query: {
    allPurchaseOrders: async () => {
      console.log(data)
      return [...data]
    },
    getPurchaseOrder: async (parent, { id }) => {
      return data.find(e => e.id == id)
    }
  },
  Mutation: {
    createPurchaseOrder: async (parent, { name }) => {
      let id = (data.length + 1).toString()
      const newData = { id, name }
      data.push(newData)
      return newData
    },
    updatePurchaseOrder: async (parent, { id, name }) => {
      const updateData = data.find(e => e.id == id)
      updateData.name = name
      return updateData
    },
    deletePurchaseOrder: async (parent, { id }) => {
      data = data.filter(e => e.id != id)
      return {
       success: true
      }
    },
  }
}
