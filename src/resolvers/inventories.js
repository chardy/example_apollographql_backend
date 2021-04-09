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
    allInventories: async () => {
      console.log(data)
      return [...data]
    },
    getInventory: async (parent, { id }) => {
      return data.find(e => e.id == id)
    }
  },
  Mutation: {
    createInventory: async (parent, { name }) => {
      let id = (data.length + 1).toString()
      const newData = { id, name }
      data.push(newData)
      return newData
    },
    updateInventory: async (parent, { id, name }) => {
      const updateData = data.find(e => e.id == id)
      updateData.name = name
      return updateData
    },
    deleteInventory: async (parent, { id }) => {
      data = data.filter(e => e.id != id)
      return {
       success: true
      }
    },
  }
}
