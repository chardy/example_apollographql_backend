import express from 'express'
import { salesOrderRoute } from './salesOrders'
import { purchaseOrderRoute } from './purchaseOrders'
import { inventoryRoute } from './inventories'
import { journalRoute } from './journals'

import dotenv from 'dotenv'
dotenv.load()

export default (app, context) => {
  const { router } = context || {}
  router.use(express.json({ strict: false }))
  router.use(
    express.urlencoded({
      extended: false
    })
  )

  // /nav/sales_orders
  salesOrderRoute(app, { router })

  // /nav/purchase_orders
  purchaseOrderRoute(app, { router })

  // /nav/inventories
  inventoryRoute(app, { router })

  // /nav/journals
  journalRoute(app, { router })

  app.use('/nav', router)
}
