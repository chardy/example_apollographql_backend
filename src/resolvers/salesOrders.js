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
    allSalesOrders: async () => {
      console.log(data)
      return [...data]
    },
    getSalesOrder: async (parent, { id }) => {
      return data.find(e => e.id == id)
    }
  },
  Mutation: {
    createSalesOrder: async (parent, { name }) => {
      let id = (data.length + 1).toString()
      const newData = { id, name }
      data.push(newData)
      return newData
    },
    updateSalesOrder: async (parent, { id, name }) => {
      const updateData = data.find(e => e.id == id)
      updateData.name = name
      return updateData
    },
    deleteSalesOrder: async (parent, { id }) => {
      data = data.filter(e => e.id != id)
      return {
       success: true
      }
    },
  }
}
