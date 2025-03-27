import { getProductVariants } from "../utils";

const TARGET = "admin.product-details.action.should-render";

export default shopify.extend(TARGET, async ({ data }) => {
  const variants = await getProductVariants(data);
  const shouldDisplay = variants.length > 1

  return { display: shouldDisplay };
});
