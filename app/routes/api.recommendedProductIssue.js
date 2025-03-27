import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  // Authenticate and get CORS helper
  const { cors } = await authenticate.admin(request);

  const productIssues = [
    { title: "Too big", description: "The product was too big." },
    { title: "Too small", description: "The product was too small." },
    {
      title: "Just right",
      description:
        "The product was just right, but the customer is still unhappy.",
    },
  ];

  // Extract productId from URL
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  // Ensure productId is valid and extract numeric ID
  let idNumber = 0;
  if (productId) {
    const splitStr = productId.split("/");
    idNumber = parseInt(splitStr[splitStr.length - 1], 10) || 0;
  }

  // Determine the issue based on ID
  const issue = productIssues[idNumber % productIssues.length];

  // Create JSON response with proper headers
  const response = new Response(JSON.stringify({ productIssue: issue }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Apply CORS wrapper
  return cors(response);
};
