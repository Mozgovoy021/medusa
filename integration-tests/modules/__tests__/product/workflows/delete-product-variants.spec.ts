import { deleteProductVariantsWorkflow } from "@medusajs/core-flows"
import ProductModule from "@medusajs/medusa/product"
import { medusaIntegrationTestRunner } from "@medusajs/test-utils"
import { IProductModuleService } from "@medusajs/types"
import {
  ContainerRegistrationKeys,
  defineLink,
  Modules,
} from "@medusajs/utils"
import BrandModule from "../../../src/modules/brand"

jest.setTimeout(200000)

medusaIntegrationTestRunner({
  hooks: {
    beforeServerStart: async () => {
      defineLink(ProductModule.linkable.productVariant, {
        linkable: BrandModule.linkable.brand,
        deleteCascade: true,
      })
    },
  },
  testSuite: ({ getContainer }) => {
    describe("Workflows: Delete product variants", () => {
      let appContainer
      let service: IProductModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        service = appContainer.resolve(Modules.PRODUCT)
      })

      it("should cascade delete a custom linked record when deleting a variant", async () => {
        const brandModule = appContainer.resolve("brand")
        const link = appContainer.resolve(ContainerRegistrationKeys.LINK)

        const shippingProfile = await appContainer
          .resolve(Modules.FULFILLMENT)
          .createShippingProfiles({ name: "Test", type: "default" })

        const product = await service.createProducts({
          title: "Test Product",
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Size", values: ["S"] }],
          variants: [
            {
              title: "Small",
              options: { Size: "S" },
            },
          ],
        })

        const variant = product.variants[0]

        const brand = await brandModule.createBrands({
          name: "Test Brand",
        })

        await link.create({
          product: {
            product_variant_id: variant.id,
          },
          brand: {
            brand_id: brand.id,
          },
        })

        await deleteProductVariantsWorkflow(appContainer).run({
          input: { ids: [variant.id] },
        })

        const deletedVariants = await service.listProductVariants({
          id: [variant.id],
        })
        expect(deletedVariants).toHaveLength(0)

        const remainingBrands = await brandModule.listBrands({
          id: [brand.id],
        })
        expect(remainingBrands).toHaveLength(0)
      })
    })
  },
})
